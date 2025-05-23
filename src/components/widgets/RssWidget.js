"use client";

import React, { useState, useEffect } from "react";

export default function RssWidget({ feedUrl = "https://hnrss.org/frontpage" }) {
  const [feed, setFeed] = useState({ title: "", items: [] });
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(feedUrl);

  useEffect(() => {
    async function fetchFeed() {
      setLoading(true);
      try {
        const res = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        if (res.ok) setFeed(data);
        else console.error(data.error);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [url]);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">
        {feed.title || "RSS Feed"}
      </h3>
      <div className="space-y-1 overflow-auto h-48">
        {loading ? (
          <p>Loading feed…</p>
        ) : (
          feed.items.map((item, i) => (
            <div key={i}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400"
              >
                {item.title}
              </a>
              <div className="text-xs text-gray-500">
                {new Date(item.pubDate).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Feed URL"
          className="w-full border p-1 rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
        />
      </div>
    </div>
  );
}
