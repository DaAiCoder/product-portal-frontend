// File: src/pages/api/search.js

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  // 1. Try Wikipedia summary
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      if (wikiData.extract) {
        return res.status(200).json({
          summary: wikiData.extract,
          source: {
            name: 'Wikipedia',
            url: wikiData.content_urls.desktop.page,
          },
        });
      }
    }
  } catch (err) {
    console.warn('Wikipedia lookup failed', err);
  }

  // 2. Fallback to DuckDuckGo Instant Answer
  try {
    const ddgRes = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`
    );
    if (ddgRes.ok) {
      const ddgData = await ddgRes.json();
      let text = ddgData.AbstractText;
      let url  = ddgData.AbstractURL;
      if (!text && Array.isArray(ddgData.RelatedTopics) && ddgData.RelatedTopics.length) {
        const first = ddgData.RelatedTopics[0];
        text = first.Text;
        url  = first.FirstURL;
      }
      if (text) {
        return res.status(200).json({
          summary: text,
          source: { name: 'DuckDuckGo', url },
        });
      }
    }
  } catch (err) {
    console.warn('DuckDuckGo lookup failed', err);
  }

  // 3. No data found
  return res.status(200).json({
    summary: 'No summary found for that query.',
    source: null
  });
}
