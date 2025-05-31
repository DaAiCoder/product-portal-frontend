// src/pages/feeds.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FeedsPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const defaultCategories = ['Sports', 'Finance', 'Fitness', 'Crypto', 'Tech'];

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      loadArticles(selectedTopic);
    }
  }, [selectedTopic]);

  async function loadTopics() {
    try {
      const res = await axios.get(`${API_BASE}/feeds/topics`);
      setTopics(res.data);
    } catch (err) {
      console.error('Error fetching topics:', err);
    } finally {
      setLoadingTopics(false);
    }
  }

  async function loadArticles(topic) {
    setLoadingArticles(true);
    try {
      const res = await axios.get(`${API_BASE}/feeds/articles?topic=${encodeURIComponent(topic)}`);
      setArticles(res.data);
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoadingArticles(false);
    }
  }

  async function handleAddTopic(e) {
    e.preventDefault();
    if (!newTopic.trim()) return;

    try {
      const res = await axios.post(`${API_BASE}/feeds/topics`, { topic: newTopic.trim() });
      setTopics([...topics, res.data]);
      setNewTopic('');
    } catch (err) {
      console.error('Error adding topic:', err);
    }
  }

  async function handleRemoveTopic(topicId) {
    try {
      await axios.delete(`${API_BASE}/feeds/topics/${topicId}`);
      setTopics(topics.filter(t => t.id !== topicId));
      if (selectedTopic && selectedTopic.id === topicId) {
        setSelectedTopic(null);
        setArticles([]);
      }
    } catch (err) {
      console.error('Error removing topic:', err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your News Feed</h1>

      <form onSubmit={handleAddTopic} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="border rounded px-3 py-1 w-full"
          placeholder="Add a topic (e.g., AI, Liberia News)"
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded">Follow</button>
      </form>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Predefined Categories</h2>
        <div className="flex flex-wrap gap-2">
          {defaultCategories.map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer px-3 py-1 rounded-full border ${
                selectedTopic === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSelectedTopic(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Your Topics</h2>
        <div className="flex flex-wrap gap-2">
          {loadingTopics ? (
            <p>Loading topics...</p>
          ) : (
            topics.map((topic) => (
              <span
                key={topic.id}
                className={`cursor-pointer px-3 py-1 rounded-full border flex items-center gap-2 ${
                  selectedTopic === topic.name ? 'bg-green-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedTopic(topic.name)}
              >
                {topic.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTopic(topic.id);
                  }}
                  className="text-xs text-red-600 ml-2"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Articles</h2>
        {loadingArticles ? (
          <p>Loading articles...</p>
        ) : articles.length > 0 ? (
          <ul className="space-y-3">
            {articles.map((a, idx) => (
              <li key={idx} className="border p-3 rounded shadow">
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold">
                  {a.title}
                </a>
                <p className="text-sm text-gray-600">{a.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}
