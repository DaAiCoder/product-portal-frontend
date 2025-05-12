// File: src/pages/notes.js
import React, { useState, useEffect } from 'react';

export default function NotesPage() {
  // State for all notes and the currently entered text
  const [notes, setNotes] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(stored);
  }, []);

  // Utility to persist notes array
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  // Add a new note
  const handleAdd = () => {
    if (!currentText.trim()) return;
    const newNote = { id: Date.now(), text: currentText.trim() };
    saveNotes([...notes, newNote]);
    setCurrentText('');
  };

  // Delete a note by id
  const handleDelete = (id) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  // Begin editing: populate textarea and set editingId
  const handleEdit = (note) => {
    setEditingId(note.id);
    setCurrentText(note.text);
  };

  // Finish editing an existing note
  const handleUpdate = () => {
    saveNotes(
      notes.map((n) =>
        n.id === editingId ? { ...n, text: currentText.trim() } : n
      )
    );
    setEditingId(null);
    setCurrentText('');
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      {/* Input area for Add or Update */}
      <div className="mb-4">
        <textarea
          rows="3"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write a note..."
          className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {editingId ? (
          <button
            onClick={handleUpdate}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Note
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Note
          </button>
        )}
      </div>

      {/* List of existing notes */}
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start"
          >
            <p className="whitespace-pre-wrap flex-1 text-gray-900 dark:text-gray-100">
              {note.text}
            </p>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(note)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
