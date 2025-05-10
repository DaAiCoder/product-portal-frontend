// File: src/pages/Feeds.js
import React, { useState } from 'react';

const suggestedTopics = [
  'Technology',
  'Business',
  'Sports',
  'Health',
  'Science',
  'Entertainment',
];

export default function Feeds() {
  // Topics state
  const [topics, setTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState('');
  // Feeds state
  const [feedUrl, setFeedUrl] = useState('');
  const [feeds, setFeeds] = useState([]);

  const toggleTopic = (topic) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleCustomTopic = (e) => {
    e.preventDefault();
    const trimmed = customTopic.trim();
    if (trimmed && !topics.includes(trimmed)) {
      setTopics((prev) => [...prev, trimmed]);
    }
    setCustomTopic('');
  };

  const handleAddFeed = (e) => {
    e.preventDefault();
    const trimmed = feedUrl.trim();
    if (trimmed && !feeds.includes(trimmed)) {
      setFeeds((prev) => [...prev, trimmed]);
    }
    setFeedUrl('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-8">
      {/* Topics Onboarding Section */}
      <section>
        <h2 className="text-2xl font-bold">Follow Topics</h2>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {suggestedTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-3 py-2 border rounded ${
                topics.includes(topic)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
        <form onSubmit={handleCustomTopic} className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="Add custom topic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </form>
        {topics.length > 0 && (
          <ul className="list-disc pl-5 mt-4 space-y-1">
            {topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        )}
      </section>

      {/* RSS Feeds Section */}
      <section>
        <h2 className="text-2xl font-bold">Your RSS Feeds</h2>
        <form onSubmit={handleAddFeed} className="flex space-x-2 mt-4">
          <input
            type="url"
            placeholder="https://example.com/rss"
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Feed
          </button>
        </form>
        {feeds.length > 0 && (
          <ul className="list-disc pl-5 mt-4 space-y-1">
            {feeds.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
