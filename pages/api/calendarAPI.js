// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\api\calendarAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get events, optionally filtered by date.
 * @param {{ date?: string }} params
 * @returns {Promise<Object[]>}
 */
export async function getEvents({ date } = {}) {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  const res = await fetch(`${BASE_URL}/calendar/events${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching events: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Create a new calendar event.
 * @param {{ title: string, start: string, end?: string, description?: string }} payload
 * @returns {Promise<Object>}
 */
export async function createEvent({ title, start, end, description }) {
  const res = await fetch(`${BASE_URL}/calendar/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, start, end, description }),
  });
  if (!res.ok) {
    throw new Error(`Error creating event: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Update an existing event.
 * @param {string} eventId
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export async function updateEvent(eventId, updates) {
  const res = await fetch(`${BASE_URL}/calendar/events/${eventId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error(`Error updating event: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Delete an event by ID.
 * @param {string} eventId
 * @returns {Promise<Object>}
 */
export async function deleteEvent(eventId) {
  const res = await fetch(`${BASE_URL}/calendar/events/${eventId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Error deleting event: ${res.statusText}`);
  }
  return res.json();
}
