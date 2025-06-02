// File: src/pages/api/rssAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * List all subscribed RSS feed URLs.
 * @returns {Promise<string[]>}
 */
export async function listRSSFeeds() {
  const res = await fetch(`${BASE_URL}/rss/feeds`);
  if (!res.ok) {
    throw new Error(`Error listing RSS feeds: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch the latest items for a specific feed.
 * @param {string} feedUrl
 * @returns {Promise<Array<{ title: string, link: string, pubDate: string }>>}
 */
export async function getRSSFeed(feedUrl) {
  const res = await fetch(`${BASE_URL}/rss/items?feedUrl=${encodeURIComponent(feedUrl)}`);
  if (!res.ok) {
    throw new Error(`Error fetching RSS feed (${feedUrl}): ${res.statusText}`);
  }
  return res.json();
}

/**
 * Subscribe to a new RSS feed.
 * @param {string} feedUrl
 * @returns {Promise<void>}
 */
export async function addRSSFeed(feedUrl) {
  const res = await fetch(`${BASE_URL}/rss/feeds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedUrl }),
  });
  if (!res.ok) {
    throw new Error(`Error adding RSS feed: ${res.statusText}`);
  }
}

/**
 * Unsubscribe from an RSS feed.
 * @param {string} feedUrl
 * @returns {Promise<void>}
 */
export async function removeRSSFeed(feedUrl) {
  const res = await fetch(`${BASE_URL}/rss/feeds`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedUrl }),
  });
  if (!res.ok) {
    throw new Error(`Error removing RSS feed: ${res.statusText}`);
  }
}
