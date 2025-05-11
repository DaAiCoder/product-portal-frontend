// File: src/services/userPreferences.js

const BASE = process.env.REACT_APP_API_URL
  || process.env.REACT_APP_API_BASE_URL
  || 'https://product-portal-backend-xo2c.onrender.com';

export async function getFollowedTopics() {
  const res = await fetch(`${BASE}/users/me/followed-topics`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Failed to fetch followed topics: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function saveFollowedTopics(topics) {
  const res = await fetch(`${BASE}/users/me/followed-topics`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics }),
  });
  if (!res.ok) throw new Error(`Failed to save followed topics: ${res.status} ${await res.text()}`);
  return res.json();
}

// ...any other userPreferences exports...
