import React, { useEffect, useState } from 'react';
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../services/notesService';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newContent, setNewContent] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await listNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError('Could not load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await createNote({ content_html: newContent });
      setNewContent('');
      load();
    } catch {
      setError('Failed to create note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      load();
    } catch {
      setError('Failed to delete note');
    }
  };

  if (loading) return <p>Loading notes…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4 p-6">
      <h2 className="text-2xl font-bold">Your Notes</h2>

      <div className="space-y-2">
        {notes.length === 0 ? (
          <p>No notes yet. Create one below!</p>
        ) : (
          notes.map((n) => (
            <div key={n.id} className="border p-3 rounded">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: n.content_html }}
              />
              <button
                onClick={() => handleDelete(n.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">New Note</h3>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Enter your note here…"
        />
        <button
          onClick={handleCreate}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
