// File: src/services/userPreferences.js

const BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  'https://product-portal-backend-xo2c.onrender.com';

/**
 * Fetch followed topics for the current user.
 * Expects backend to return JSON: { topics: string[] }
 * @returns {Promise<string[]>}
 */
export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Error fetching followed topics: ${await res.text()}`);
  }
  const data = await res.json();
  // Return the topics array, or empty if missing
  return Array.isArray(data.topics) ? data.topics : [];
}

/**
 * Save followed topics for the current user.
 * Sends JSON: { topics: string[] }
 * @param {string[]} topics
 * @returns {Promise<string[]>}
 */
export async function setFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) {
    throw new Error(`Error saving topics: ${await res.text()}`);
  }
  const data = await res.json();
  // Return the saved array or fallback to what was sent
  return Array.isArray(data.topics) ? data.topics : topics;
}

/**
 * Fetch RSS feed URLs for the current user.
 * Expects backend to return JSON: { feeds: string[] }
 * @returns {Promise<string[]>}
 */
export async function getRSSFeeds() {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Error fetching RSS feeds: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data.feeds) ? data.feeds : [];
}

/**
 * Save RSS feed URLs for the current user.
 * Sends JSON: { feeds: string[] }
 * @param {string[]} feeds
 * @returns {Promise<string[]>}
 */
export async function setRSSFeeds(feeds) {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) {
    throw new Error(`Error saving RSS feeds: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data.feeds) ? data.feeds : feeds;
}
