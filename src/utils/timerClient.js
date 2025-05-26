// src/utils/timerClient.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function startTimer(minutes = 1) {
  const res = await fetch(`${BASE_URL}/timer/start?minutes=${encodeURIComponent(minutes)}`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Error starting timer (${res.status})`);
  return res.json();
}

export async function stopTimer() {
  const res = await fetch(`${BASE_URL}/timer/stop`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Error stopping timer (${res.status})`);
  return res.json();
}

export async function listTimers() {
  const res = await fetch(`${BASE_URL}/timer`);
  if (!res.ok) throw new Error(`Error listing timers (${res.status})`);
  return res.json();
}

export async function clearTimers() {
  const res = await fetch(`${BASE_URL}/timer/clear`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Error clearing timers (${res.status})`);
  return res.json();
}

export async function getTimerRemaining() {
  const res = await fetch(`${BASE_URL}/timer/remaining`);
  if (!res.ok) throw new Error(`Error fetching remaining time (${res.status})`);
  return res.json();
}

// Clock endpoints
export async function listClocks() {
  const res = await fetch(`${BASE_URL}/clocks`);
  if (!res.ok) throw new Error(`Error loading clocks (${res.status})`);
  return res.json();
}

export async function addClock(city, timezone) {
  const res = await fetch(`${BASE_URL}/clocks/add?city=${encodeURIComponent(city)}&timezone=${encodeURIComponent(timezone)}`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Error adding clock (${res.status})`);
  return res.json();
}

export async function removeClock(city) {
  const res = await fetch(`${BASE_URL}/clocks/remove?city=${encodeURIComponent(city)}`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Error removing clock (${res.status})`);
  return res.json();
}
