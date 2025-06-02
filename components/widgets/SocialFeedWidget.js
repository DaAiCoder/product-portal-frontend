// File: src/components/widgets/SocialFeedWidget.js

import React, { useEffect, useState } from 'react';
import {
  fetchSocialFeed,
  postToSocial,
  listSocialPlatforms,
} from '../../api/socialAPI';
import { FaShareAlt, FaPaperPlane } from 'react-icons/fa';

export default function SocialFeedWidget({ config }) {
  const { platforms = [] } = config;
  const [feed, setFeed] = useState([]);
  const [platformList, setPlatformList] = useState([]);
  const [newPost, setNewPost] = useState({ platform: '', content: '' });
  const [error, setError] = useState(null);

  const loadFeed = async () => {
    try {
      setFeed(await fetchSocialFeed(platforms));
    } catch (err) {
      setError(err.message);
    }
  };

  const loadPlatforms = async () => {
    try {
      setPlatformList(await listSocialPlatforms());
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePost = async () => {
    if (!newPost.platform || !newPost.content) return;
    try {
      await postToSocial(newPost.platform, newPost.content);
      setNewPost({ ...newPost, content: '' });
      loadFeed();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadPlatforms();
    loadFeed();
  }, [platforms]);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaShareAlt className="mr-1" />
        <strong>Social Feed</strong>
      </div>
      <div className="mb-2 space-y-1">
        <div className="flex space-x-1">
          <select
            value={newPost.platform}
            onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
            className="flex-1 p-1 border rounded text-sm"
          >
            <option value="">Platform</option>
            {platformList.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handlePost}
            className="p-1 border rounded text-sm"
            title="Post"
          >
            <FaPaperPlane />
          </button>
        </div>
        <textarea
          rows={2}
          value={newPost.content}
          placeholder="What's on your mind?"
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full p-1 border rounded text-sm"
        />
      </div>
      <ul className="space-y-2 max-h-40 overflow-y-auto text-sm">
        {feed.map((item) => (
          <li key={item.id} className="border-b pb-1">
            <div className="text-xs text-gray-500">
              {item.platform.toUpperCase()} by {item.user} at{' '}
              {new Date(item.timestamp).toLocaleString()}
            </div>
            <div>{item.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
