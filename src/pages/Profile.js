// File: src/pages/Profile.js
import React from 'react';

export default function Profile() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Your Profile</h2>
      <div className="flex items-center space-x-4">
        {/* Placeholder avatar */}
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            User Name
          </h3>
          <p className="text-gray-600 dark:text-gray-400">user@example.com</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Bio
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          This is your bio. Tell us a bit about yourself.
        </p>
      </div>
    </div>
  );
}
