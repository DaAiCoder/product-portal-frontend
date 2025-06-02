// src/pages/notes.js
import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import AiPromptModal from '../components/AiPromptModal';

export default function NotesPage() {
  const [notes, setNotes]         = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [aiOpen, setAiOpen]       = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(stored);
  }, []);

  const saveNotes = newNotes => {
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleAdd    = () => { /* unchanged */ };
  const handleDelete = id => { /* unchanged */ };
  const handleEdit   = note => { /* unchanged */ };
  const handleUpdate = () => { /* unchanged */ };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <button
          onClick={() => setAiOpen(true)}
          disabled={notes.length === 0}
          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          <FaRobot /><span>AI</span>
        </button>
      </div>

      <AiPromptModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        defaultPrompt="Summarize all my notes."
        context={{ notes }}
      />

      {/* Existing note input & list */}
      {/* … */}
    </div>
  );
}
