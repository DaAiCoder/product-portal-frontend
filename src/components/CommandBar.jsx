// File: src/components/CommandBar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function CommandBar() {
  const prompts = [
    'Tell me about the Manson murders?',
    'Who won Super Bowl 50?',
    'Search notes for "project plan"',
    'Show me tomorrow’s events',
    'Add event: Team sync on June 5 at 10 AM',
    'Create note: Grocery list',
    'Set a daily reminder at 9 AM',
    'Find file named "budget.xlsx"',
    'What’s the weather in Boston tomorrow?',
    'Go to Email page',
  ];
  const [idx, setIdx] = useState(0);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % prompts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.command.value.trim();
    if (!text) return;
    navigate(`/search?query=${encodeURIComponent(text)}`);
    e.target.reset();
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <input
        ref={inputRef}
        name="command"
        type="text"
        placeholder={prompts[idx]}
        className="
          flex-1
          rounded-full
          bg-gray-100 dark:bg-gray-800
          border border-transparent
          focus:border-blue-600 focus:shadow-md
          px-6 py-3
          placeholder-gray-600 placeholder-opacity-75
          transition-all duration-200
        "
      />
      <button
        type="submit"
        className="
          -ml-10
          p-2
          text-white
          bg-blue-600 hover:bg-blue-700
          rounded-full
          focus:outline-none
        "
      >
        <FaSearch />
      </button>
    </form>
  );
}
