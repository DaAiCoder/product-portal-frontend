const BASE = process.env.REACT_APP_API_URL;

// Fetch the array of topics the user follows
export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Error fetching followed topics: ${JSON.stringify(err)}`);
  }
  return res.json();
}

// Persist an updated array of followed topics
export async function setFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Error saving followed topics: ${JSON.stringify(err)}`);
  }
  return res.json();
}

// Fetch RSS feeds for a given list of topics
export async function getRSSFeeds(topics) {
  const q = encodeURIComponent(topics.join(','));
  const res = await fetch(`${BASE}/feeds?topics=${q}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Error fetching RSS feeds: ${JSON.stringify(err)}`);
  }
  return res.json();
}

// Persist an updated array of RSS feed URLs
export async function setRSSFeeds(feeds) {
  const res = await fetch(`${BASE}/users/me/rss-feeds`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feeds }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Error saving RSS feeds: ${JSON.stringify(err)}`);
  }
  return res.json();
}
