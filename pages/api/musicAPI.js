// File: src/api/musicAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Upload a music file.
 * @param {File} file – audio file to upload.
 * @returns {Promise<Object>}
 */
export async function uploadMusic(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${BASE_URL}/music/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Error uploading music: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch the list of available tracks.
 * @returns {Promise<Array<{ id: string, title: string, artist?: string, url: string }>>}
 */
export async function fetchTracks() {
  const res = await fetch(`${BASE_URL}/music/tracks`);
  if (!res.ok) {
    throw new Error(`Error fetching tracks: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get personalized recommendations.
 * @returns {Promise<Array<{ id: string, title: string, artist?: string, url: string }>>}
 */
export async function getRecommendations() {
  const res = await fetch(`${BASE_URL}/music/recommendations`);
  if (!res.ok) {
    throw new Error(`Error fetching recommendations: ${res.statusText}`);
  }
  return res.json();
}
