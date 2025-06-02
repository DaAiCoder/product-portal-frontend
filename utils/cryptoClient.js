// src/utils/cryptoClient.js
const BASE = '/api/cryptoAPI';

/** GET /api/cryptoAPI?coin=... */
export async function getCryptoPrice(coin) {
  const res = await fetch(`${BASE}?coin=${encodeURIComponent(coin)}`);
  if (!res.ok) throw new Error(`Error fetching price (${res.status})`);
  return res.json();
}

/** POST { action:"alert", coin, threshold } */
export async function setCryptoAlert(coin, threshold) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'alert', coin, threshold }),
  });
  if (!res.ok) throw new Error(`Error setting alert (${res.status})`);
  return res.json();
}

/** GET /api/cryptoAPI?history=coin */
export async function getCryptoHistory(coin) {
  const res = await fetch(`${BASE}?history=${encodeURIComponent(coin)}`);
  if (!res.ok) throw new Error(`Error fetching history (${res.status})`);
  return res.json();
}
