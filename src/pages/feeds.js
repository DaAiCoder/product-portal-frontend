import React, { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE) {
  console.warn("⚠️ Missing NEXT_PUBLIC_API_BASE_URL env var.");
}

const Feeds = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (topics.length > 0) {
      loadArticles(topics[0]); // default: first topic
    }
  }, [topics]);

  const loadTopics = async () => {
    try {
      const res = await fetch(`${API_BASE}/feeds/topic`);
      const data = await res.json();
      setTopics(data.topics || []);
    } catch (err) {
      console.error("Failed to load topics:", err);
    }
  };

  const loadArticles = async (topic) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/feeds/articles?topic=${encodeURIComponent(topic)}`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/feeds/topic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: newTopic }),
      });

      if (!res.ok) throw new Error("Topic add failed");
      setNewTopic("");
      loadTopics(); // Refresh topics list
    } catch (err) {
      console.error("Failed to add topic:", err);
    }
  };

  const handleUnsubscribe = async (topic) => {
    try {
      const res = await fetch(`${API_BASE}/feeds/topic`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error("Topic delete failed");
      loadTopics(); // Refresh list
    } catch (err) {
      console.error("Failed to delete topic:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📡 Your Feeds</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a topic (e.g., Crypto, Fitness, Eagles)"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleAddTopic}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            onClick={() => loadArticles(topic)}
            className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300"
          >
            {topic}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnsubscribe(topic);
              }}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, idx) => (
            <li key={idx} className="border-b pb-2">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                {article.title}
              </a>
              <p className="text-gray-700 text-sm">{article.summary}</p>
              <p className="text-xs text-gray-500">{new Date(article.published).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feeds;
