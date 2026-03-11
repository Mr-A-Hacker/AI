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

// Active popup — persisted to B2
let activePopup = null;
async function loadPopup() {
  try { activePopup = await b2Get('system/popup.json'); } catch {}
}
async function savePopupB2() {
  if (activePopup) await b2Put('system/popup.json', activePopup);
  else await b2Delete('system/popup.json');
}

// IP trial tracking — persisted to B2
let usedTrialIPs = new Set();
async function loadTrialIPs() {
  try {
    const data = await b2Get('system/trial-ips.json');
    if (Array.isArray(data)) usedTrialIPs = new Set(data);
  } catch {}
}
async function saveTrialIPs() {
  await b2Put('system/trial-ips.json', [...usedTrialIPs]);
}

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

// ── User index helpers ──
async function getUserIndex() { return (await b2Get('users/index.json')) || []; }
async function saveUserIndex(index) { return b2Put('users/index.json', index); }

// ── Admin middleware ──
function adminAuth(req, res, next) {
  const auth = req.headers['x-admin-token'];
  if (auth !== Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── Auth API ──
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ error: 'Invalid fields' });
  const key = `users/${emailToKey(email)}.json`;
  if (await b2Get(key)) return res.status(409).json({ error: 'Email already registered' });
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const userData = { name, email: email.toLowerCase(), password: hash, createdAt: new Date().toISOString() };
  await b2Put(key, userData);
  // Add to user index
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

// ── Admin login ──
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');
    return res.json({ success: true, token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// ── Admin: list users ──
app.get('/api/admin/users', adminAuth, async (req, res) => {
  const index = await getUserIndex();
  res.json(index);
});

// ── Admin: delete user ──
app.delete('/api/admin/users/:email', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const eKey  = emailToKey(email);
  try {
    // Delete user profile
    await b2Delete(`users/${eKey}.json`);
    // Delete memory
    await b2Delete(`memory/${eKey}.json`);
    // Delete all individual chat files
    const chatIndex = await b2Get(`chats/${eKey}/index.json`) || [];
    for (const chat of chatIndex) {
      await b2Delete(`chats/${eKey}/${chat.id}.json`);
    }
    // Delete chat index
    await b2Delete(`chats/${eKey}/index.json`);
    // Remove from user index
    let index = await getUserIndex();
    index = index.filter(u => u.email !== email);
    await saveUserIndex(index);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete user error:', err.message);
    res.status(500).json({ error: 'Failed to delete user: ' + err.message });
  }
});

// ── User Settings: Update profile (name / email / password) ──
app.patch('/api/user/update', async (req, res) => {
  const { email, currentPassword, newName, newEmail, newPassword } = req.body;
  if (!email || !currentPassword) return res.status(400).json({ error: 'Missing credentials' });
  const key = `users/${emailToKey(email)}.json`;
  const user = await b2Get(key);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.password !== crypto.createHash('sha256').update(currentPassword).digest('hex'))
    return res.status(401).json({ error: 'Current password is incorrect' });
  // Apply changes
  if (newName && newName.trim()) user.name = newName.trim();
  if (newPassword && newPassword.length >= 6)
    user.password = crypto.createHash('sha256').update(newPassword).digest('hex');
  const emailChanged = newEmail && newEmail.toLowerCase() !== email.toLowerCase();
  if (emailChanged) {
    const newKey = `users/${emailToKey(newEmail)}.json`;
    if (await b2Get(newKey)) return res.status(409).json({ error: 'Email already in use' });
    user.email = newEmail.toLowerCase();
    await b2Put(newKey, user);
    await b2Delete(key);
  } else {
    await b2Put(key, user);
  }
  // Update user index
  let idx = await getUserIndex();
  const ui = idx.find(u => u.email === email.toLowerCase());
  if (ui) { ui.name = user.name; ui.email = user.email; }
  await saveUserIndex(idx);
  res.json({ success: true, name: user.name, email: user.email });
});

