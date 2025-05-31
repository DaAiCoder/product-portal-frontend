// src/pages/feeds.js
import React, { useEffect, useState } from 'react';

const API_BASE = 'https://product-portal-backend-xo2c.onrender.com';


export default function FeedsPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (topics.length > 0) fetchArticles();
  }, [topics]);

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${API_BASE}/feeds/topic`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setTopics(json.topics || []);
    } catch (err) {
      console.error('Failed to load topics:', err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/feeds/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ topics })
      });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async () => {
    const topic = newTopic.trim();
    if (!topic || topics.includes(topic)) return;

    try {
      const res = await fetch(`${API_BASE}/feeds/topic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ topic })
      });
      if (res.ok) {
        setTopics([...topics, topic]);
        setNewTopic('');
      }
    } catch (err) {
      console.error('Error adding topic:', err);
    }
  };

  const handleRemoveTopic = async (t) => {
    try {
      const res = await fetch(`${API_BASE}/feeds/topic/${encodeURIComponent(t)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTopics(topics.filter((x) => x !== t));
      }
    } catch (err) {
      console.error('Error removing topic:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <section className="bg-white rounded shadow p-4">
        <h2 className="text-2xl font-semibold mb-4">Followed Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((t, i) => (
            <span
              key={i}
              className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {t}
              <button
                onClick={() => handleRemoveTopic(t)}
                className="ml-2 text-red-600 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Add a topic like 'Crypto', 'Philadelphia Eagles'..."
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
          />
          <button
            onClick={handleAddTopic}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </section>

      <section className="bg-white rounded shadow p-4">
        <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500">No articles available yet.</p>
        ) : (
          <ul className="space-y-4">
            {articles.map((a, i) => (
              <li key={i} className="p-4 border rounded hover:bg-gray-50">
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold text-lg"
                >
                  {a.title}
                </a>
                <p className="text-sm text-gray-600">{a.summary}</p>
                <p className="text-xs text-gray-400">{a.published}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
