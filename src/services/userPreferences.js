const BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  'https://product-portal-backend-xo2c.onrender.com';

export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Error fetching followed topics: ${await res.text()}`);
  return res.json();
}

export async function setFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) throw new Error(`Error saving topics: ${await res.text()}`);
  return res.json();
}

export async function getRSSFeeds() {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Error fetching RSS feeds: ${await res.text()}`);
  return res.json();
}

export async function setRSSFeeds(feeds) {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) throw new Error(`Error saving RSS feeds: ${await res.text()}`);
  return res.json();
}
