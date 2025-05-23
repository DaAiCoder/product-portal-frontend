// src/pages/instagram.js
import React, { useState, useEffect } from 'react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        imageUrl: `https://via.placeholder.com/300?text=Post+${i + 1}`,
        caption: `Caption for post ${i + 1}`,
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
        <h1 className="text-3xl font-bold">Instagram Feed</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading Instagram posts…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800">{post.caption}</p>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No Instagram posts found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

