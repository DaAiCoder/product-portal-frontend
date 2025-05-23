// src/pages/feeds.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getFollowedTopics,
  setFollowedTopics,
  getRSSFeeds,
  setRSSFeeds
} from '../services/userPreferences';

const suggestedTopics = [
  'Technology',
  'Business',
  'Sports',
  'Health',
  'Science',
  'Entertainment'
];

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export default function FeedsPage() {
  // Followed topics & feeds
  const [topics, setTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [feedUrl, setFeedUrl] = useState('');

  // Articles from NewsAPI
  const [articles, setArticles] = useState([]);

  // RSS items from backend
  const [rssItems, setRssItems] = useState([]);

  // 1. Load saved topics & feeds on mount
  useEffect(() => {
    (async () => {
      try {
        const savedTopics = await getFollowedTopics();
        setTopics(savedTopics);
        const savedFeeds = await getRSSFeeds();
        setFeeds(savedFeeds);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // 2. Fetch NewsAPI articles whenever topics change
  useEffect(() => {
    if (!NEWS_API_KEY || topics.length === 0) {
      setArticles([]);
      return;
    }
    (async () => {
      try {
        const q = topics.join(' OR ');
        const resp = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_API_KEY}`
        );
        const json = await resp.json();
        setArticles((json.articles || []).slice(0, 12));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [topics]);

  // 3. Fetch RSS items from backend whenever feeds change
  useEffect(() => {
    if (feeds.length === 0) {
      setRssItems([]);
      return;
    }
    (async () => {
      try {
        let all = [];
        for (const url of feeds) {
          const resp = await axios.get('/rss', { params: { url } });
          const { feed, items } = resp.data;
          items.forEach(item =>
            all.push({ ...item, feedTitle: feed.title })
          );
        }
        setRssItems(all);
      } catch (err) {
        console.error('Error fetching RSS:', err);
      }
    })();
  }, [feeds]);

  // Handlers for topics
  const toggleTopic = async (topic) => {
    const updated = topics.includes(topic)
      ? topics.filter(t => t !== topic)
      : [...topics, topic];
    setTopics(updated);
    await setFollowedTopics(updated);
  };

  const handleCustomTopic = async (e) => {
    e.preventDefault();
    const t = customTopic.trim();
    if (t && !topics.includes(t)) {
      const updated = [...topics, t];
      setTopics(updated);
      await setFollowedTopics(updated);
    }
    setCustomTopic('');
  };

  // Handlers for RSS feeds
  const handleAddFeed = async (e) => {
    e.preventDefault();
    const url = feedUrl.trim();
    if (url && !feeds.includes(url)) {
      const updated = [...feeds, url];
      setFeeds(updated);
      await setRSSFeeds(updated);
    }
    setFeedUrl('');
  };

  const removeFeed = async (url) => {
    const updated = feeds.filter(f => f !== url);
    setFeeds(updated);
    await setRSSFeeds(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row lg:space-x-6">
      {/* Left Pane: Topics & RSS Management */}
      <aside className="lg:w-1/4 flex flex-col space-y-8">
        {/* Follow Topics */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="text-2xl font-semibold mb-4">Follow Topics</h2>
          <div className="grid grid-cols-2 gap-2">
            {suggestedTopics.map(t => (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
                className={`px-3 py-2 border rounded text-sm transition ${
                  topics.includes(t)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <form onSubmit={handleCustomTopic} className="flex space-x-2 mt-4">
            <input
              type="text"
              placeholder="Add custom topic"
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded text-sm"
            >
              Add
            </button>
          </form>
          {topics.length > 0 && (
            <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
              {topics.map((t, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{t}</span>
                  <button
                    onClick={() => toggleTopic(t)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* RSS Feeds Management */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="text-2xl font-semibold mb-4">Your RSS Feeds</h2>
          <form onSubmit={handleAddFeed} className="flex space-x-2 mb-4">
            <input
              type="url"
              placeholder="https://example.com/rss"
              value={feedUrl}
              onChange={e => setFeedUrl(e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              Add
            </button>
          </form>
          {feeds.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {feeds.map((f, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{f}</span>
                  <button
                    onClick={() => removeFeed(f)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No RSS feeds added.</p>
          )}
        </section>
      </aside>

      {/* Main Content: News Articles & RSS Items */}
      <main className="flex-1 space-y-8">
        {/* News Articles */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="text-2xl font-semibold mb-4">News Articles</h2>
          {articles.length === 0 ? (
            <p className="text-gray-600">Select topics to load articles.</p>
          ) : (
            <div className="space-y-4">
              {articles.map((a, i) => (
                <a
                  key={i}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(a.publishedAt).toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* RSS Items */}
        {rssItems.length > 0 && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-2xl font-semibold mb-4">RSS Items</h2>
            <div className="space-y-6">
              {rssItems.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded border hover:shadow-lg transition"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 hover:underline"
                  >
                    {item.title}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.feedTitle} | {item.published}
                  </p>
                  <p className="text-gray-700 mt-2 text-sm">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
);
}
