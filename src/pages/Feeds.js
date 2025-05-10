// File: src/pages/Feeds.js
import React, { useState } from 'react';

export default function Feeds() {
  const [url, setUrl] = useState('');
  const [feeds, setFeeds] = useState([]);

  const addFeed = (e) => {
    e.preventDefault();
    if (!url) return;
    setFeeds((prev) => [...prev, url]);
    setUrl('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Your RSS Feeds</h2>
      <form onSubmit={addFeed} className="flex space-x-2">
        <input
          type="url"
          placeholder="https://example.com/rss"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Feed
        </button>
      </form>
      <ul className="list-disc pl-5 space-y-1">
        {feeds.map((f, i) => (
          <li key={i} className="text-gray-700 dark:text-gray-300">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