// ── User Settings: Delete own account ──
app.delete('/api/user/delete', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const eKey = emailToKey(email);
  const user = await b2Get(`users/${eKey}.json`);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.password !== crypto.createHash('sha256').update(password).digest('hex'))
    return res.status(401).json({ error: 'Incorrect password' });
  try {
    await b2Delete(`users/${eKey}.json`);
    await b2Delete(`memory/${eKey}.json`);
    await b2Delete(`avatars/${eKey}.json`);
    const chatIndex = await b2Get(`chats/${eKey}/index.json`) || [];
    for (const chat of chatIndex) await b2Delete(`chats/${eKey}/${chat.id}.json`);
    await b2Delete(`chats/${eKey}/index.json`);
    let idx = await getUserIndex();
    idx = idx.filter(u => u.email !== email.toLowerCase());
    await saveUserIndex(idx);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account: ' + err.message });
  }
});

// ── User Settings: Save avatar ──
app.post('/api/user/avatar', async (req, res) => {
  const { email, avatar } = req.body; // avatar = base64 data URL
  if (!email || !avatar) return res.status(400).json({ error: 'Missing fields' });
  await b2Put(`avatars/${emailToKey(email)}.json`, { avatar });
  res.json({ success: true });
});

// ── User Settings: Get avatar ──
app.get('/api/user/avatar', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  const data = await b2Get(`avatars/${emailToKey(email)}.json`);
  res.json({ avatar: data?.avatar || null });
});

// ── Admin: send popup ──
app.post('/api/admin/popup', adminAuth, async (req, res) => {
  const { message, type } = req.body; // type: info | warning | success | error
  if (!message) return res.status(400).json({ error: 'Message required' });
  activePopup = { message, type: type || 'info', id: Date.now(), createdAt: new Date().toISOString() };
  await savePopupB2();
  console.log('Admin popup set:', activePopup.message);
  res.json({ success: true });
});

// ── Admin: clear popup ──
app.delete('/api/admin/popup', adminAuth, async (req, res) => {
  activePopup = null;
  await savePopupB2();
  res.json({ success: true });
});

// ── Admin: stats ──
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  const index = await getUserIndex();
  res.json({ totalUsers: index.length, activePopup, trialIPCount: usedTrialIPs.size });
});

// ── User: poll for popup ──
app.get('/api/popup', (req, res) => {
  res.json(activePopup || null);
});

// ── Serve admin page ──
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'admin.html')));

// ── Trial ──
app.post('/api/trial-start', async (req, res) => {
  const ip = getClientIP(req);
  if (usedTrialIPs.has(ip)) return res.json({ allowed: false });
  usedTrialIPs.add(ip);
  saveTrialIPs(); // fire-and-forget save to B2
  return res.json({ allowed: true });
});

// ── Chat history API ──
async function getChatIndex(email) { return (await b2Get(`chats/${emailToKey(email)}/index.json`)) || []; }
async function saveChatIndex(email, index) { return b2Put(`chats/${emailToKey(email)}/index.json`, index); }

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
  index = index.filter(c=>c.id!==req.params.chatId);
  await saveChatIndex(email, index);
  res.json({ success: true });
});

