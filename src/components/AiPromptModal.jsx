// src/components/AiPromptModal.jsx
import React from 'react';
import AiChat from './AiChat';

export default function AiPromptModal({
  isOpen,
  onClose,
  defaultPrompt,
  context = {}
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-96 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
          aria-label="Close"
        >
          ×
        </button>
        <AiChat initialPrompt={defaultPrompt} context={context} />
      </div>
    </div>
  );
}
