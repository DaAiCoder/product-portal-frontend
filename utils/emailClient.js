// src/utils/emailClient.js
const BASE = '/api/emailAPI';

/** GET /api/emailAPI?action=unread */
export async function getUnreadEmails() {
  const res = await fetch(`${BASE}?action=unread`);
  if (!res.ok) throw new Error(`Error fetching unread emails (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "search", query } */
export async function searchEmails(query) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'search', query }),
  });
  if (!res.ok) throw new Error(`Error searching emails (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "send", to, subject, body } */
export async function sendEmail(to, subject, body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'send', to, subject, body }),
  });
  if (!res.ok) throw new Error(`Error sending email (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "reply", id, body } */
export async function replyToEmail(id, body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reply', id, body }),
  });
  if (!res.ok) throw new Error(`Error replying to email (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "forward", id, to } */
export async function forwardEmail(id, to) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'forward', id, to }),
  });
  if (!res.ok) throw new Error(`Error forwarding email (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "archive", days } */
export async function archiveOldEmails(days) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'archive', days }),
  });
  if (!res.ok) throw new Error(`Error archiving emails (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "flag", from } */
export async function flagEmails(from) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'flag', from }),
  });
  if (!res.ok) throw new Error(`Error flagging emails (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "markAllRead" } */
export async function markAllRead() {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'markAllRead' }),
  });
  if (!res.ok) throw new Error(`Error marking all as read (${res.status})`);
  return res.json();
}

/** POST /api/emailAPI { action: "delete", id } */
export async function deleteEmail(id) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', id }),
  });
  if (!res.ok) throw new Error(`Error deleting email (${res.status})`);
  return res.json();
}

/** GET /api/emailAPI?action=listFlags */
export async function listFlaggedEmails() {
  const res = await fetch(`${BASE}?action=listFlags`);
  if (!res.ok) throw new Error(`Error listing flagged emails (${res.status})`);
  return res.json();
}