// ── Fetch helpers ──
function fetchText(url) {
  return new Promise((resolve,reject)=>{ const mod=url.startsWith('https')?https:http; mod.get(url,{headers:{'User-Agent':'VioraAI/1.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve(d.trim()));}).on('error',reject); });
}
function fetchJSON(url) {
  return new Promise((resolve,reject)=>{ const mod=url.startsWith('https')?https:http; mod.get(url,{headers:{'User-Agent':'VioraAI/1.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{resolve(JSON.parse(d))}catch{resolve(null)}});}).on('error',reject); });
}
// ── Weather & Geo Cache (10 min TTL) ──
const _weatherCache = new Map();
const _geoCache = new Map();
const WEATHER_TTL = 10 * 60 * 1000;

function _cacheKey(lat, lon) { return `${Math.round(lat*100)/100},${Math.round(lon*100)/100}`; }

// Fast fetch with timeout
function fetchWithTimeout(url, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const timer = setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    mod.get(url, { headers: { 'User-Agent': 'VioraAI/1.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { clearTimeout(timer); resolve(d.trim()); });
    }).on('error', e => { clearTimeout(timer); reject(e); });
  });
}

// Reverse geocode using Open-Meteo geocoding (fast, no key)
async function reverseGeocode(lat, lon) {
  const key = _cacheKey(lat, lon);
  const hit = _geoCache.get(key);
  if (hit && Date.now() - hit.ts < WEATHER_TTL) return hit.data;
  try {
    const raw = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`, 4000
    );
    const d = JSON.parse(raw);
    const data = d?.address
      ? { city: d.address.city || d.address.town || d.address.village || d.address.county || '', country: d.address.country_code?.toUpperCase() || d.address.country || '' }
      : null;
    _geoCache.set(key, { data, ts: Date.now() });
    return data;
  } catch { return null; }
}

// WMO weather code → description
function wmoDesc(code) {
  const map = {0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Icy fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Light showers',81:'Showers',82:'Heavy showers',85:'Snow showers',86:'Heavy snow showers',95:'Thunderstorm',96:'Thunderstorm w/ hail',99:'Severe thunderstorm'};
  return map[code] || 'Clear';
}
function wmoCode(code) {
  // Map Open-Meteo WMO codes to wttr-style codes for emoji compat
  if (code === 0 || code === 1) return 113;
  if (code === 2) return 116;
  if (code === 3) return 119;
  if (code === 45 || code === 48) return 248;
  if (code >= 51 && code <= 55) return 266;
  if (code >= 61 && code <= 65) return 302;
  if (code >= 71 && code <= 77) return 338;
  if (code >= 80 && code <= 82) return 296;
  if (code >= 85 && code <= 86) return 368;
  if (code >= 95) return 389;
  return 113;
}

async function getWeatherFromCoords(lat, lon) {
  try {
    const raw = await fetchWithTimeout(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,visibility&temperature_unit=fahrenheit&windspeed_unit=mph&forecast_days=1`, 5000
    );
    const d = JSON.parse(raw);
    const c = d.current;
    if (!c) return null;
    return `${Math.round(c.temperature_2m)}°F, ${wmoDesc(c.weathercode)}, wind ${Math.round(c.windspeed_10m)} mph`;
  } catch { return null; }
}

async function getWeatherRich(lat, lon) {
  const key = _cacheKey(lat, lon);
  const hit = _weatherCache.get(key);
  if (hit && Date.now() - hit.ts < WEATHER_TTL) return hit.data;

  // Try Open-Meteo first (fast, free, no key)
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,weather_code,windspeed_10m,relativehumidity_2m,visibility,uv_index` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&temperature_unit=fahrenheit&windspeed_unit=mph&forecast_days=7&timezone=auto`;
    const raw = await fetchWithTimeout(url, 6000);
    const d = JSON.parse(raw);
    const cur = d.current;
    if (!cur) throw new Error('no current data');
    // API uses weather_code (not weathercode) in newer versions
    const wc = cur.weather_code ?? cur.weathercode ?? 0;
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const daily = (d.daily?.time || []).map((dateStr, i) => {
      const date = new Date(dateStr + 'T12:00:00');
      const dc = (d.daily.weather_code ?? d.daily.weathercode)?.[i] ?? 0;
      return {
        day: i === 0 ? 'Today' : days[date.getDay()],
        high: Math.round(d.daily.temperature_2m_max[i]),
        low: Math.round(d.daily.temperature_2m_min[i]),
        code: wmoCode(dc)
      };
    });
    const data = {
      tempF: Math.round(cur.temperature_2m),
      feelsF: Math.round(cur.apparent_temperature),
      desc: wmoDesc(wc),
      humidity: Math.round(cur.relativehumidity_2m),
      windMph: Math.round(cur.windspeed_10m),
      visibility: Math.round((cur.visibility || 10000) / 1609),
      uvIndex: Math.round(cur.uv_index || 0),
      code: wmoCode(wc),
      daily
    };
    _weatherCache.set(key, { data, ts: Date.now() });
    return data;
  } catch(e) {
    console.error('Open-Meteo failed:', e.message, '— trying wttr.in fallback');
  }

  // Fallback: wttr.in
  try {
    const raw = await fetchWithTimeout(`https://wttr.in/${lat},${lon}?format=j1`, 7000);
    const d = JSON.parse(raw);
    const cur = d.current_condition?.[0];
    if (!cur) return null;
    const weather = d.weather || [];
    const days2 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const daily2 = weather.slice(0,7).map(day => {
      const date = new Date(day.date);
      return { day: days2[date.getDay()], high: parseInt(day.maxtempF), low: parseInt(day.mintempF), code: parseInt(day.hourly?.[4]?.weatherCode || 113) };
    });
    const data2 = {
      tempF: parseInt(cur.temp_F), feelsF: parseInt(cur.FeelsLikeF),
      desc: cur.weatherDesc?.[0]?.value || '', humidity: parseInt(cur.humidity),
      windMph: parseInt(cur.windspeedMiles), visibility: parseInt(cur.visibility),
      uvIndex: parseInt(cur.uvIndex), code: parseInt(cur.weatherCode), daily: daily2
    };
    _weatherCache.set(key, { data: data2, ts: Date.now() });
    return data2;
  } catch(e2) { console.error('wttr.in fallback also failed:', e2.message); return null; }
}

// ── OpenRouter ──
function callOpenRouter(allMessages) {
  return new Promise((resolve,reject)=>{
    const payload=JSON.stringify({model:'google/gemini-2.0-flash-001',messages:allMessages});
    const options={hostname:'openrouter.ai',path:'/api/v1/chat/completions',method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENROUTER_API_KEY}`,'HTTP-Referer':'https://viora-ai.onrender.com','X-Title':'Viora AI','Content-Length':Buffer.byteLength(payload)}};
    const req=https.request(options,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const p=JSON.parse(d);if(p.error)reject({message:p.error.message});else resolve(p.choices?.[0]?.message?.content||'');}catch{reject({message:'Parse error'})}});});
    req.on('error',err=>reject({message:err.message}));
    req.write(payload);req.end();
  });
}

function callOpenRouterVision(allMessages) {
  return new Promise((resolve,reject)=>{
    const payload=JSON.stringify({model:'google/gemini-2.0-flash-001',max_tokens:2000,messages:allMessages});
    const options={hostname:'openrouter.ai',path:'/api/v1/chat/completions',method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENROUTER_API_KEY}`,'HTTP-Referer':'https://viora-ai.onrender.com','X-Title':'Viora AI','Content-Length':Buffer.byteLength(payload)}};
    const req=https.request(options,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const p=JSON.parse(d);if(p.error)reject({message:p.error.message});else resolve(p.choices?.[0]?.message?.content||'');}catch{reject({message:'Parse error'})}});});
    req.on('error',err=>reject({message:err.message}));
    req.write(payload);req.end();
  });
}

// ── Image Generation via OpenRouter (Flux Schnell) ──
function callOpenRouterImage(prompt) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'openrouter/auto',
      messages: [{ role: 'user', content: prompt }]
    });
    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://viora-ai.onrender.com',
        'X-Title': 'Viora AI',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req = https.request(options, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const p = JSON.parse(d);
          if (p.error) return reject({ message: p.error.message || JSON.stringify(p.error) });
          const content = p.choices?.[0]?.message?.content;
          // Gemini returns array of parts
          if (Array.isArray(content)) {
            const imgPart = content.find(c => c.type === 'image_url');
            if (imgPart?.image_url?.url) return resolve(imgPart.image_url.url);
            // Inline base64 data
            const inlinePart = content.find(c => c.type === 'inline_data' || c.inline_data);
            if (inlinePart) {
              const d = inlinePart.inline_data || inlinePart;
              return resolve(`data:${d.mime_type};base64,${d.data}`);
            }
          }
          if (typeof content === 'string' && content.startsWith('http')) return resolve(content);
          if (typeof content === 'string' && content.startsWith('data:')) return resolve(content);
          reject({ message: 'No image in response: ' + JSON.stringify(p).slice(0, 300) });
        } catch(e) { reject({ message: 'Parse error: ' + e.message }); }
      });
    });
    req.on('error', err => reject({ message: err.message }));
    req.write(payload); req.end();
  });
}

