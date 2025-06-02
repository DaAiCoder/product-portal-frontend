// src/utils/rssClient.js
const BASE = '/api/rssAPI';

/** GET /api/rssAPI */
export async function listRSSFeeds() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Error listing RSS feeds (${res.status})`);
  return res.json();
}

/** GET /api/rssAPI?source=... */
export async function getRSSFeed(source) {
  const res = await fetch(`${BASE}?source=${encodeURIComponent(source)}`);
  if (!res.ok) throw new Error(`Error fetching RSS feed (${res.status})`);
  return res.json();
}

/** POST { action:"add", url } */
export async function addRSSFeed(url) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', url }),
  });
  if (!res.ok) throw new Error(`Error adding RSS feed (${res.status})`);
  return res.json();
}

/** POST { action:"remove", source } */
export async function removeRSSFeed(source) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'remove', source }),
  });
  if (!res.ok) throw new Error(`Error removing RSS feed (${res.status})`);
  return res.json();
}

/** GET /api/rssAPI?action=listSources */
export async function listNewsSources() {
  const res = await fetch(`${BASE}?action=listSources`);
  if (!res.ok) throw new Error(`Error listing news sources (${res.status})`);
  return res.json();
}
