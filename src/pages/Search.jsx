// File: src/pages/Search.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query  = params.get('query') || '';

  const [loading, setLoading] = useState(false);
  const [data,    setData]    = useState(null);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [query]);

  if (!query) {
    return (
      <div className="p-6">
        <p>Please enter a search query.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Results for “{query}”</h1>

      {loading && <p>Loading…</p>}
      {error   && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <p className="text-gray-800 dark:text-gray-200">{data.summary}</p>
          </div>
          {data.source && (
            <a
              href={data.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Source: {data.source.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