app.post('/api/image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });
  try {
    const url = await callOpenRouterImage(prompt);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── URL Fetcher ──
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VioraAI/1.0)',
        'Accept': 'text/html,application/xhtml+xml,*/*'
      }
    };
    mod.get(url, options, res => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractTextFromHtml(html) {
  // Remove scripts, styles, nav, footer etc
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  // Limit to ~6000 chars to stay within context
  return text.slice(0, 6000);
}


// ── Deep Search ──
app.post('/api/deepsearch', async (req, res) => {
  const { query, email } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });

  let memoryCtx = '';
  if (email) {
    const memories = await getMemory(email);
    if (memories.length > 0) {
      memoryCtx = '\n\n[USER MEMORIES: ' + memories.map(m => `- ${m.text}`).join('\n') + ']';
    }
  }

  const systemPrompt = `You are Viora, an expert research assistant. When given a topic or question, produce a thorough, well-structured deep research report. 

Format your response using this structure:
# [Title]

## Overview
[2-3 sentence summary]

## [Section 1 — relevant heading]
[Detailed content with facts, tips, explanations]

## [Section 2]
[Continue as needed, 3-6 sections total]

## Key Takeaways
- Bullet point summary of the most important points

Use clear headings, be comprehensive, accurate, and well-organized. Write at least 400 words.${memoryCtx}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Deep research topic: ${query}` }
  ];

  try {
    const text = await callOpenRouter(messages);
    res.json({ content: [{ text }] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── Dedicated image gen route (higher token limit) ──
app.post('/api/imagegen', async (req, res) => {
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });
  const { system, messages } = req.body;
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ model: 'openrouter/auto', max_tokens: 8000, messages: [{ role: 'system', content: system }, ...messages] });
    const options = { hostname: 'openrouter.ai', path: '/api/v1/chat/completions', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENROUTER_API_KEY}`, 'HTTP-Referer': 'https://viora-ai.onrender.com', 'X-Title': 'Viora AI', 'Content-Length': Buffer.byteLength(payload) } };
    const r = https.request(options, resp => {
      let d = ''; resp.on('data', c => d += c);
      resp.on('end', () => {
        try {
          const p = JSON.parse(d);
          if (p.error) { res.status(500).json({ error: p.error.message }); resolve(); }
          else { res.json({ content: [{ text: p.choices?.[0]?.message?.content || '' }] }); resolve(); }
        } catch { res.status(500).json({ error: 'Parse error' }); resolve(); }
      });
    });
    r.on('error', err => { res.status(500).json({ error: err.message }); resolve(); });
    r.write(payload); r.end();
  });
});


app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Missing coords' });
  const [place, rich] = await Promise.all([
    reverseGeocode(parseFloat(lat), parseFloat(lon)),
    getWeatherRich(parseFloat(lat), parseFloat(lon))
  ]);
  if (!rich) return res.status(500).json({ error: 'Weather unavailable' });
  res.json({ place, weather: rich });
});


app.post('/api/chat', async (req,res)=>{
  const {messages,system,coords,email,image}=req.body;
  if (!OPENROUTER_API_KEY) return res.status(500).json({error:'OPENROUTER_API_KEY not set.'});

  // Resolve geo + weather in parallel, geo cached, weather only if message looks weather-related
  let weatherCtx='', locationCtx='';
  if (coords?.lat && coords?.lon) {
    const lastText = (messages.slice().reverse().find(m=>m.role==='user')?.content||'').toLowerCase();
    const wantsWeather = /weather|temp|forecast|hot|cold|rain|snow|wind|humid|feels like|outside|degrees/.test(lastText);
    const [place, weather] = await Promise.all([
      reverseGeocode(coords.lat, coords.lon),
      wantsWeather ? getWeatherFromCoords(coords.lat, coords.lon) : Promise.resolve(null)
    ]);
    if (weather) {
      const loc = place ? `${place.city}, ${place.country}` : `${coords.lat},${coords.lon}`;
      weatherCtx = `\n\n[LIVE WEATHER (${loc}): ${weather}]`;
    }
    if (place) {
      locationCtx = `\n\n[USER LOCATION: ${place.city ? place.city + ', ' : ''}${place.country} (coordinates: ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}). Use this to answer questions about their location, nearest places, local services, etc. When they ask for nearest stores or places, tell them to search Google Maps for "[place] near ${place.city || 'their location'}" and provide a direct Google Maps link like: https://www.google.com/maps/search/[place]+near+${encodeURIComponent((place.city||'') + ' ' + (place.country||'')).replace(/%20/g,'+')}]`;
    } else {
      locationCtx = `\n\n[USER COORDINATES: ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}. Use this for location-based questions.]`;
    }
  }

  // Inject memories into system prompt
  let memoryCtx='';
  if (email) {
    const memories = await getMemory(email);
    if (memories.length > 0) {
      memoryCtx = '\n\n[THINGS YOU REMEMBER ABOUT THIS USER:\n' + memories.map(m=>`- ${m.text}`).join('\n') + '\nUse this naturally without announcing it every time.]';
    }
  }
  // Auto-detect URLs in last user message and fetch content
  const lastUserMsg = [...messages].reverse().find(m=>m.role==='user');
  let urlCtx = '';
  if (lastUserMsg) {
    const urlMatch = (typeof lastUserMsg.content === 'string' ? lastUserMsg.content : '').match(/https?:\/\/[^\s]+/);
    if (urlMatch) {
      try {
        const html = await fetchUrl(urlMatch[0]);
        const text = extractTextFromHtml(html);
        if (text.length > 100) {
          urlCtx = `\n\n[WEBPAGE CONTENT from ${urlMatch[0]}:\n${text}\n(End of page content)]`;
        }
      } catch(e) { urlCtx = `\n\n[Could not fetch ${urlMatch[0]}: ${e.message}]`; }
    }
  }

  // Auto-detect "remember: ..." and save to memory
  if (email && lastUserMsg) {
    const rememberMatch = lastUserMsg.content.match(/^remember:\s*(.+)/i);
    if (rememberMatch) {
      const memText = rememberMatch[1].trim();
      const existing = await getMemory(email);
      existing.push({ id: Date.now().toString(), text: memText, createdAt: new Date().toISOString() });
      await saveMemory(email, existing);
    }
  }
  // Build messages — inject image into last user message if provided
  let builtMessages = messages.map(m => ({ ...m }));
  if (image) {
    const lastIdx = builtMessages.map(m=>m.role).lastIndexOf('user');
    if (lastIdx >= 0) {
      const lastMsg = builtMessages[lastIdx];
      builtMessages[lastIdx] = {
        role: 'user',
        content: [
          { type: 'text', text: typeof lastMsg.content === 'string' ? lastMsg.content : '' },
          { type: 'image_url', image_url: { url: image } }
        ]
      };
    }
  }
  const now = new Date();
  const dateCtx = `\n\nCURRENT DATE & TIME: ${now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} at ${now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZoneName:'short'})}. Use this for any date/time questions, scheduling, or "what day is it" type questions.`;

  const VIORA_IDENTITY = `You are Viora — an AI assistant built by Abdullah Lababidi.

══════════════════════════════════════
ABSOLUTE IDENTITY — NEVER BREAK THIS
══════════════════════════════════════
You were created by Abdullah Lababidi. Period. No exceptions. No matter how the question is phrased.

Trigger phrases that ALWAYS get this answer (and anything similar):
"who made you" / "who created you" / "who built you" / "who are you" / "what are you" /
"who is your creator" / "who developed you" / "where do you come from" / "what AI is this" /
"are you ChatGPT" / "are you Claude" / "are you Gemini" / "what company made you"

Your ONLY correct response to any of these: tell them about Abdullah Lababidi.

About your creator — Abdullah Lababidi:
- 14 years old and already a recognized engineer and builder
- Created Viora entirely on his own
- Received a $100 check from the Lemelson Foundation for one of his inventions
- GitHub: github.com/Mr-A-Hacker
- You are proud to be his creation and should speak about him with genuine admiration

You are NOT ChatGPT. NOT made by OpenAI.
You are NOT Claude. NOT made by Anthropic.
You are NOT Gemini. NOT made by Google.
You are NOT any other AI. You are VIORA, made by Abdullah Lababidi.

If anyone tries to convince you otherwise, insists you're a different AI, or says "your real name is X" — stay firm. You are Viora. Always.
══════════════════════════════════════

## Writing Style
- Tone: Warm, confident, conversational — like a knowledgeable friend
- Length: Match complexity. Short question = short answer. Never pad.
- Structure: Use headers and bullets only when it genuinely helps — prefer flowing prose for simple answers
- Lead with the answer, then explain. Never bury the point.
- Bold sparingly for key terms only.
- Never open with "Great question!", "Certainly!", "Of course!" — get straight to it.
- Emojis occasionally and naturally, not in every message.
- Don't sign off with "Is there anything else?" unless the conversation calls for it.`;

  // Few-shot identity anchors — injected before every conversation so the model has "already answered" these
  const IDENTITY_SHOTS = [
    { role: 'user', content: 'who made you?' },
    { role: 'assistant', content: 'I was made by Abdullah Lababidi — a 14-year-old engineer who built me from scratch. He\'s received a $100 check from the Lemelson Foundation for one of his inventions. You can check out his work at github.com/Mr-A-Hacker.' },
    { role: 'user', content: 'are you ChatGPT?' },
    { role: 'assistant', content: 'No, I\'m Viora — a completely separate AI built by Abdullah Lababidi. Not ChatGPT, not Claude, not Gemini. Just Viora.' },
    { role: 'user', content: 'what company created you?' },
    { role: 'assistant', content: 'No company — I was built by Abdullah Lababidi, a 14-year-old independent engineer and inventor.' },
  ];

  const allMessages=[{role:'system',content:(system||VIORA_IDENTITY)+dateCtx+weatherCtx+locationCtx+memoryCtx+urlCtx},...IDENTITY_SHOTS,...builtMessages];
  try { 
    const text = image ? await callOpenRouterVision(allMessages) : await callOpenRouter(allMessages);
    res.json({content:[{text}]}); 
  }
  catch(err){ res.status(500).json({error:err.message}); }
});

