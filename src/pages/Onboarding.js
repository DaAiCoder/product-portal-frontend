// File: src/pages/Onboarding.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const suggestedTopics = [
  'Technology',
  'Business',
  'Sports',
  'Health',
  'Science',
  'Entertainment',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [custom, setCustom] = useState('');

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const addCustom = (e) => {
    e.preventDefault();
    if (custom && !selected.includes(custom)) {
      setSelected((prev) => [...prev, custom]);
      setCustom('');
    }
  };

  const handleSubmit = () => {
    // Stub: save to localStorage for now
    localStorage.setItem('followTopics', JSON.stringify(selected));
    navigate('/');
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Follow Topics</h2>
      <div className="grid grid-cols-2 gap-2">
        {suggestedTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`px-3 py-2 border rounded ${
              selected.includes(topic)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
      <form onSubmit={addCustom} className="flex space-x-2">
        <input
          type="text"
          placeholder="Add custom topic"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add
        </button>
      </form>
      {selected.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Selected Topics</h3>
          <ul className="list-disc pl-5 space-y-1">
            {selected.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
