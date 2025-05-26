// src/utils/timerClient.js
const BASE = '/api/timerAPI';

/** POST { action:"start", duration, unit } */
export async function startTimer(duration, unit) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'start', duration, unit }),
  });
  if (!res.ok) throw new Error(`Error starting timer (${res.status})`);
  return res.json();
}

/** POST { action:"stop" } */
export async function stopTimer() {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'stop' }),
  });
  if (!res.ok) throw new Error(`Error stopping timer (${res.status})`);
  return res.json();
}

/** GET /api/timerAPI?action=list */
export async function listTimers() {
  const res = await fetch(`${BASE}?action=list`);
  if (!res.ok) throw new Error(`Error listing timers (${res.status})`);
  return res.json();
}

/** DELETE /api/timerAPI?action=clear */
export async function clearTimers() {
  const res = await fetch(`${BASE}?action=clear`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Error clearing timers (${res.status})`);
  return res.json();
}

/** GET /api/timerAPI?action=remaining */
export async function getTimerRemaining() {
  const res = await fetch(`${BASE}?action=remaining`);
  if (!res.ok) throw new Error(`Error fetching remaining time (${res.status})`);
  return res.json();
}
