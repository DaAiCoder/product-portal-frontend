import React, { useEffect, useState } from 'react';
import EmojiButton from '../EmojiButton';

function NotesWidget() {
  const [notes, setNotes] = useState('');
  const todayKey = `notes-${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(todayKey, notes);
  }, [notes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    alert('Notes copied!');
  };

  const insertEmoji = (emoji) => {
    const textarea = document.getElementById('notes-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const updated = notes.slice(0, start) + emoji + notes.slice(end);
    setNotes(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
  };

  return (
    <div className="bg-white dark:bg-[#2a2a3b] rounded-xl shadow-md p-4 h-full flex flex-col border dark:border-gray-700">
      <div className="flex justify-between items-center mb-2 drag-handle cursor-move">
        <h2 className="text-lg font-semibold text-black dark:text-white">📝 Notes</h2>
        <div className="space-x-2 flex items-center">
          <EmojiButton onSelect={insertEmoji} position="top-full right-0" />
          <button
            onClick={handleCopy}
            className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Copy
          </button>
          <button
            onClick={() => setNotes('')}
            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        id="notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        className="flex-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded resize-none bg-white dark:bg-gray-900 text-black dark:text-white"
        placeholder="Write your notes here..."
      />
    </div>
  );
}

export default NotesWidget;

