// src/utils/aiClient.js

/**
 * Sends a prompt to your /api/aiAPI endpoint and returns the response.
 * @param {string} prompt
 */
export async function askAI(prompt) {
  const res = await fetch('/api/aiAPI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || `AI request failed: ${res.status}`);
  }
  return res.json();
}
