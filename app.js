const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'templates')));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const B2_KEY_ID      = process.env.B2_KEY_ID || '';
const B2_APP_KEY     = process.env.B2_APP_KEY || '';
const B2_BUCKET_NAME = process.env.B2_BUCKET_NAME || '';
const B2_ENDPOINT    = process.env.B2_ENDPOINT || '';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin1';

let activePopup = null;
const usedTrialIPs = new Set();
function getClientIP(req) {
  const fwd = req.headers['x-forwarded-for'];
  return fwd ? fwd.split(',')[0].trim() : req.socket.remoteAddress;
}

// ── B2 S3-compatible helpers ──
function b2Request(method, key, body, contentType) {
  return new Promise((resolve, reject) => {
    if (!B2_ENDPOINT || !B2_BUCKET_NAME || !B2_KEY_ID || !B2_APP_KEY)
      return reject(new Error('B2 not configured'));
    const endpoint = B2_ENDPOINT.replace(/^https?:\/\//, '');
    const bodyBuf  = body ? Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)) : Buffer.alloc(0);
    const now      = new Date();
    const dateStamp = now.toISOString().slice(0,10).replace(/-/g,'');
    const amzDate   = now.toISOString().replace(/[:\-]|\.\d{3}/g,'').slice(0,15)+'Z';
    const region    = B2_ENDPOINT.match(/s3\.([^.]+)\.backblaze/)?.[1] || 'us-east-005';
    const fullPath  = `/${B2_BUCKET_NAME}/${key}`;
    const ct        = contentType || 'application/json';
    const canonicalHeaders = `content-type:${ct}\nhost:${endpoint}\nx-amz-content-sha256:UNSIGNED-PAYLOAD\nx-amz-date:${amzDate}\n`;
    const signedHeaders    = 'content-type;host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = `${method}\n${fullPath}\n\n${canonicalHeaders}\n${signedHeaders}\nUNSIGNED-PAYLOAD`;
    const credScope  = `${dateStamp}/${region}/s3/aws4_request`;
    const strToSign  = `AWS4-HMAC-SHA256\n${amzDate}\n${credScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;
    const kDate    = crypto.createHmac('sha256',`AWS4${B2_APP_KEY}`).update(dateStamp).digest();
    const kRegion  = crypto.createHmac('sha256',kDate).update(region).digest();
    const kService = crypto.createHmac('sha256',kRegion).update('s3').digest();
    const kSign    = crypto.createHmac('sha256',kService).update('aws4_request').digest();
    const sig      = crypto.createHmac('sha256',kSign).update(strToSign).digest('hex');
    const auth = `AWS4-HMAC-SHA256 Credential=${B2_KEY_ID}/${credScope}, SignedHeaders=${signedHeaders}, Signature=${sig}`;
    const options = {
      hostname: endpoint, path: fullPath, method,
      headers: { 'Content-Type':ct,'Content-Length':bodyBuf.length,'x-amz-date':amzDate,'x-amz-content-sha256':'UNSIGNED-PAYLOAD','Authorization':auth }
    };
    const req = https.request(options, res => {
      let data=''; res.on('data',c=>data+=c); res.on('end',()=>resolve({status:res.statusCode,body:data}));
    });
    req.on('error', reject);
    if (bodyBuf.length > 0) req.write(bodyBuf);
    req.end();
  });
}

async function b2Get(key) {
  try { const r=await b2Request('GET',key,null,'application/json'); if(r.status===200) return JSON.parse(r.body); return null; } catch { return null; }
}
async function b2Put(key, data) {
  try { await b2Request('PUT',key,JSON.stringify(data),'application/json'); return true; } catch(e){ console.error('B2 put:',e.message); return false; }
}
async function b2Delete(key) {
  try { await b2Request('DELETE',key,null,'application/json'); return true; } catch { return false; }
}
const emailToKey = email => crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
async function getUserIndex() { return (await b2Get('users/index.json')) || []; }
async function saveUserIndex(index) { return b2Put('users/index.json', index); }
async function getMemory(email) { return (await b2Get(`memory/${emailToKey(email)}.json`)) || []; }
async function saveMemory(email, memories) { return b2Put(`memory/${emailToKey(email)}.json`, memories); }
async function getChatIndex(email) { return (await b2Get(`chats/${emailToKey(email)}/index.json`)) || []; }
async function saveChatIndex(email, index) { return b2Put(`chats/${emailToKey(email)}/index.json`, index); }

function adminAuth(req, res, next) {
  const auth = req.headers['x-admin-token'];
  if (auth !== Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64'))
    return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── Auth ──
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ error: 'Invalid fields' });
  const key = `users/${emailToKey(email)}.json`;
  if (await b2Get(key)) return res.status(409).json({ error: 'Email already registered' });
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const userData = { name, email: email.toLowerCase(), password: hash, createdAt: new Date().toISOString() };
  await b2Put(key, userData);
  const index = await getUserIndex();
  index.push({ name, email: email.toLowerCase(), createdAt: userData.createdAt });
  await saveUserIndex(index);
  res.json({ success: true, name });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const user = await b2Get(`users/${emailToKey(email)}.json`);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });
  if (user.password !== crypto.createHash('sha256').update(password).digest('hex'))
    return res.status(401).json({ error: 'Invalid email or password' });
  res.json({ success: true, name: user.name, email: user.email });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS)
    return res.json({ success: true, token: Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64') });
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/admin/users', adminAuth, async (req, res) => res.json(await getUserIndex()));

app.delete('/api/admin/users/:email', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const eKey  = emailToKey(email);
  try {
    await b2Delete(`users/${eKey}.json`);
    await b2Delete(`memory/${eKey}.json`);
    const chatIndex = await b2Get(`chats/${eKey}/index.json`) || [];
    for (const chat of chatIndex) await b2Delete(`chats/${eKey}/${chat.id}.json`);
    await b2Delete(`chats/${eKey}/index.json`);
    let index = await getUserIndex();
    await saveUserIndex(index.filter(u => u.email !== email));
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Failed: ' + err.message }); }
});

app.post('/api/admin/popup', adminAuth, (req, res) => {
  const { message, type } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  activePopup = { message, type: type || 'info', id: Date.now(), createdAt: new Date().toISOString() };
  res.json({ success: true });
});
app.delete('/api/admin/popup', adminAuth, (req, res) => { activePopup = null; res.json({ success: true }); });
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  const index = await getUserIndex();
  res.json({ totalUsers: index.length, activePopup, trialIPCount: usedTrialIPs.size });
});
app.get('/api/popup', (req, res) => res.json(activePopup || null));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'admin.html')));
app.post('/api/trial-start', (req, res) => {
  const ip = getClientIP(req);
  if (usedTrialIPs.has(ip)) return res.json({ allowed: false });
  usedTrialIPs.add(ip);
  res.json({ allowed: true });
});

// ── Chat history ──
app.get('/api/chats', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  res.json(await getChatIndex(email));
});
app.post('/api/chats', async (req, res) => {
  const { email, chatId, title, messages } = req.body;
  if (!email || !chatId || !messages) return res.status(400).json({ error: 'Missing fields' });
  await b2Put(`chats/${emailToKey(email)}/${chatId}.json`, { id:chatId, title, messages, updatedAt: new Date().toISOString() });
  let index = await getChatIndex(email);
  const entry = { id:chatId, title, date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}), updatedAt: new Date().toISOString() };
  const idx = index.findIndex(c=>c.id===chatId);
  if (idx>=0) index[idx]=entry; else index.unshift(entry);
  await saveChatIndex(email, index);
  res.json({ success: true });
});
app.get('/api/chats/:chatId', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  const chat = await b2Get(`chats/${emailToKey(email)}/${req.params.chatId}.json`);
  if (!chat) return res.status(404).json({ error: 'Not found' });
  res.json(chat);
});
app.delete('/api/chats/:chatId', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  await b2Delete(`chats/${emailToKey(email)}/${req.params.chatId}.json`);
  let index = await getChatIndex(email);
  await saveChatIndex(email, index.filter(c=>c.id!==req.params.chatId));
  res.json({ success: true });
});

// ── Fetch helpers ──
function fetchText(url) {
  return new Promise((resolve,reject)=>{
    const mod=url.startsWith('https')?https:http;
    mod.get(url,{headers:{'User-Agent':'VioraAI/1.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve(d.trim()));}).on('error',reject);
  });
}
function fetchJSON(url) {
  return new Promise((resolve,reject)=>{
    const mod=url.startsWith('https')?https:http;
    mod.get(url,{headers:{'User-Agent':'VioraAI/1.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{resolve(JSON.parse(d))}catch{resolve(null)}});}).on('error',reject);
  });
}
function fetchUrl(url) {
  return new Promise((resolve,reject)=>{
    const mod=url.startsWith('https')?https:http;
    mod.get(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; VioraAI/1.0)','Accept':'text/html,*/*'}},res=>{
      if(res.statusCode>=300&&res.statusCode<400&&res.headers.location) return fetchUrl(res.headers.location).then(resolve).catch(reject);
      let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve(d));
    }).on('error',reject);
  });
}
function extractTextFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'')
    .replace(/<nav[\s\S]*?<\/nav>/gi,'').replace(/<footer[\s\S]*?<\/footer>/gi,'')
    .replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim().slice(0,6000);
}
async function reverseGeocode(lat,lon) {
  try { const d=await fetchJSON(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`); if(d?.address) return {city:d.address.city||d.address.town||d.address.village||'',country:d.address.country||''}; } catch{} return null;
}
async function getWeatherFromCoords(lat,lon) {
  try { return await fetchText(`https://wttr.in/${lat},${lon}?format=3`); } catch { return null; }
}
async function getWeatherRich(lat,lon) {
  try {
    const raw=await fetchText(`https://wttr.in/${lat},${lon}?format=j1`);
    const d=JSON.parse(raw); const cur=d.current_condition?.[0]; if(!cur) return null;
    const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const daily=(d.weather||[]).slice(0,7).map(day=>{const dt=new Date(day.date);return{day:days[dt.getDay()],high:parseInt(day.maxtempF),low:parseInt(day.mintempF),code:parseInt(day.hourly?.[4]?.weatherCode||113)};});
    return {tempF:parseInt(cur.temp_F),feelsF:parseInt(cur.FeelsLikeF),desc:cur.weatherDesc?.[0]?.value||'',humidity:parseInt(cur.humidity),windMph:parseInt(cur.windspeedMiles),visibility:parseInt(cur.visibility),uvIndex:parseInt(cur.uvIndex),code:parseInt(cur.weatherCode),daily};
  } catch { return null; }
}

