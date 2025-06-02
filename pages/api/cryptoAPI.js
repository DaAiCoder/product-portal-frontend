// File: src/api/cryptoAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get current price for a crypto symbol.
 * @param {string} symbol
 * @returns {Promise<{ symbol: string, price: number }>}
 */
export async function getCryptoPrice(symbol) {
  const res = await fetch(
    `${BASE_URL}/crypto/price?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching price for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get historical price data for a symbol.
 * @param {string} symbol
 * @returns {Promise<Array<{ date: string, price: number }>>}
 */
export async function getCryptoHistory(symbol) {
  const res = await fetch(
    `${BASE_URL}/crypto/history?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching history for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Create an alert when a crypto crosses a threshold.
 * @param {string} symbol
 * @param {{ above?: number; below?: number }} thresholds
 * @returns {Promise<Object>}
 */
export async function alertCryptoThreshold(symbol, { above, below }) {
  const res = await fetch(`${BASE_URL}/crypto/alert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, above, below }),
  });
  if (!res.ok) {
    throw new Error(`Error setting alert for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}
