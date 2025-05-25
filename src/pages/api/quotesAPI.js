//Product-portal-frontend\src\api\quotesAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch a random quote.
 * @returns {Promise<{ text: string, author?: string }>}
 */
export async function getQuote() {
  const res = await fetch(`${BASE_URL}/quotes/random`);
  if (!res.ok) {
    throw new Error(`Error fetching quote: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch a random quote by category.
 * @param {string} category
 * @returns {Promise<{ text: string, author?: string }>}
 */
export async function getQuotesByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/quotes/random?category=${encodeURIComponent(category)}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching "${category}" quote: ${res.statusText}`);
  }
  return res.json();
}
