// src/pages/Search.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query  = params.get('query') || '';

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [source,  setSource]  = useState(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError('');
    setSummary('');
    setSource(null);

    // 1) Try Wikipedia summary
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
      .then((res) => res.ok ? res.json() : Promise.reject('No Wikipedia page'))
      .then((data) => {
        if (data.extract) {
          setSummary(data.extract);
          setSource({ name: 'Wikipedia', url: data.content_urls.desktop.page });
        } else {
          return Promise.reject('No extract');
        }
      })
      // 2) Fallback to DuckDuckGo
      .catch(() =>
        fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`)
          .then((res) => res.json())
          .then((ddg) => {
            let text = ddg.AbstractText;
            let url  = ddg.AbstractURL;
            if (!text && Array.isArray(ddg.RelatedTopics) && ddg.RelatedTopics.length) {
              const first = ddg.RelatedTopics[0];
              text = first.Text;
              url  = first.FirstURL;
            }
            if (text) {
              setSummary(text);
              setSource({ name: 'DuckDuckGo', url });
            } else {
              setSummary('No summary found for that query.');
            }
          })
      )
      .catch((e) => {
        console.error('Search error', e);
        setError('Failed to fetch data.');
      })
      .finally(() => setLoading(false));
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

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <p className="text-gray-800 dark:text-gray-200">{summary}</p>
          </div>
          {source && (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Source: {source.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
