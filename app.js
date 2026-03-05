const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'templates')));

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// Proxy endpoint — keeps API key server-side
app.post('/api/chat', (req, res) => {
  const { messages, system } = req.body;

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set on server.' });
  }

  const payload = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: system || 'You are AXIOM, a sleek, highly capable AI assistant with a slightly futuristic but friendly personality. Be concise, precise, and helpful.',
    messages
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      try {
        res.status(apiRes.statusCode).json(JSON.parse(data));
      } catch {
        res.status(500).json({ error: 'Invalid response from API' });
      }
    });
  });

  apiReq.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  apiReq.write(payload);
  apiReq.end();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
