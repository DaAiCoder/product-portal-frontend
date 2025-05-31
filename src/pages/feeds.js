import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const userId = 'rolan'; // Replace with dynamic ID from auth later

export default function FeedsPage() {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopic, setNewTopic] = useState('');
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API_BASE}/feeds/topics`, {
        params: { user_id: userId },
      });
      setTopics(res.data);
      setLoadingTopics(false);
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    }
  };

  const fetchArticles = async (topicName) => {
    setLoadingArticles(true);
    try {
      const res = await axios.get(`${API_BASE}/feeds/articles`, {
        params: { topic: topicName },
      });
      setArticles(res.data);
      setSelectedTopic(topicName);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleAddTopic = async () => {
    if (!newTopic) return;
    try {
      const res = await axios.post(
        `${API_BASE}/feeds/topics?user_id=${userId}`,
        { name: newTopic }
      );
      setTopics([...topics, res.data]);
      setNewTopic('');
    } catch (err) {
      console.error('Failed to add topic:', err);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      await axios.delete(`${API_BASE}/feeds/topics/${id}?user_id=${userId}`);
      setTopics(topics.filter((t) => t.id !== id));
      if (selectedTopic && topics.find((t) => t.id === id)?.name === selectedTopic) {
        setSelectedTopic(null);
        setArticles([]);
      }
    } catch (err) {
      console.error('Failed to delete topic:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📰 Feeds & Topics</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {loadingTopics ? (
          <div className="text-gray-500">Loading topics...</div>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              className={`px-3 py-1 rounded-full cursor-pointer text-sm border ${
                topic.name === selectedTopic
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => fetchArticles(topic.name)}
            >
              {topic.name}
              <button
                className="ml-2 text-xs text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTopic(topic.id);
                }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border px-3 py-1 rounded w-64"
          placeholder="Add new topic (e.g. crypto)"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button
          onClick={handleAddTopic}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Follow
        </button>
      </div>

      {selectedTopic && (
        <h2 className="text-xl font-semibold mb-3">
          Top stories about: <span className="text-blue-700">{selectedTopic}</span>
        </h2>
      )}

      <div className="space-y-4">
        {loadingArticles ? (
          <div>Loading articles...</div>
        ) : articles.length === 0 && selectedTopic ? (
          <div className="text-gray-500">No articles found for "{selectedTopic}"</div>
        ) : (
          articles.map((article, index) => (
            <div
              key={index}
              className="p-4 border rounded hover:shadow transition-all cursor-pointer bg-white"
              onClick={() => window.open(article.link, '_blank')}
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.summary}</p>
              <p className="text-xs text-gray-400 mt-1">
                Published: {new Date(article.published).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
