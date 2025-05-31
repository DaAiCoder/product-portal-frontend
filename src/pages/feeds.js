import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feeds.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function FeedsPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const res = await axios.get(`${API_BASE}/feeds/topics`, { headers });
      setTopics(res.data);
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    } finally {
      setLoadingTopics(false);
    }
  };

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/feeds/topics`,
        { topic: newTopic.trim() },
        { headers }
      );
      setNewTopic('');
      fetchTopics();
    } catch (err) {
      console.error('Failed to add topic:', err);
    }
  };

  const handleDeleteTopic = async (topic) => {
    try {
      await axios.delete(`${API_BASE}/feeds/topics`, {
        params: { topic },
        headers,
      });
      fetchTopics();
      setArticles([]);
    } catch (err) {
      console.error('Failed to delete topic:', err);
    }
  };

  const fetchArticles = async (topicName) => {
    setLoadingArticles(true);
    try {
      const res = await axios.get(`${API_BASE}/feeds/articles`, {
        params: { topic: topicName },
        headers,
      });
      const data = res.data;
      if (Array.isArray(data)) {
        setArticles(data);
      } else if (Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        console.error('Invalid articles response format:', data);
        setArticles([]);
      }
      setSelectedTopic(topicName);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  };

  return (
    <div className="feeds-page">
      <h2>My Topics</h2>
      <div className="topic-controls">
        <input
          type="text"
          placeholder="Add a topic (e.g. crypto, Eagles)"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button onClick={handleAddTopic}>Add</button>
      </div>

      {loadingTopics ? (
        <p>Loading topics...</p>
      ) : (
        <ul className="topic-list">
          {topics.map((topic, idx) => (
            <li
              key={idx}
              className={topic === selectedTopic ? 'selected' : ''}
              onClick={() => fetchArticles(topic)}
            >
              {topic}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTopic(topic);
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h3>Articles {selectedTopic && `for "${selectedTopic}"`}</h3>

      {loadingArticles ? (
        <p>Loading articles...</p>
      ) : (
        <div className="articles-list">
          {articles.map((a, idx) => (
            <div key={idx} className="article">
              <a href={a.link} target="_blank" rel="noreferrer">
                <h4>{a.title}</h4>
              </a>
              <p>{a.summary}</p>
              <small>{new Date(a.published).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
