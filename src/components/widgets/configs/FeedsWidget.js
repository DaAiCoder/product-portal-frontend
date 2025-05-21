import React, { useEffect, useState } from 'react';
import { getFollowedTopics } from '../../../services/userPreferences';

export default function FeedsWidget() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFollowedTopics()
      .then((res) => {
        setTopics(res);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || 'Failed to load topics');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md w-full max-w-md">
      <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Your Topics</h3>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && topics.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No followed topics yet.</p>
      )}

      {!loading && topics.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
          {topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
