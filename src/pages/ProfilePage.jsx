// File: src/pages/ProfilePage.jsx
import React, { useState } from 'react';

export default function ProfilePage() {
  const tabs = ['Settings', 'Preferences', 'Account'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        My Profile
      </h2>

      {/* Tab Headers */}
      <div className="border-b border-gray-300 dark:border-gray-600 mb-6">
        <nav className="-mb-px flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-lg font-medium focus:outline-none ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Settings' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            {/* TODO: add settings form fields here */}
          </div>
        )}
        {activeTab === 'Preferences' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Preferences</h3>
            {/* TODO: add preferences UI here */}
          </div>
        )}
        {activeTab === 'Account' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            {/* TODO: display user info + avatar + save button */}
          </div>
        )}
      </div>
    </div>
  );
}
