// src/pages/unified.js
import React, { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaRedditAlien,
} from 'react-icons/fa';

export default function UnifiedFeeds() {
  const feedOptions = [
    { id: 'instagram', label: 'Instagram', icon: <FaInstagram /> },
    { id: 'twitter',   label: 'Twitter/X',  icon: <FaTwitter /> },
    { id: 'facebook',  label: 'Facebook',    icon: <FaFacebook /> },
    { id: 'reddit',    label: 'Reddit',      icon: <FaRedditAlien /> },
  ];

  const [selected, setSelected] = useState(feedOptions.map(f => f.id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading; replace with real data fetch
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // Placeholder feed data (replace with real fetched items)
  const feedData = feedOptions.map((f) => ({
    ...f,
    placeholder: `Your ${f.label} posts will appear here.`
  }));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Unified Social Feed</h1>
      </div>

      {/* Filter Bar */}
      <div className="flex space-x-2 mb-6">
        {feedOptions.map((opt) => {
          const isActive = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full border transition
                ${isActive
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
              `}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feed Content */}
      {loading ? (
        <p className="text-gray-500">Loading feeds…</p>
      ) : (
        <div className="space-y-6">
          {feedData
            .filter((f) => selected.includes(f.id))
            .map((f) => (
              <div
                key={f.id}
                className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold flex items-center mb-2">
                  <span className="text-blue-500">{f.icon}</span>
                  <span className="ml-2">{f.label}</span>
                </h2>
                <p className="text-gray-500">{f.placeholder}</p>
              </div>
            ))
          }
          {selected.length === 0 && (
            <p className="text-gray-500">No feeds selected. Toggle above to view.</p>
          )}
        </div>
      )}
    </div>
  );
}
