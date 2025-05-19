import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiButton({ onSelect, position = 'top-full right-0' }) {
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
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-lg"
        title="Insert Emoji"
      >
        😊
      </button>

      {open && (
        <div
          className={`absolute z-50 ${position} mt-2 max-w-[320px] min-w-[260px] min-h-[350px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md overflow-auto`}
          style={{ fontFamily: 'inherit' }}
        >
          <EmojiPicker
            theme="auto"
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setOpen(false);
            }}
            lazyLoadEmojis={false}
            skinTonesDisabled={false}
            searchDisabled={false}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
