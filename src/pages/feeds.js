// src/pages/feeds.js

import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://product-portal-backend-xo2c.onrender.com";

const FeedsPage = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = "test-user-1"; // Replace with real user ID once auth is connected

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${API_BASE}/feeds/topics?user_id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data.topics || []);
      } catch (err) {
        console.error("Failed to load topics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const addTopic = async () => {
    if (!newTopic.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/feeds/topics?user_id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTopic }),
      });

      if (!res.ok) throw new Error("Topic add failed");

      const data = await res.json();
      setTopics([...topics, data]);
      setNewTopic("");
    } catch (err) {
      console.error("Failed to add topic:", err);
    }
  };

  const removeTopic = async (topicId) => {
    try {
      const res = await fetch(`${API_BASE}/feeds/topics/${topicId}?user_id=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTopics(topics.filter((t) => t.id !== topicId));
    } catch (err) {
      console.error("Failed to remove topic:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feeds</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter topic"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button onClick={addTopic}>Add Topic</button>
      </div>

      {loading ? (
        <p>Loading topics...</p>
      ) : topics.length === 0 ? (
        <p>No topics yet. Add one above!</p>
      ) : (
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              {topic.name}
              <button onClick={() => removeTopic(topic.id)} style={{ marginLeft: "1rem" }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedsPage;
