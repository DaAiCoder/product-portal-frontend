// File: src/api/socialAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch the social feed, optionally filtered by platform.
 * @param {string[]} [platforms] – e.g. ['twitter','facebook']
 * @returns {Promise<Array<{ id: string, platform: string, user: string, content: string, timestamp: string }>>}
 */
export async function fetchSocialFeed(platforms = []) {
  const query = platforms.length
    ? `?platforms=${encodeURIComponent(platforms.join(','))}`
    : '';
  const res = await fetch(`${BASE_URL}/social/feed${query}`);
  if (!res.ok) throw new Error(`Error fetching social feed: ${res.statusText}`);
  return res.json();
}

/**
 * Post new content to a social platform.
 * @param {string} platform – e.g. 'twitter'
 * @param {string} content – the message
 * @returns {Promise<Object>}
 */
export async function postToSocial(platform, content) {
  const res = await fetch(`${BASE_URL}/social/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ platform, content }),
  });
  if (!res.ok) throw new Error(`Error posting to ${platform}: ${res.statusText}`);
  return res.json();
}

/**
 * List all available social platforms.
 * @returns {Promise<string[]>}
 */
export async function listSocialPlatforms() {
  const res = await fetch(`${BASE_URL}/social/platforms`);
  if (!res.ok) throw new Error(`Error listing social platforms: ${res.statusText}`);
  return res.json();
}