// ── OpenRouter (non-streaming, for deep search) ──
function callOpenRouter(allMessages) {
  return new Promise((resolve,reject)=>{
    const payload=JSON.stringify({model:'google/gemini-2.0-flash-exp:free',messages:allMessages});
    const options={hostname:'openrouter.ai',path:'/api/v1/chat/completions',method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENROUTER_API_KEY}`,'HTTP-Referer':'https://ai-1x5q.onrender.com','X-Title':'Viora AI','Content-Length':Buffer.byteLength(payload)}};
    const req=https.request(options,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const p=JSON.parse(d);if(p.error)reject({message:p.error.message});else resolve(p.choices?.[0]?.message?.content||'');}catch{reject({message:'Parse error'})}});});
    req.on('error',err=>reject({message:err.message}));
    req.write(payload);req.end();
  });
}

// ── Deep Search ──
app.post('/api/deepsearch', async (req, res) => {
  const { query, email } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });
  let memoryCtx='';
  if(email){const m=await getMemory(email);if(m.length>0)memoryCtx='\n\n[USER MEMORIES: '+m.map(x=>`- ${x.text}`).join('\n')+']';}
  const sys=`You are Viora, an expert research assistant. Produce a thorough deep research report.\nFormat:\n# [Title]\n## Overview\n[summary]\n## [Sections]\n## Key Takeaways\n- bullets\nWrite at least 400 words.${memoryCtx}`;
  try { const text=await callOpenRouter([{role:'system',content:sys},{role:'user',content:`Deep research: ${query}`}]); res.json({content:[{text}]}); }
  catch(err){res.status(500).json({error:err.message});}
});

// ── Weather & Geocode ──
app.get('/api/weather', async (req, res) => {
  const{lat,lon}=req.query; if(!lat||!lon) return res.status(400).json({error:'Missing coords'});
  const[place,rich]=await Promise.all([reverseGeocode(parseFloat(lat),parseFloat(lon)),getWeatherRich(parseFloat(lat),parseFloat(lon))]);
  if(!rich) return res.status(500).json({error:'Weather unavailable'});
  res.json({place,weather:rich});
});
app.get('/api/geocode', async (req, res) => {
  const{lat,lon}=req.query; if(!lat||!lon) return res.status(400).json({error:'Missing coords'});
  res.json((await reverseGeocode(parseFloat(lat),parseFloat(lon)))||{});
});

// ── Main Chat (streaming with fallback) ──
app.post('/api/chat', async (req, res) => {
  const{messages,system,coords,email,image}=req.body;
  if(!OPENROUTER_API_KEY) return res.status(500).json({error:'OPENROUTER_API_KEY not set.'});

  let weatherCtx='',locationCtx='',memoryCtx='',urlCtx='';
  if(coords?.lat&&coords?.lon){
    const[place,weather]=await Promise.all([reverseGeocode(coords.lat,coords.lon),getWeatherFromCoords(coords.lat,coords.lon)]);
    if(weather){const loc=place?`${place.city}, ${place.country}`:`${coords.lat},${coords.lon}`;weatherCtx=`\n\n[LIVE WEATHER (${loc}): ${weather}]`;}
    if(place){locationCtx=`\n\n[USER LOCATION: ${place.city?place.city+', ':''}${place.country} (coordinates: ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}). Provide Google Maps links for nearby places.]`;}
    else{locationCtx=`\n\n[USER COORDINATES: ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}]`;}
  }
  if(email){const m=await getMemory(email);if(m.length>0)memoryCtx='\n\n[THINGS YOU REMEMBER ABOUT THIS USER:\n'+m.map(x=>`- ${x.text}`).join('\n')+'\nUse naturally without announcing it.]';}
  const lastUserMsg=[...messages].reverse().find(m=>m.role==='user');
  if(lastUserMsg){
    const urlMatch=(typeof lastUserMsg.content==='string'?lastUserMsg.content:'').match(/https?:\/\/[^\s]+/);
    if(urlMatch){try{const html=await fetchUrl(urlMatch[0]);const t=extractTextFromHtml(html);if(t.length>100)urlCtx=`\n\n[WEBPAGE CONTENT from ${urlMatch[0]}:\n${t}\n(End)]`;}catch(e){urlCtx=`\n\n[Could not fetch ${urlMatch[0]}: ${e.message}]`;}}
    if(email){const rm=(typeof lastUserMsg.content==='string'?lastUserMsg.content:'').match(/^remember:\s*(.+)/i);if(rm){const ex=await getMemory(email);ex.push({id:Date.now().toString(),text:rm[1].trim(),createdAt:new Date().toISOString()});await saveMemory(email,ex);}}
  }
  let builtMessages=messages.map(m=>({...m}));
  if(image){const li=builtMessages.map(m=>m.role).lastIndexOf('user');if(li>=0){const lm=builtMessages[li];builtMessages[li]={role:'user',content:[{type:'text',text:typeof lm.content==='string'?lm.content:''},{type:'image_url',image_url:{url:image}}]};}}
  const allMessages=[{role:'system',content:(system||'You are Viora, a friendly helpful AI.')+weatherCtx+locationCtx+memoryCtx+urlCtx},...builtMessages];

  const models=['google/gemini-2.0-flash-exp:free','meta-llama/llama-3.3-70b-instruct:free','microsoft/phi-3-mini-128k-instruct:free'];
  try {
    let replied=false;
    for(const model of models){
      try{
        const result=await new Promise((resolve,reject)=>{
          const payload=JSON.stringify({model,messages:allMessages});
          const options={hostname:'openrouter.ai',path:'/api/v1/chat/completions',method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENROUTER_API_KEY}`,'HTTP-Referer':'https://ai-1x5q.onrender.com','X-Title':'Viora AI','Content-Length':Buffer.byteLength(payload)}};
          const req=https.request(options,upstream=>{let d='';upstream.on('data',c=>d+=c);upstream.on('end',()=>{try{const p=JSON.parse(d);if(p.error)return reject(new Error(p.error.message||JSON.stringify(p.error)));resolve(p.choices?.[0]?.message?.content||'');}catch(e){reject(e);}});});
          req.on('error',reject);req.write(payload);req.end();
        });
        if(result&&result.trim().length>0){
          res.setHeader('Content-Type','text/event-stream');
          res.setHeader('Cache-Control','no-cache');
          res.setHeader('Connection','keep-alive');
          const words=result.split(/(?<=\s)/);
          for(const word of words) res.write(`data: ${JSON.stringify({token:word})}\n\n`);
          res.write('data: [DONE]\n\n');
          res.end();
          replied=true;
          break;
        }
      }catch(e){console.log(`Model ${model} failed:`,e.message);continue;}
    }
    if(!replied){
      res.setHeader('Content-Type','text/event-stream');
      res.setHeader('Cache-Control','no-cache');
      res.write(`data: ${JSON.stringify({token:"I'm having trouble connecting. Please try again."})}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }catch(err){res.status(500).json({error:err.message});}
});

// ── Static / PWA routes ──
app.get('/V.png',(req,res)=>res.sendFile(path.join(__dirname,'templates','V.png')));
app.get('/manifest.json',(req,res)=>res.sendFile(path.join(__dirname,'templates','manifest.json')));
app.get('/sw.js',(req,res)=>{res.setHeader('Content-Type','application/javascript');res.setHeader('Service-Worker-Allowed','/');res.sendFile(path.join(__dirname,'templates','sw.js'));});
app.get('/icon-192.png',(req,res)=>res.sendFile(path.join(__dirname,'templates','icon-192.png')));
app.get('/icon-512.png',(req,res)=>res.sendFile(path.join(__dirname,'templates','icon-512.png')));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'templates','index.html')));

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Viora AI running on port ${PORT}`));

// ── Admin chat/memory viewers ──
app.get('/api/admin/users/:email/chats',adminAuth,async(req,res)=>{res.json(await getChatIndex(decodeURIComponent(req.params.email).toLowerCase()));});
app.get('/api/admin/users/:email/chats/:chatId',adminAuth,async(req,res)=>{const chat=await b2Get(`chats/${emailToKey(decodeURIComponent(req.params.email).toLowerCase())}/${req.params.chatId}.json`);if(!chat)return res.status(404).json({error:'Not found'});res.json(chat);});
app.get('/api/admin/users/:email/memory',adminAuth,async(req,res)=>{res.json(await getMemory(decodeURIComponent(req.params.email).toLowerCase()));});
app.delete('/api/admin/users/:email/memory/:id',adminAuth,async(req,res)=>{const email=decodeURIComponent(req.params.email).toLowerCase();let m=await getMemory(email);await saveMemory(email,m.filter(x=>x.id!==req.params.id));res.json({success:true});});

// ── Memory API ──
app.get('/api/memory',async(req,res)=>{const{email}=req.query;if(!email)return res.status(400).json({error:'Missing email'});res.json(await getMemory(email));});
app.post('/api/memory',async(req,res)=>{const{email,text}=req.body;if(!email||!text)return res.status(400).json({error:'Missing fields'});const m=await getMemory(email);const entry={id:Date.now().toString(),text:text.trim(),createdAt:new Date().toISOString()};m.push(entry);await saveMemory(email,m);res.json(entry);});
app.delete('/api/memory/:id',async(req,res)=>{const{email}=req.body;if(!email)return res.status(400).json({error:'Missing email'});let m=await getMemory(email);await saveMemory(email,m.filter(x=>x.id!==req.params.id));res.json({success:true});});
app.delete('/api/memory',async(req,res)=>{const{email}=req.body;if(!email)return res.status(400).json({error:'Missing email'});await saveMemory(email,[]);res.json({success:true});});
