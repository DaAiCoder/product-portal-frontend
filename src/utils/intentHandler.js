// File: src/utils/intentHandler.js

import { RRule } from 'rrule';

/**
 * Parses a natural-language command and dispatches the appropriate action.
 * @param {string} text - The user-entered command text.
 * @param {function} navigate - React Router navigate function.
 */
export async function handleCommand(text, navigate) {
  const t = text.trim();
  let m;

  // 1) Navigation: "Go to Email page"
  if ((m = t.match(/^go to (.+)$/i))) {
    const page = m[1].trim().toLowerCase().replace(/\s+/g, '');
    navigate(`/${page}`);
    return;
  }

  // 2) Search Notes: 'Search notes for "project plan"'
  if ((m = t.match(/^search notes for ["']?(.+?)["']?$/i))) {
    const q = encodeURIComponent(m[1]);
    navigate(`/notes?search=${q}`);
    return;
  }

  // 3) Search Files: 'Find file named "budget.xlsx"'
  if ((m = t.match(/^find file named ["']?(.+?)["']?$/i))) {
    const q = encodeURIComponent(m[1]);
    navigate(`/files?search=${q}`);
    return;
  }

  // 4) Create Note: 'Create note: Grocery list'
  if ((m = t.match(/^create note:?\s*(.+)$/i))) {
    const content = m[1].trim();
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    alert('Note created');
    return;
  }

  // 5) Add Event: 'Add event: Team sync on June 5 at 10 AM'
  if ((m = t.match(/^add event:?\s*(.+) on (.+) at (.+)$/i))) {
    const title = m[1].trim();
    const dateStr = m[2].trim();
    const timeStr = m[3].trim();
    const start = new Date(`${dateStr} ${timeStr}`).toISOString();
    await fetch('/api/calendar/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, start, end: start }),
    });
    alert('Event added');
    return;
  }

  // 6) Set Reminder: 'Remind me to call Bob at 4 PM'
  if ((m = t.match(/^remind me to (.+) at (.+)$/i))) {
    const task = m[1].trim();
    const timeStr = m[2].trim();
    await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, time: timeStr }),
    });
    alert('Reminder set');
    return;
  }

  // 7) Show Events: 'Show me tomorrow’s events'
  if (/^show me.+events$/i.test(t)) {
    navigate('/calendar');
    return;
  }

  // 8) Fallback: Q&A via your chat endpoint
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: text }),
  });
  const { answer } = await res.json();
  alert(answer || 'Sorry, I could not find an answer.');
}
