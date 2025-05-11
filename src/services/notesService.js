const BASE = process.env.REACT_APP_API_URL;

async function getAll() {
  const res = await fetch(`${BASE}/notes`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

async function create(data) {
  const res = await fetch(`${BASE}/notes`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

async function update(id, data) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

async function remove(id) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete note');
}

export default {
  getAll,
  create,
  update,
  remove,
};
