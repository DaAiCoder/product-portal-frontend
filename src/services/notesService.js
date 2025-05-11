// File: src/services/notesService.js



 const BASE =
 process.env.REACT_APP_API_BASE_URL ||
 process.env.REACT_APP_API_URL ||
 'https://product-portal-backend-xo2c.onrender.com';



export async function listNotes() {
  const res = await fetch(`${BASE}/notes`, { credentials: 'include' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to fetch notes: ${JSON.stringify(err)}`);
  }
  return res.json();
}

export async function createNote(data) {
  const res = await fetch(`${BASE}/notes`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create note: ${res.statusText}`);
  return res.json();
}

export async function updateNote(id, data) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update note: ${res.statusText}`);
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Failed to delete note: ${res.statusText}`);
}
