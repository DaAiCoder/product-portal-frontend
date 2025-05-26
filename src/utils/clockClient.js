// src/utils/clockClient.js
const BASE = '/api/clockAPI';

/** GET /api/clockAPI?zone=... */
export async function getTimeInZone(zone) {
  const res = await fetch(`${BASE}?zone=${encodeURIComponent(zone)}`);
  if (!res.ok) throw new Error(`Error getting time (${res.status})`);
  return res.json();
}

/** POST { action:"add", zone } */
export async function addClock(zone) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', zone }),
  });
  if (!res.ok) throw new Error(`Error adding clock (${res.status})`);
  return res.json();
}

/** POST { action:"remove", zone } */
export async function removeClock(zone) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'remove', zone }),
  });
  if (!res.ok) throw new Error(`Error removing clock (${res.status})`);
  return res.json();
}

/** GET /api/clockAPI?action=list */
export async function listClocks() {
  const res = await fetch(`${BASE}?action=list`);
  if (!res.ok) throw new Error(`Error listing clocks (${res.status})`);
  return res.json();
}

/** GET /api/clockAPI?diff=a&b=zone2 */
export async function getTimeDifference(a, b) {
  const res = await fetch(
    `${BASE}?diff=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`
  );
  if (!res.ok) throw new Error(`Error getting diff (${res.status})`);
  return res.json();
}
