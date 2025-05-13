// src/components/HelpWidget.jsx
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

export default function HelpWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating help button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Help"
      >
        <FaQuestionCircle size={24} />
      </button>

      {/* Full-screen FAQ/Chat modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-96 p-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
              aria-label="Close"
            >
              ×
            </button>
            <div className="h-80">
              {/* TODO: Embed your FAQ or AI chat box here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
