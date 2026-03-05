const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'templates')));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

app.post('/api/chat', (req, res) => {
  const { messages, system } = req.body;

  if (!OPENROUTER_API_KEY) {
    console.error('ERROR: OPENROUTER_API_KEY is not set');
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not set on server.' });
  }

  const allMessages = [
    { role: 'system', content: system || 'You are AXIOM, a sleek, highly capable AI assistant with a slightly futuristic but friendly personality. Be concise, precise, and helpful.' },
    ...messages
  ];

  const payload = JSON.stringify({
    model: 'openrouter/auto',   // auto-selects best available free model
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
      'X-Title': 'AXIOM AI',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      console.log('OpenRouter status:', apiRes.statusCode);
      try {
        const parsed = JSON.parse(data);
        if (parsed.error) {
          console.error('OpenRouter error:', parsed.error.message);
          return res.status(500).json({ error: parsed.error.message });
        }
        const text = parsed.choices?.[0]?.message?.content || 'No response received.';
        console.log('Model used:', parsed.model);
        res.json({ content: [{ text }] });
      } catch (e) {
        console.error('Parse error:', e);
        res.status(500).json({ error: 'Invalid response from API' });
      }
    });
  });

  apiReq.on('error', (err) => {
    console.error('Request error:', err.message);
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
