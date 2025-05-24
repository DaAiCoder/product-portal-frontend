// File: src/components/CommandBar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { handleCommand } from '../utils/intentHandler';

export default function CommandBar() {
  const prompts = [
    'Remind me to call Bob at 4 PM',
    "Show me tomorrow's events",
    "Tell me last year's Super Bowl score",
    'Search notes for "project plan"',
    'Add event: Team sync on June 5 at 10 AM',
    'Create note: Grocery list',
    'What’s the weather in Boston tomorrow?',
    'Go to Email page',
    'Set a daily reminder at 9 AM',
    'Find file named "budget.xlsx"',
  ];
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % prompts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = e.target.elements.command.value.trim();
    if (!cmd) return;
    handleCommand(cmd, navigate);
    e.target.reset();
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-lg mx-auto">
      <input
        ref={inputRef}
        name="command"
        type="text"
        placeholder={prompts[idx]}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none"
      />
      <button
        type="submit"
        className="px-3 bg-gray-200 border border-l-0 border-gray-300 rounded-r hover:bg-gray-300"
      >
        <FaSearch />
      </button>
    </form>
  );
}
