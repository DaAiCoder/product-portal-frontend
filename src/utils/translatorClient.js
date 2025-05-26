// src/utils/translatorClient.js
const BASE = '/api/translatorAPI';

/** POST { text, to } */
export async function translateText(text, to) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, to }),
  });
  if (!res.ok) throw new Error(`Error translating text (${res.status})`);
  return res.json();
}
