// src/services/userPreferences.js

export async function getFollowedTopics() {
  const res = await fetch('/users/me/followed-topics');
  if (!res.ok) throw new Error('Failed to fetch followed topics');
  const { topics } = await res.json();
  return topics;
}

export async function setFollowedTopics(topics) {
  const res = await fetch('/users/me/followed-topics', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) throw new Error('Failed to update followed topics');
}

export async function getRSSFeeds() {
  const res = await fetch('/users/me/rss-feeds');
  if (!res.ok) throw new Error('Failed to fetch RSS feeds');
  const { feeds } = await res.json();
  return feeds;
}

export async function setRSSFeeds(feeds) {
  const res = await fetch('/users/me/rss-feeds', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) throw new Error('Failed to update RSS feeds');
}