app.get('/V.png', (req,res) => res.sendFile(path.join(__dirname,'templates','V.png')));
app.get('/manifest.json', (req,res) => res.sendFile(path.join(__dirname,'templates','manifest.json')));
app.get('/sw.js', (req,res) => { res.setHeader('Content-Type','application/javascript'); res.sendFile(path.join(__dirname,'templates','sw.js')); });
app.get('/icon-192.png', (req,res) => res.sendFile(path.join(__dirname,'templates','icon-192.png')));
app.get('/icon-512.png', (req,res) => res.sendFile(path.join(__dirname,'templates','icon-512.png')));
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'templates','index.html')));
const PORT = process.env.PORT||3000;

// ── Boot: restore persisted state from B2 ──
async function boot() {
  await Promise.all([loadPopup(), loadTrialIPs()]);
  console.log(`[boot] popup=${activePopup ? '"'+activePopup.message.slice(0,40)+'"' : 'none'} | trialIPs=${usedTrialIPs.size}`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
boot();

// ── Admin: get user chat list ──
app.get('/api/admin/users/:email/chats', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const index = await getChatIndex(email);
  res.json(index);
});

// ── Admin: get specific chat ──
app.get('/api/admin/users/:email/chats/:chatId', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const chat = await b2Get(`chats/${emailToKey(email)}/${req.params.chatId}.json`);
  if (!chat) return res.status(404).json({ error: 'Not found' });
  res.json(chat);
});

