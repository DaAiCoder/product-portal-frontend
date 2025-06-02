// src/pages/trending.js
import React, { useState, useEffect } from 'react';

export default function TrendingTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real trending topics API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        name: `#TrendingTopic${i + 1}`,
        volume: Math.floor(Math.random() * 100000) + 1000,
      }));
      setTopics(dummy);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Trending Topics</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading trending topics…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <span className="text-xl font-semibold text-blue-600">{topic.name}</span>
              <span className="mt-2 text-gray-500 text-sm">
                {topic.volume.toLocaleString()} mentions
              </span>
            </div>
          ))}
          {topics.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No trending topics available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
