// File: src/pages/Profile.js
import React, { useState, useEffect } from 'react';

export default function Profile() {
  // State for user data
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });

  // On mount, load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user')) || {};
    setUser({
      name: stored.name || '',
      email: stored.email || '',
      avatar: stored.avatar || '',
    });
  }, []);

  // Handle name/email input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar file selection and convert to data URL
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save back to localStorage
  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile saved');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <div className="flex items-center space-x-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

