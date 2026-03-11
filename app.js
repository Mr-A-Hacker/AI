// ... (keep all the existing code until the slideshow section)

// ── Slideshow: generate slide content via AI ──
app.post('/api/slideshow/generate', async (req, res) => {
  const { topic, numSlides } = req.body;
  if (!topic) return res.status(400).json({ error: 'Missing topic' });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set.' });

  const n = Math.min(Math.max(parseInt(numSlides) || 6, 3), 12);

  // Check if this is a project description (contains multiple lines or specific keywords)
  const isProjectDesc = topic.length > 100 || 
                        topic.includes('project') || 
                        topic.includes('app') || 
                        topic.includes('startup') ||
                        topic.includes('Create a comprehensive');

  let userPrompt;
  
  if (isProjectDesc) {
    // This is a project description - use the enhanced prompt
    userPrompt = [
      'You are a professional project consultant. Based on this project description:',
      '',
      `"${topic}"`,
      '',
      `Create a comprehensive ${n}-slide presentation that covers:`,
      '1. Project overview & vision',
      '2. Key features / functionality',
      '3. Target audience / users',
      '4. Technical requirements (if applicable)',
      '5. Timeline / milestones',
      '6. Success metrics / goals',
      '7. Potential challenges & solutions',
      '8. Next steps / launch plan',
      '',
      'Return ONLY a raw JSON object. No markdown. No explanation. Start with { and end with }.',
      '',
      'Format:',
      '{',
      '  "title": "Project: [catchy title based on description]",',
      '  "slides": [',
      '    {',
      '      "title": "Engaging Slide Title (5-8 words, action-oriented)",',
      '      "paragraph": "Detailed paragraph about this aspect of the project. Be informative, specific, and professional.",',
      '      "imageQuery": "specific descriptive photo search term relevant to this slide"',
      '    }',
      '  ]',
      '}',
      '',
      'Rules:',
      '- Exactly ' + n + ' slides total',
      '- Each slide should have a clear focus and help present the project professionally',
      '- Slide titles: 5-8 words, compelling, specific',
      '- Paragraph: 2-4 sentences, 50-80 words, written as flowing prose — NO bullet points',
      '- imageQuery: specific and visual, relevant to the slide content',
      '- First slide = engaging introduction to the project',
      '- Last slide = memorable conclusion or next steps'
    ].join('\n');
  } else {
    // Regular topic prompt
    userPrompt = [
      'Create a ' + n + '-slide presentation about: ' + topic,
      '',
      'Return ONLY a raw JSON object. No markdown. No explanation. Start with { and end with }.',
      '',
      'Format:',
      '{',
      '  "title": "Compelling Presentation Title",',
      '  "slides": [',
      '    {',
      '      "title": "Engaging Slide Title (5-8 words, action-oriented)",',
      '      "paragraph": "Two to three informative sentences that explain this slide topic clearly and engagingly. Write in flowing prose — not bullets. Be specific, factual, and interesting.",',
      '      "imageQuery": "specific descriptive photo search term"',
      '    }',
      '  ]',
      '}',
      '',
      'Rules:',
      '- Exactly ' + n + ' slides total',
      '- Slide titles: 5-8 words, compelling, specific (e.g. "How Black Holes Bend Space and Time" not just "Black Holes")',
      '- Presentation title: punchy and professional, max 7 words',
      '- Paragraph: 2-3 complete sentences, 40-70 words, written as flowing prose — NO bullet points',
      '- imageQuery: specific and visual (e.g. "astronaut floating in space station" not just "space")',
      '- First slide = engaging introduction to the topic',
      '- Last slide = memorable conclusion or key takeaways',
      '- Middle slides = cover distinct aspects of the topic in logical order'
    ].join('\n');
  }

  try {
    const payload = JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      max_tokens: 8000,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
        'HTTP-Referer': 'https://viora-ai.onrender.com',
        'X-Title': 'Viora AI',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const raw = await new Promise((resolve, reject) => {
      const r = https.request(options, resp => {
        let d = '';
        resp.on('data', c => d += c);
        resp.on('end', () => resolve(d));
      });
      r.on('error', reject);
      r.write(payload);
      r.end();
    });

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(500).json({ error: 'OpenRouter response was not JSON.' });
    }

    if (parsed.error) {
      console.error('OpenRouter error:', parsed.error);
      return res.status(500).json({
        error: 'AI error: ' + (parsed.error.message || JSON.stringify(parsed.error))
      });
    }

    const text = parsed.choices?.[0]?.message?.content || '';
    if (!text) {
      console.error('Empty content. Full response:', JSON.stringify(parsed).slice(0, 500));
      return res.status(500).json({ error: 'AI returned empty content.' });
    }

    console.log('Slideshow raw text (first 300):', text.slice(0, 300));

    // Clean the response - remove markdown code blocks if present
    let clean = text
      .replace(/^```json\s*/im, '')
      .replace(/^```\s*/im, '')
      .replace(/```\s*$/gm, '')
      .trim();

    // Find the first { and last }
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
      console.error('No JSON braces found in:', clean.slice(0, 300));
      return res.status(500).json({
        error: 'AI did not return JSON. Raw: ' + clean.slice(0, 120)
      });
    }

    clean = clean.slice(start, end + 1);

    let slides;
    try {
      slides = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse failed:', e.message, '\nClean (first 300):', clean.slice(0, 300));
      return res.status(500).json({ error: 'JSON parse failed: ' + e.message });
    }

    // Validate the response structure
    if (!slides || typeof slides !== 'object') {
      return res.status(500).json({ error: 'Invalid response structure.' });
    }

    if (!Array.isArray(slides.slides) || slides.slides.length === 0) {
      return res.status(500).json({ error: 'No slides in response.' });
    }

    // Ensure each slide has the required fields
    slides.slides = slides.slides.map(slide => ({
      title: slide.title || 'Untitled Slide',
      paragraph: slide.paragraph || slide.description || 'No content available.',
      imageQuery: slide.imageQuery || slide.image_query || 'presentation background'
    }));

    // Ensure we have exactly the requested number of slides
    if (slides.slides.length > n) {
      slides.slides = slides.slides.slice(0, n);
    }

    res.json(slides);
  } catch (err) {
    console.error('Slideshow generate error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Slideshow: proxy image search ──
app.get('/api/slideshow/image', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const GOOGLE_KEY = process.env.GOOGLE_API_KEY || '';
  const GOOGLE_CX = process.env.GOOGLE_CX || '';

  // If no Google API keys, use Unsplash as fallback
  if (!GOOGLE_KEY || !GOOGLE_CX) {
    const encoded = encodeURIComponent(q);
    return res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${encodeURIComponent(q)}&num=1&imgSize=large&safe=active`;

    const data = await new Promise((resolve, reject) => {
      https.get(searchUrl, resp => {
        let d = '';
        resp.on('data', c => d += c);
        resp.on('end', () => {
          try {
            resolve(JSON.parse(d));
          } catch {
            reject(new Error('Parse error'));
          }
        });
      }).on('error', reject);
    });

    const url = data.items?.[0]?.link;
    if (url) {
      // Validate URL
      try {
        new URL(url);
        return res.json({ url });
      } catch {
        // Invalid URL, fall back to Unsplash
      }
    }

    // Fallback to Unsplash if no valid image found
    const encoded = encodeURIComponent(q);
    res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  } catch (err) {
    console.error('Image search error:', err.message);
    const encoded = encodeURIComponent(q);
    res.json({ url: `https://source.unsplash.com/800x500/?${encoded}` });
  }
});

// ... (rest of the file remains the same)
