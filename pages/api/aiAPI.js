// File: src/pages/api/ai.js

export default async function handler(req, res) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }
  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  if (!HF_TOKEN) {
    return res.status(500).json({ error: 'Missing HUGGINGFACE_API_TOKEN' });
  }

  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { 
            max_new_tokens: 150,
            temperature: 0.7
          }
        })
      }
    );
    if (!hfRes.ok) {
      const err = await hfRes.text();
      throw new Error(`HF error: ${err}`);
    }
    const hfJson = await hfRes.json();
    // For text-generation API, HF returns an array of { generated_text }
    const answer = Array.isArray(hfJson) && hfJson[0].generated_text
      ? hfJson[0].generated_text.trim()
      : hfJson.generated_text?.trim() || '';

    return res.status(200).json({ answer });
  } catch (e) {
    console.error('AI fallback error', e);
    return res.status(500).json({ error: 'AI inference failed' });
  }
}
