// src/utils/musicClient.js
const BASE = '/api/musicAPI';

/** GET /api/musicAPI */
export async function fetchTracks() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Error fetching tracks (${res.status})`);
  return res.json();
}

/** POST { action:"play", title } */
export async function playTrack(title) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'play', title }),
  });
  if (!res.ok) throw new Error(`Error playing track (${res.status})`);
  return res.json();
}

/** POST { action:"upload", url } */
export async function uploadMusic(url) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'upload', url }),
  });
  if (!res.ok) throw new Error(`Error uploading music (${res.status})`);
  return res.json();
}

/** GET /api/musicAPI?action=recommend&genre=… */
export async function recommendMusic(cmd = '') {
  const genreMatch = cmd.match(/recommend me (.+) music/i);
  const genre = genreMatch ? genreMatch[1] : '';
  const url = genre
    ? `${BASE}?action=recommend&genre=${encodeURIComponent(genre)}`
    : `${BASE}?action=recommend`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error recommending music (${res.status})`);
  return res.json();
}

/** GET /api/musicAPI?action=newReleases */
export async function fetchNewReleases() {
  const res = await fetch(`${BASE}?action=newReleases`);
  if (!res.ok) throw new Error(`Error fetching new releases (${res.status})`);
  return res.json();
}
