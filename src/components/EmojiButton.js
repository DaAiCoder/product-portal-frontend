import React, { useState, useRef, useEffect } from 'react';

const EMOJIS = ['😀', '😎', '🎯', '🔥', '💡', '✅', '😴', '🚀', '📅', '💻', '📌', '❤️'];

export default function EmojiButton({ onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-lg"
        title="Insert Emoji"
      >
        😊
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow p-2 grid grid-cols-4 gap-2 max-w-[200px]">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onSelect(emoji);
                setOpen(false);
              }}
              className="text-xl hover:scale-125 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
