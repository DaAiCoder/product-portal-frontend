import React, { useEffect, useState } from 'react';

function NotesWidget() {
  const [notes, setNotes] = useState('');

  // Load saved notes on init
  useEffect(() => {
    const saved = localStorage.getItem('user_notes');
    if (saved) setNotes(saved);
  }, []);

  // Save notes to localStorage daily (and on change)
  useEffect(() => {
    const save = setTimeout(() => {
      localStorage.setItem('user_notes', notes);
    }, 500); // Debounced save
    return () => clearTimeout(save);
  }, [notes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    alert('Notes copied to clipboard');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">📝 Notes</h2>
        <button
          onClick={handleCopy}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Copy
        </button>
      </div>
      <textarea
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
