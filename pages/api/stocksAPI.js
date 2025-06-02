//Product-portal-frontend\src\api\stocksAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get current stock quote for a symbol.
 * @param {string} symbol
 * @returns {Promise<Object>}
 */
export async function getStockQuote(symbol) {
  const res = await fetch(`${BASE_URL}/stocks/quote?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    throw new Error(`Error fetching quote for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get the day's high and low for a symbol.
 * @param {string} symbol
 * @returns {Promise<Object>}
 */
export async function getStockHighLow(symbol) {
  const res = await fetch(`${BASE_URL}/stocks/highlow?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    throw new Error(`Error fetching high/low for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get market capitalization for a symbol.
 * @param {string} symbol
 * @returns {Promise<Object>}
 */
export async function getMarketCap(symbol) {
  const res = await fetch(`${BASE_URL}/stocks/marketcap?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    throw new Error(`Error fetching market cap for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Create an alert when a stock crosses a threshold.
 * @param {string} symbol
 * @param {{ above?: number, below?: number }} thresholds
 * @returns {Promise<Object>}
 */
export async function alertStockThreshold(symbol, { above, below }) {
  const res = await fetch(`${BASE_URL}/stocks/alert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, above, below }),
  });
  if (!res.ok) {
    throw new Error(`Error setting alert for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get the top gainers in the market.
 * @returns {Promise<Object[]>}
 */
export async function getTopGainers() {
  const res = await fetch(`${BASE_URL}/stocks/top-gainers`);
  if (!res.ok) {
    throw new Error(`Error fetching top gainers: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get historical price data for a symbol.
 * @param {string} symbol
 * @returns {Promise<Object[]>}
 */
export async function getStockHistory(symbol) {
  const res = await fetch(`${BASE_URL}/stocks/history?symbol=${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    throw new Error(`Error fetching history for ${symbol}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Compare two symbols side by side.
 * @param {string} symbol1
 * @param {string} symbol2
 * @returns {Promise<Object>}
 */
export async function compareStocks(symbol1, symbol2) {
  const symbols = `${encodeURIComponent(symbol1)},${encodeURIComponent(symbol2)}`;
  const res = await fetch(`${BASE_URL}/stocks/compare?symbols=${symbols}`);
  if (!res.ok) {
    throw new Error(`Error comparing ${symbol1} and ${symbol2}: ${res.statusText}`);
  }
  return res.json();
}
