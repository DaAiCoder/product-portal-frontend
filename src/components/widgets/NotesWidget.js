import React, { useEffect, useState } from 'react';
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../../services/notesService';
import EmojiButton from '../EmojiButton';




function NotesWidget() {
  const [notes, setNotes] = useState('');
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await listNotes();
        if (data.length > 0) {
          setNotes(data[0].content);
          setNoteId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load notes', err);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (noteId) {
        updateNote(noteId, { content: notes });
      } else if (notes.trim()) {
        createNote({ content: notes }).then((res) => setNoteId(res.id));
      }
    }, 1000);
    return () => clearTimeout(saveTimeout);
  }, [notes]);

  const handleDelete = async () => {
    if (!noteId) return;
    await deleteNote(noteId);
    setNotes('');
    setNoteId(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    alert('Notes copied!');
  };

  return (
    <div className="bg-white dark:bg-[#2a2a3b] rounded-xl shadow-md p-4 h-full flex flex-col border dark:border-gray-700">
      <div className="flex justify-between items-center mb-2 drag-handle cursor-move">
        <h2 className="text-lg font-semibold text-black dark:text-white">📝 Notes</h2>
        <div className="space-x-2 flex items-center">
          <EmojiButton onSelect={(emoji) => setNotes((n) => n + emoji)} />
          <button
            onClick={handleCopy}
            className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Copy
          </button>
          <button
            onClick={handleDelete}
            className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
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
