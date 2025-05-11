import React, { useEffect, useState } from 'react';
import { getFollowedTopics } from '../../services/userPreferences'; // or your feedsService

export default function FeedsWidget() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFollowedTopics()
      .then(setTopics)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;
  if (!topics.length) return <div className="p-2">No followed topics</div>;

  return (
    <div className="p-2 overflow-auto">
      <h3 className="font-bold mb-2">Your Topics</h3>
      <ul className="list-disc list-inside text-sm">
        {topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
