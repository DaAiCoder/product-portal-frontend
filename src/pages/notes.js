// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\pages\Notes.js

import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../services/notesService';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching notes…');
    (async () => {
      try {
        const all = await listNotes();
        console.log('Notes fetched:', all);
        setNotes(all);
      } catch (err) {
        console.error('Error loading notes:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    const payload = { title, content_html: content };
    try {
      if (editing) await updateNote(editing, payload);
      else await createNote(payload);
      // reload
      const all = await listNotes();
      setNotes(all);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      reset();
    }
  }

  function edit(note) {
    setEditing(note.id);
    setTitle(note.title);
    setContent(note.content_html);
  }

  function reset() {
    setEditing(null);
    setTitle('');
    setContent('');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      {/* Editor */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
      />
      <ReactQuill value={content} onChange={setContent} />
      <div className="mt-2">
        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
        >
          {editing ? 'Update' : 'Create'}
        </button>
        {editing && (
          <button
            onClick={reset}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <p className="mt-6 text-gray-600">Loading notes…</p>
      ) : notes.length === 0 ? (
        <p className="mt-6 text-gray-600">No notes yet. Use the editor above to create one.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {notes.map(n => (
            <li key={n.id} className="p-4 border rounded bg-white dark:bg-gray-800">
              <h3 className="font-semibold">{n.title}</h3>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: n.content_html }}
              />
              <div className="mt-2">
                <button
                  onClick={() => edit(n)}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    try {
                      await deleteNote(n.id);
                      const all = await listNotes();
                      setNotes(all);
                    } catch (err) {
                      console.error('Delete error:', err);
                    }
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
