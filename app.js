const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'templates')));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

// ── IP trial tracking ──
const usedTrialIPs = new Set();

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
}

app.post('/api/trial-start', (req, res) => {
  const ip = getClientIP(req);
  console.log(`Trial attempt from IP: ${ip}`);
  if (usedTrialIPs.has(ip)) return res.json({ allowed: false });
  usedTrialIPs.add(ip);
  console.log(`Trial granted to IP: ${ip}`);
  return res.json({ allowed: true });
});

// ── Fetch helpers ──
function fetchText(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'VioraAI/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'VioraAI/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    }).on('error', reject);
  });
}

// ── Reverse geocode lat/lon → city name ──
async function reverseGeocode(lat, lon) {
  try {
    const data = await fetchJSON(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    if (data?.address) {
      const city = data.address.city || data.address.town || data.address.village || data.address.county || '';
      const country = data.address.country || '';
      return { city, country };
    }
  } catch (e) {
    console.error('Geocode failed:', e.message);
  }
  return null;
}

// ── Get weather from coords ──
async function getWeatherFromCoords(lat, lon) {
  try {
    // wttr.in supports lat,lon directly
    const weather = await fetchText(`https://wttr.in/${lat},${lon}?format=3`);
    return weather;
  } catch (e) {
    console.error('Weather fetch failed:', e.message);
    return null;
  }
}

// ── OpenRouter call ──
function callOpenRouter(allMessages) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'openrouter/auto',
      messages: allMessages
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://ai-1x5q.onrender.com',
        'X-Title': 'Viora AI',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject({ message: parsed.error.message });
          else resolve(parsed.choices?.[0]?.message?.content || '');
        } catch (e) { reject({ message: 'Parse error' }); }
      });
    });

    req.on('error', err => reject({ message: err.message }));
    req.write(payload);
    req.end();
  });
}

// ── Main chat endpoint ──
app.post('/api/chat', async (req, res) => {
  const { messages, system, coords } = req.body;

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not set on server.' });
  }

  let weatherContext = '';

  // If browser sent GPS coords, fetch real weather
  if (coords && coords.lat && coords.lon) {
    console.log(`GPS coords received: ${coords.lat}, ${coords.lon}`);

    const [place, weather] = await Promise.all([
      reverseGeocode(coords.lat, coords.lon),
      getWeatherFromCoords(coords.lat, coords.lon)
    ]);

    if (weather) {
      const locationName = place ? `${place.city}, ${place.country}` : `${coords.lat}, ${coords.lon}`;
      weatherContext = `\n\n[LIVE WEATHER (from user's GPS — ${locationName}): ${weather}. Use this data to answer their weather question accurately.]`;
      console.log(`Weather injected for ${locationName}: ${weather}`);
    }
  }

  const systemPrompt = (system || 'You are Viora, a friendly, warm and helpful AI assistant. Be clear, concise and encouraging.') + weatherContext;

  const allMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  try {
    const text = await callOpenRouter(allMessages);
    res.json({ content: [{ text }] });
  } catch (err) {
    console.error('OpenRouter error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
