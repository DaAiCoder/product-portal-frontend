// File: src/pages/feeds.js
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

  // RSS items from our backend
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
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Follow Topics */}
      <section>
        <h2 className="text-2xl font-bold">Follow Topics</h2>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {suggestedTopics.map(t => (
            <button
              key={t}
              onClick={() => toggleTopic(t)}
              className={`px-3 py-2 border rounded ${
                topics.includes(t)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
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
            className="flex-1 px-3 py-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Add
          </button>
        </form>
        {topics.length > 0 && (
          <ul className="list-disc pl-5 mt-4 space-y-1">
            {topics.map((t, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{t}</span>
                <button onClick={() => toggleTopic(t)} className="text-red-500 ml-2">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* News Feed */}
      <section>
        <h2 className="text-2xl font-bold">News Feed</h2>
        {articles.length === 0 ? (
          <p className="mt-4 text-gray-600">Select topics above to load articles.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {articles.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded hover:bg-gray-100"
              >
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(a.publishedAt).toLocaleDateString()}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* RSS Feeds Management */}
      <section>
        <h2 className="text-2xl font-bold">Your RSS Feeds</h2>
        <form onSubmit={handleAddFeed} className="flex space-x-2 mt-4">
          <input
            type="url"
            placeholder="https://example.com/rss"
            value={feedUrl}
            onChange={e => setFeedUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Add Feed
          </button>
        </form>
        {feeds.length > 0 && (
          <ul className="list-disc pl-5 mt-4 space-y-1">
            {feeds.map((f, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{f}</span>
                <button onClick={() => removeFeed(f)} className="text-red-500 ml-2">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* RSS Items */}
      {rssItems.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">RSS Items</h2>
          <div className="space-y-6 mt-4">
            {rssItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.feedTitle} | {item.published}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
