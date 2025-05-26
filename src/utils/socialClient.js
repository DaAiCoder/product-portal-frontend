// src/utils/socialClient.js
const BASE = '/api/socialAPI';

/** POST { platforms: [] } */
export async function fetchSocialFeed(platforms = []) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ platforms }),
  });
  if (!res.ok) throw new Error(`Error fetching social feed (${res.status})`);
  return res.json();
}

/** POST { action:"post", platform, message } */
export async function postToSocial(platform, message) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'post', platform, message }),
  });
  if (!res.ok) throw new Error(`Error posting to social (${res.status})`);
  return res.json();
}

/** GET /api/socialAPI?action=listPlatforms */
export async function listSocialPlatforms() {
  const res = await fetch(`${BASE}?action=listPlatforms`);
  if (!res.ok) throw new Error(`Error listing platforms (${res.status})`);
  return res.json();
}
