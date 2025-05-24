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

    (async () => {
      try {
        // 1) Wikipedia search to get the best-matching title
        const searchRes = await fetch(
          `https://en.wikipedia.org/w/api.php?` +
          `action=query&list=search&srsearch=${encodeURIComponent(query)}` +
          `&format=json&origin=*`
        );
        const searchJson = await searchRes.json();
        const hits = searchJson.query?.search;
        if (hits && hits.length > 0) {
          const title = hits[0].title;
          // 2) Fetch the summary for that title
          const summaryRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
          );
          const summaryJson = await summaryRes.json();
          if (summaryJson.extract) {
            setSummary(summaryJson.extract);
            setSource({
              name: 'Wikipedia',
              url: summaryJson.content_urls.desktop.page,
            });
            return;
          }
        }

        // 3) Fallback to DuckDuckGo Instant Answer
        const ddgRes = await fetch(
          `https://api.duckduckgo.com/?` +
          `q=${encodeURIComponent(query)}` +
          `&format=json&no_html=1`
        );
        const ddgJson = await ddgRes.json();
        let text = ddgJson.AbstractText;
        let url  = ddgJson.AbstractURL;
        if (!text && Array.isArray(ddgJson.RelatedTopics) && ddgJson.RelatedTopics.length) {
          const first = ddgJson.RelatedTopics[0];
          text = first.Text;
          url  = first.FirstURL;
        }
        if (text) {
          setSummary(text);
          setSource({ name: 'DuckDuckGo', url });
          return;
        }

        // 4) No result
        setSummary('No summary found for that query.');
      } catch (e) {
        console.error('Search error', e);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  if (!query) {
    return (
      <div className="p-6">
        <p>Please enter a search query.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back
        </Link>
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
              rel="noopener noreferrer"
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
