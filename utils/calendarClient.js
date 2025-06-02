// src/utils/calendarClient.js
const BASE = '/api/calendarAPI';

/** GET /api/calendarAPI?date=YYYY-MM-DD|today */
export async function getEventsForDate(date) {
  const res = await fetch(`${BASE}?date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error(`Error fetching events (${res.status})`);
  return res.json();
}

/** POST { action:"add", title, date, time } */
export async function addEvent({ title, date, time }) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', title, date, time }),
  });
  if (!res.ok) throw new Error(`Error adding event (${res.status})`);
  return res.json();
}

/** POST { action:"move", title, date, time } */
export async function moveEvent(title, { date, time }) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'move', title, date, time }),
  });
  if (!res.ok) throw new Error(`Error moving event (${res.status})`);
  return res.json();
}

/** DELETE /api/calendarAPI?title=... */
export async function deleteEvent(title) {
  const res = await fetch(`${BASE}?action=delete&title=${encodeURIComponent(title)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Error deleting event (${res.status})`);
  return res.json();
}

/** GET /api/calendarAPI?freeSlots=YYYY-MM-DD */
export async function findFreeSlots(date) {
  const res = await fetch(`${BASE}?freeSlots=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error(`Error finding free slots (${res.status})`);
  return res.json();
}

/** POST { action:"invite", title, email } */
export async function inviteToEvent(title, email) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'invite', title, email }),
  });
  if (!res.ok) throw new Error(`Error inviting to event (${res.status})`);
  return res.json();
}

/** POST { action:"deleteSeries", title } */
export async function deleteRecurringEvent(title) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'deleteSeries', title }),
  });
  if (!res.ok) throw new Error(`Error deleting series (${res.status})`);
  return res.json();
}

/** GET /api/calendarAPI?action=week */
export async function showWeekEvents() {
  const res = await fetch(`${BASE}?action=week`);
  if (!res.ok) throw new Error(`Error fetching week events (${res.status})`);
  return res.json();
}

/** GET /api/calendarAPI?action=next */
export async function getNextEvent() {
  const res = await fetch(`${BASE}?action=next`);
  if (!res.ok) throw new Error(`Error fetching next event (${res.status})`);
  return res.json();
}
