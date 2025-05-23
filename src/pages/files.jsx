// src/pages/files.jsx
import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import AiPromptModal from '../components/AiPromptModal';

export default function FilesPage() {
  const [files, setFiles]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    // TODO: fetch files
    setFiles([]);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Files</h1>
        <button
          onClick={() => setAiOpen(true)}
          disabled={!selected}
          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          <FaRobot /><span>AI</span>
        </button>
      </div>

      <AiPromptModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        defaultPrompt="Summarize the contents of the selected file."
        context={selected ? { file: selected } : {}}
      />

      {/* Under construction placeholder */}
      <div className="text-center text-gray-600 dark:text-gray-400">
        📂 Files page is under construction.
      </div>
    </div>
  );
}
