// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\api\timeAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ─── World Clock ───────────────────────────────────────────────────────────
export async function listClocks() {
  const res = await fetch(`${BASE_URL}/worldclock`);
  if (!res.ok) throw new Error(`Error listing clocks: ${res.statusText}`);
  return res.json();
}

export async function addClock(timezone) {
  const res = await fetch(`${BASE_URL}/worldclock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timezone }),
  });
  if (!res.ok) throw new Error(`Error adding clock: ${res.statusText}`);
  return res.json();
}

export async function removeClock(id) {
  const res = await fetch(`${BASE_URL}/worldclock/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error removing clock: ${res.statusText}`);
  return res.json();
}

export async function getTimeInZone(timezone) {
  const res = await fetch(`${BASE_URL}/worldclock/${encodeURIComponent(timezone)}`);
  if (!res.ok) throw new Error(`Error fetching time for ${timezone}: ${res.statusText}`);
  return res.json();
}

// ─── Timer ──────────────────────────────────────────────────────────────────
export async function startTimer(seconds) {
  const res = await fetch(`${BASE_URL}/timer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seconds }),
  });
  if (!res.ok) throw new Error(`Error starting timer: ${res.statusText}`);
  return res.json();
}

export async function stopTimer() {
  const res = await fetch(`${BASE_URL}/timer/stop`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error stopping timer: ${res.statusText}`);
  return res.json();
}

export async function listTimers() {
  const res = await fetch(`${BASE_URL}/timer`);
  if (!res.ok) throw new Error(`Error listing timers: ${res.statusText}`);
  return res.json();
}

export async function clearTimers() {
  const res = await fetch(`${BASE_URL}/timer/clear`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error clearing timers: ${res.statusText}`);
  return res.json();
}

// ─── Stopwatch ─────────────────────────────────────────────────────────────
export async function startStopwatch() {
  const res = await fetch(`${BASE_URL}/stopwatch/start`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error starting stopwatch: ${res.statusText}`);
  return res.json();
}

export async function stopStopwatch() {
  const res = await fetch(`${BASE_URL}/stopwatch/stop`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error stopping stopwatch: ${res.statusText}`);
  return res.json();
}

export async function resetStopwatch() {
  const res = await fetch(`${BASE_URL}/stopwatch/reset`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error resetting stopwatch: ${res.statusText}`);
  return res.json();
}

export async function lapStopwatch() {
  const res = await fetch(`${BASE_URL}/stopwatch/lap`, { method: 'POST' });
  if (!res.ok) throw new Error(`Error recording lap: ${res.statusText}`);
  return res.json();
}

export async function getStopwatchTime() {
  const res = await fetch(`${BASE_URL}/stopwatch`);
  if (!res.ok) throw new Error(`Error fetching stopwatch time: ${res.statusText}`);
  return res.json();
}
