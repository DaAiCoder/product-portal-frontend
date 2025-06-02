// File: src/api/translatorAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Translate text between languages.
 * @param {string} text
 * @param {string} targetLang – e.g. 'en'
 * @param {string} [sourceLang] – e.g. 'es'
 * @returns {Promise<{ translatedText: string }>}
 */
export async function translateText(text, targetLang, sourceLang) {
  const payload = { text, targetLang };
  if (sourceLang) payload.sourceLang = sourceLang;
  const res = await fetch(`${BASE_URL}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Error translating text: ${res.statusText}`);
  }
  return res.json();
}
