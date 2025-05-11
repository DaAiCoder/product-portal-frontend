

  // File: src/pages/Notes.js
import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../services/notesService';

export default function Notes() {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllNotes();
        console.debug('Fetched notes:', data);
        setNotes(data);
      } catch (err) {
        console.error('Error loading notes:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading your notes…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          You have no notes yet.{' '}
          <a href="/notes/new" className="text-blue-600 hover:underline">
            Create one?
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="prose max-w-full p-4 border rounded bg-white dark:bg-gray-800"
        >
          {/* Render rich-text HTML safely */}
          <div dangerouslySetInnerHTML={{ __html: note.content_html }} />
        </div>
      ))}
    </div>
  );
}
