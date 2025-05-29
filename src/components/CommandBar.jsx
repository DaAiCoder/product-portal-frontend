// src/components/CommandBar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { handleCommand } from '../utils/intentHandler';

const prompts = [
  "Remind me to call Mom at 7pm",
  "What's the weather in San Diego?",
  "Show my unread emails",
  "Add event: Meeting Friday 2pm",
  "Play jazz music",
  "Calculate 25 * 17",
  "Fetch my social feed",
  "List reminders for today",
  "Translate hello to es",
  "What's the UV index in Miami?",
  "Set a timer for 10 minutes",
  "Give me a quote about success"
];

export default function CommandBar() {
  const [idx, setIdx] = useState(0);
  const inputRef = useRef();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % prompts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.elements.command.value.trim();
    if (!text) return;
    setLoading(true);
    setResult(null);
    try {
      const output = await handleCommand(text);
      setResult(output);
    } catch (err) {
      setResult({ message: 'Error: ' + err.message });
    }
    setLoading(false);
    e.target.reset();
    inputRef.current?.blur();
  };

  // Helper to render result
  const renderResult = (result) => {
    if (!result) return null;
    // If it's an object with message, show that
    if (typeof result === "object" && result !== null) {
      // If it contains a known "result" or "reminder" or "weather" key, pretty print
      if (result.result) return <div>{result.result}</div>;
      if (result.reminder) return <div>{JSON.stringify(result.reminder)}</div>;
      if (result.weather) return <div>{JSON.stringify(result.weather)}</div>;
      if (result.message) return <div>{result.message}</div>;
      // Otherwise show all JSON
      return <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>;
    }
    // Otherwise, just render as text
    return <div>{result.toString()}</div>;
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
 <form
  onSubmit={handleSubmit}
  className="flex items-center w-full"
  autoComplete="off"
>
  <div
    className={`
      flex items-center w-full bg-white dark:bg-gray-900 
      border border-gray-200 dark:border-gray-700 rounded-2xl 
      shadow-lg px-6 py-4
      focus-within:ring-2 focus-within:ring-blue-400
      transition-all duration-200
      ${loading ? 'opacity-70' : ''}
    `}
    style={{
      minHeight: 56,
      boxShadow: "0 4px 24px 0 rgb(0 0 0 / 6%), 0 2px 8px rgb(0 0 0 / 4%)",
      backdropFilter: "blur(2.5px)",
    }}
  >
    <FaSearch className="text-xl text-gray-400 mr-3" />
    <input
      ref={inputRef}
      name="command"
      type="text"
      autoComplete="off"
      placeholder={prompts[idx]}
      className="flex-1 bg-transparent text-lg md:text-xl outline-none border-0 placeholder-gray-600 dark:placeholder-gray-400"
      style={{ letterSpacing: '0.01em' }}
    />
    <button
      type="submit"
      className="ml-2 px-4 py-2 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow focus:outline-none"
      disabled={loading}
    >
      <FaSearch />
    </button>
  </div>
</form>

      <div className="mt-2 min-h-[3rem]">
        {loading && (
          <div className="text-blue-600 font-semibold">Processing...</div>
        )}
        {!loading && result && (
          <div className="mt-2 p-4 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow">
            {renderResult(result)}
          </div>
        )}
      </div>
    </div>
  );
}

