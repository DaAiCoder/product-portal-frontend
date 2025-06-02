// File: src/services/userPreferences.js

const BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  'https://product-portal-backend-xo2c.onrender.com';

/**
 * Helper to build headers with JWT from localStorage
 */
function authHeaders() {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token—user must log in');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

/**
 * Fetch followed topics for the current user.
 * Expects backend to return JSON: { topics: string[] }
 */
export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Error fetching followed topics: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray(data.topics) ? data.topics : [];
}

/**
 * Save followed topics for the current user.
 * Sends JSON: { topics: string[] }
 */
export async function setFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(topics),
  });
  if (!res.ok) {
    throw new Error(`Error saving topics: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray(data.topics) ? data.topics : topics;
}

/**
 * Fetch RSS feed URLs for the current user.
 * Expects backend to return JSON: { feeds: string[] }
 */
export async function getRSSFeeds() {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Error fetching RSS feeds: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray(data.feeds) ? data.feeds : [];
}

/**
 * Save RSS feed URLs for the current user.
 * Sends JSON: { feeds: string[] }
 */
export async function setRSSFeeds(feeds) {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(feeds),
  });
  if (!res.ok) {
    throw new Error(`Error saving RSS feeds: ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray(data.feeds) ? data.feeds : feeds;
}