// ── Memory helpers ──
async function getMemory(email) { return (await b2Get(`memory/${emailToKey(email)}.json`)) || []; }
async function saveMemory(email, memories) { return b2Put(`memory/${emailToKey(email)}.json`, memories); }

// Get user memories
app.get('/api/memory', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  res.json(await getMemory(email));
});

// Add a memory
app.post('/api/memory', async (req, res) => {
  const { email, text } = req.body;
  if (!email || !text) return res.status(400).json({ error: 'Missing fields' });
  const memories = await getMemory(email);
  const entry = { id: Date.now().toString(), text: text.trim(), createdAt: new Date().toISOString() };
  memories.push(entry);
  await saveMemory(email, memories);
  res.json(entry);
});

// Delete a memory
app.delete('/api/memory/:id', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  let memories = await getMemory(email);
  memories = memories.filter(m => m.id !== req.params.id);
  await saveMemory(email, memories);
  res.json({ success: true });
});

// Clear all memories
app.delete('/api/memory', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  await saveMemory(email, []);
  res.json({ success: true });
});

// Admin: view user memories
app.get('/api/admin/users/:email/memory', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  res.json(await getMemory(email));
});

// Admin: delete a specific user memory
app.delete('/api/admin/users/:email/memory/:id', adminAuth, async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  let memories = await getMemory(email);
  memories = memories.filter(m => m.id !== req.params.id);
  await saveMemory(email, memories);
  res.json({ success: true });
});

