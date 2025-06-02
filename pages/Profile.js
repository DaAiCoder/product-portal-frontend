// File: src/pages/profile.js
import React, { useState, useEffect } from 'react';

export default function Profile() {
  const tabs = ['Settings', 'Preferences', 'Account'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [bgImage, setBgImage] = useState('');
  const [bgMusic, setBgMusic] = useState('');
  const [menuColor, setMenuColor] = useState('#1f2937');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user')) || {};
    setUser({
      name: stored.name || '',
      email: stored.email || '',
      avatar: stored.avatar || '',
    });
    setBgImage(localStorage.getItem('profileBgImage') || '');
    setBgMusic(localStorage.getItem('profileBgMusic') || '');
    setMenuColor(localStorage.getItem('menuColor') || '#1f2937');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUser((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBgMusicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgMusic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('profileBgImage', bgImage);
    localStorage.setItem('profileBgMusic', bgMusic);
    localStorage.setItem('menuColor', menuColor);
    alert('Profile saved!');
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <audio src={bgMusic} autoPlay loop hidden />

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded shadow-lg p-6 backdrop-blur bg-opacity-90">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Profile</h2>

        {/* Tabs */}
        <div className="border-b mb-6 flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {activeTab === 'Settings' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Avatar</label>
              <div className="flex items-center space-x-4">
                {user.avatar ? (
                  <img src={user.avatar} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
                )}
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Preferences' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Background Image</label>
              <input type="file" accept="image/*" onChange={handleBgImageChange} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Background Music</label>
              <input type="file" accept="audio/*" onChange={handleBgMusicChange} />
            </div>
          </div>
        )}

        {activeTab === 'Account' && (
          <div>
            <label className="block text-sm font-medium mb-1">Sidebar/Menu Color</label>
            <input
              type="color"
              value={menuColor}
              onChange={(e) => setMenuColor(e.target.value)}
              className="w-20 h-10 rounded"
            />
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              This color will be used for your sidebar and menus.
            </p>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

