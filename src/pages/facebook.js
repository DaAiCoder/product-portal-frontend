// src/pages/facebook.js
import React, { useState, useEffect } from 'react';

export default function FacebookFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real Facebook API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        author: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
        time: `${i + 2}h`,
        content: `This is a sample Facebook post content number ${i + 1}.`,
      }));
      setPosts(dummy);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Facebook Feed</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading posts…</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-gray-500 text-sm">{post.time}</div>
                </div>
              </div>
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-gray-500">No Facebook posts available.</p>
          )}
        </div>
      )}
    </div>
);
}
