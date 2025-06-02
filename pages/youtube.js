// src/pages/youtube.js
import React, { useState, useEffect } from 'react';

export default function YouTubeFeeds() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch; replace with real YouTube API call
    const timer = setTimeout(() => {
      const dummy = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        thumbnail: `https://via.placeholder.com/320x180?text=Video+${i + 1}`,
        title: `Sample Video Title ${i + 1}`,
        channel: `Channel ${i + 1}`,
        views: Math.floor(Math.random() * 1000000) + 1000,
        timestamp: `${Math.floor(Math.random() * 12) + 1}h ago`,
      }));
      setVideos(dummy);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">YouTube Feeds</h1>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading videos…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{video.title}</h2>
                <div className="text-gray-600 text-sm">
                  <span>{video.channel}</span>
                  <span className="mx-2">•</span>
                  <span>{video.views.toLocaleString()} views</span>
                  <span className="mx-2">•</span>
                  <span>{video.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          {videos.length === 0 && (
            <p className="text-gray-500 col-span-full">No videos found.</p>
          )}
        </div>
      )}
    </div>
);
}
