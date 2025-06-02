// src/pages/podcasts.js
import React, { useState, useEffect } from 'react';

export default function PodcastRecommendations() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState({});

  useEffect(() => {
    // Simulate fetch; replace with real API call
    const timer = setTimeout(() => {
      const dummy = [
        {
          id: 1,
          title: 'Daily Tech News Show',
          description: 'Your daily update on all things tech.',
          image: 'https://via.placeholder.com/150?text=DTNS',
          latest: { title: 'Episode 500: Future of AI', url: 'https://example.com/episode500' },
          url: 'https://example.com/dtns'
        },
        {
          id: 2,
          title: 'History Uncovered',
          description: 'Deep dives into fascinating historical events.',
          image: 'https://via.placeholder.com/150?text=History',
          latest: { title: 'The Rise of Ancient Rome', url: 'https://example.com/rome' },
          url: 'https://example.com/history'
        },
        {
          id: 3,
          title: 'Mindful Moments',
          description: 'Meditations and mindfulness practices.',
          image: 'https://via.placeholder.com/150?text=Mindful',
          latest: { title: 'Guided Morning Meditation', url: 'https://example.com/morning' },
          url: 'https://example.com/mindful'
        },
        {
          id: 4,
          title: 'Startup Stories',
          description: 'Founders share their journeys.',
          image: 'https://via.placeholder.com/150?text=Startup',
          latest: { title: 'Episode 120: Bootstrap to Big Exit', url: 'https://example.com/exit' },
          url: 'https://example.com/startup'
        },
        // …more placeholder podcasts…
      ];
      setPodcasts(dummy);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFollow = (id) => {
    setFollowed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Podcasts</h1>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading podcasts…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {podcasts.map((pod) => (
            <div
              key={pod.id}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <img
                src={pod.image}
                alt={pod.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <a
                  href={pod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:underline"
                >
                  {pod.title}
                </a>
                <p className="text-gray-600 text-sm mt-1 flex-1">{pod.description}</p>
                <a
                  href={pod.latest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm mt-2"
                >
                  Latest: {pod.latest.title}
                </a>
                <button
                  onClick={() => toggleFollow(pod.id)}
                  className={`mt-4 self-start px-3 py-1 rounded ${
                    followed[pod.id]
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {followed[pod.id] ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
          {podcasts.length === 0 && (
            <p className="text-gray-500 col-span-full">No podcasts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
