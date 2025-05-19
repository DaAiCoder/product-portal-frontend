import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

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
        <div className="absolute z-50 mt-2 right-0">
          <EmojiPicker
            theme="dark"
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setOpen(false);
            }}
            searchDisabled={false}
            skinTonesDisabled={false}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}
