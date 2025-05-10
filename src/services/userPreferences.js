// File: src/services/userPreferences.js

const BASE = process.env.REACT_APP_API_BASE_URL;

export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    credentials: 'include',
  });
  if (!res.ok) {
    console.error('Error fetching followed topics:', res.status, await res.text());
    throw new Error('Failed to fetch followed topics');
  }
  const { topics } = await res.json();
  return topics;
}

export async function setFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) {
    console.error('Error updating followed topics:', res.status, await res.text());
    throw new Error('Failed to update followed topics');
  }
}

export async function getRSSFeeds() {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    credentials: 'include',
  });
  if (!res.ok) {
    console.error('Error fetching RSS feeds:', res.status, await res.text());
    throw new Error('Failed to fetch RSS feeds');
  }
  const { feeds } = await res.json();
  return feeds;
}

export async function setRSSFeeds(feeds) {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) {
    console.error('Error updating RSS feeds:', res.status, await res.text());
    throw new Error('Failed to update RSS feeds');
  }
}
