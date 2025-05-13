// src/pages/ProfilePage.jsx
import React, { useState } from 'react';

export default function ProfilePage() {
  const tabs = ['Settings', 'Preferences', 'Account'];
  const [active, setActive] = useState('Settings');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 ${
              active === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {active === 'Settings' && <div>{/* Settings form */}</div>}
        {active === 'Preferences' && <div>{/* Preferences form */}</div>}
        {active === 'Account' && <div>{/* Account details */}</div>}
      </div>
    </div>
  );
}