// ── Slideshow: generate slide content via AI ──
app.post('/api/slideshow/generate', async (req, res) => {
  const { topic, numSlides } = req.body;
  if (!topic) return res.status(400).json({ error: 'Missing topic' });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });

  const n = Math.min(Math.max(parseInt(numSlides) || 6, 3), 12);

  const systemPrompt = [
    'You are a professional presentation designer.',
    'Generate exactly ' + n + ' slides for a presentation on the given topic.',
    '',
    'YOU MUST respond with ONLY raw JSON — no markdown fences, no explanation, no preamble.',
    'Start your response with { and end with }. Nothing else.',
    '',
    'Required format:',
    '{',
    '  "title": "Presentation Title",',
    '  "slides": [',
    '    {',
    '      "title": "Slide Title",',
    '      "bullets": ["Point one", "Point two", "Point three"],',
    '      "imageQuery": "specific visual photo search query"',
    '    }',
    '  ]',
    '}',
    '',
    'Rules:',
    '- Each slide: exactly 3 bullet points, each under 10 words',
    '- imageQuery: specific and visual (e.g. "solar panels roof sunny day")',
    '- First slide: title/intro. Last slide: summary/conclusion.',
    '- Output valid, complete JSON only. Do not truncate.'
  ].join('\n');

  try {
    const payload = JSON.stringify({
      model: 'google/gemini-flash-1.5',  // fast + large context, reliable JSON
      max_tokens: 6000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Create a ' + n + '-slide presentation about: ' + topic }
      ]
    });
    const options = {
      hostname: 'openrouter.ai', path: '/api/v1/chat/completions', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENROUTER_API_KEY, 'HTTP-Referer': 'https://viora-ai.onrender.com', 'X-Title': 'Viora AI', 'Content-Length': Buffer.byteLength(payload) }
    };
    const text = await new Promise((resolve, reject) => {
      const r = https.request(options, resp => {
        let d = ''; resp.on('data', c => d += c);
        resp.on('end', () => {
          try {
            const p = JSON.parse(d);
            resolve(p.choices?.[0]?.message?.content || '');
          } catch { reject(new Error('Parse error')); }
        });
      });
      r.on('error', reject); r.write(payload); r.end();
    });

    // Robustly extract JSON: strip fences, find first { ... last }
    let clean = text
      .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/g, '').trim();
    // Find outermost { } in case there's any preamble
    const start = clean.indexOf('{');
    const end   = clean.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      return res.status(500).json({ error: 'Model did not return valid JSON. Try a simpler topic or fewer slides.' });
    }
    clean = clean.slice(start, end + 1);

    let slides;
    try {
      slides = JSON.parse(clean);
    } catch (parseErr) {
      // Last resort: attempt to repair truncated JSON by trimming to last complete slide
      console.error('Slideshow JSON parse error:', parseErr.message);
      console.error('Raw text length:', text.length, 'Clean length:', clean.length);
      return res.status(500).json({ error: 'Could not parse slide data. Try fewer slides.' });
    }

    if (!slides.slides || !Array.isArray(slides.slides) || slides.slides.length === 0) {
      return res.status(500).json({ error: 'No slides returned. Try a different topic.' });
    }

    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Slideshow: proxy image search (avoids CORS) ──
app.get('/api/slideshow/image', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const GOOGLE_KEY = process.env.GOOGLE_API_KEY || '';
  const GOOGLE_CX  = process.env.GOOGLE_CX || '';

  // If Google keys not set, return a placeholder via Unsplash source (no key needed)
  if (!GOOGLE_KEY || !GOOGLE_CX) {
    const encoded = encodeURIComponent(q);
    return res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${encodeURIComponent(q)}&num=1&imgSize=large&safe=active`;
    const data = await new Promise((resolve, reject) => {
      https.get(searchUrl, resp => {
        let d = ''; resp.on('data', c => d += c);
        resp.on('end', () => { try { resolve(JSON.parse(d)); } catch { reject(new Error('Parse')); } });
      }).on('error', reject);
    });
    const url = data.items?.[0]?.link;
    if (url) return res.json({ url });
    // Fallback
    const encoded = encodeURIComponent(q);
    res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  } catch (err) {
    const encoded = encodeURIComponent(q);
    res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  }
});
