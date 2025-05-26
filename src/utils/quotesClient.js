// src/utils/quotesClient.js
const BASE = '/api/quotesAPI';

/** GET /api/quotesAPI?topic=... */
export async function getQuote(topic = '') {
  const url = topic
    ? `${BASE}?topic=${encodeURIComponent(topic)}`
    : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching quote (${res.status})`);
  return res.json();
}
