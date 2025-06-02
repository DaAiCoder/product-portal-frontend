// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\api\emailAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch emails in a given folder.
 * @param {string} folder – “inbox”, “sent”, “drafts”, etc.
 * @returns {Promise<Object[]>}
 */
export async function fetchEmails(folder = 'inbox') {
  const res = await fetch(`${BASE_URL}/email/${folder}`);
  if (!res.ok) {
    throw new Error(`Error fetching emails: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Send a new email.
 * @param {{ to: string, subject: string, body: string }} payload
 * @returns {Promise<Object>}
 */
export async function sendEmail({ to, subject, body }) {
  const res = await fetch(`${BASE_URL}/email/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, body }),
  });
  if (!res.ok) {
    throw new Error(`Error sending email: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Delete an email by ID.
 * @param {string} emailId
 * @returns {Promise<Object>}
 */
export async function deleteEmail(emailId) {
  const res = await fetch(`${BASE_URL}/email/${emailId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Error deleting email: ${res.statusText}`);
  }
  return res.json();
}
