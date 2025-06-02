// src/utils/quotesClient.js
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL + '/quote';

export async function getQuote() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Error fetching quote (${res.status})`);
  return res.json();
}

