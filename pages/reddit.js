// src/pages/reddit.js
import React, { useState, useEffect } from 'react';

export default function RedditFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real Reddit API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        title: `Reddit post title ${i + 1}`,
        subreddit: `r/subreddit${i + 1}`,
        upvotes: Math.floor(Math.random() * 500) + 1,
        comments: Math.floor(Math.random() * 100) + 1,
        thumbnail: `https://via.placeholder.com/80?text=Img+${i + 1}`,
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
        <h1 className="text-3xl font-bold">Reddit Feed</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading Reddit posts…</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex space-x-3 mb-2">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <div className="text-gray-500 text-sm">{post.subreddit}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-600 text-sm space-x-4">
                <span>⬆️ {post.upvotes}</span>
                <span>💬 {post.comments} comments</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-gray-500">No Reddit posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
