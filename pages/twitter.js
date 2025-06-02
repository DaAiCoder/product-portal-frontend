// src/pages/twitter.js
import React, { useState, useEffect } from 'react';

export default function TwitterFeed() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real Twitter API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
        handle: `@user${i + 1}`,
        time: `${i + 1}h`,
        text: `This is a sample tweet content for tweet number ${i + 1}.`,
      }));
      setTweets(dummy);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twitter/X Feed</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading tweets…</p>
      ) : (
        <div className="space-y-4">
          {tweets.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-3 mb-2">
                <img
                  src={t.avatar}
                  alt={t.handle}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{t.handle}</span>
                    <span className="text-gray-500 text-sm">{t.time}</span>
                  </div>
                  <p className="mt-2 text-gray-800">{t.text}</p>
                </div>
              </div>
            </div>
          ))}
          {tweets.length === 0 && (
            <p className="text-gray-500">No tweets to display.</p>
          )}
        </div>
      )}
    </div>
  );
}
