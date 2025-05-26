// src/utils/reminderClient.js
const BASE = '/api/reminderAPI';

/** POST { action:"create", text, date?, time?, hours? } */
export async function createReminder(text, opts = {}) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', text, ...opts }),
  });
  if (!res.ok) throw new Error(`Error creating reminder (${res.status})`);
  return res.json();
}

/** GET /api/reminderAPI */
export async function listReminders() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Error listing reminders (${res.status})`);
  return res.json();
}

/** POST { action:"snooze", id, minutes } */
export async function snoozeReminder(id, minutes) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'snooze', id, minutes }),
  });
  if (!res.ok) throw new Error(`Error snoozing reminder (${res.status})`);
  return res.json();
}

/** POST { action:"cancel", id } */
export async function cancelReminder(id) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'cancel', id }),
  });
  if (!res.ok) throw new Error(`Error canceling reminder (${res.status})`);
  return res.json();
}

/** POST { action:"edit", id, text } */
export async function editReminder(id, text) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'edit', id, text }),
  });
  if (!res.ok) throw new Error(`Error editing reminder (${res.status})`);
  return res.json();
}

/** POST { action:"delete", id } */
export async function deleteReminder(id) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id }),
  });
  if (!res.ok) throw new Error(`Error deleting reminder (${res.status})`);
  return res.json();
}

/** POST { action:"recurring", text, frequency } */
export async function setRecurringReminder(text, frequency) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'recurring', text, frequency }),
  });
  if (!res.ok) throw new Error(`Error setting recurring reminder (${res.status})`);
  return res.json();
}

/** GET /api/reminderAPI?action=today */
export async function listTodayReminders() {
  const res = await fetch(`${BASE}?action=today`);
  if (!res.ok) throw new Error(`Error listing today's reminders (${res.status})`);
  return res.json();
}
