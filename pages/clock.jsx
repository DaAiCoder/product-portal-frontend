// src/pages/clock.jsx
import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import AiPromptModal from '../components/AiPromptModal';

export default function Clock() {
  const [time, setTime]   = useState(new Date());
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clock</h1>
        <button
          onClick={() => setAiOpen(true)}
          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          <FaRobot /><span>AI</span>
        </button>
      </div>

      <AiPromptModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        defaultPrompt="Convert current time to Tokyo time and set a timer for 2 hours."
        context={{ time: time.toISOString() }}
      />

      {/* Clock display */}
      <div className="text-center text-2xl font-mono text-gray-800 dark:text-gray-200">
        🕒 {time.toLocaleTimeString()}
      </div>
    </div>
  );
}
