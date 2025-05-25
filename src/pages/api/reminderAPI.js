// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\api\reminderAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Create a new reminder.
 * @param {{ text: string, datetime: string }} payload
 * @returns {Promise<Object>}
 */
export async function createReminder({ text, datetime }) {
  const res = await fetch(`${BASE_URL}/reminder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, datetime }),
  });
  if (!res.ok) {
    throw new Error(`Error creating reminder: ${res.statusText}`);
  }
  return res.json();
}
