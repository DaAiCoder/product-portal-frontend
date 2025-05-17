import React, { useEffect, useState } from 'react';
import { listNotes } from '../../services/notesService';

export default function NotesWidget() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    listNotes()
      .then(setNotes)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;
  if (!notes.length) return <div className="p-2">No notes yet</div>;

  return (
    <div className="p-2 overflow-auto">
      <h3 className="font-bold mb-2">Notes</h3>
      <ul className="list-disc list-inside text-sm">
        {notes.map((n) => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}
