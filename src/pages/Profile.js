// File: src/pages/Profile.js
import React from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email || '—'}</p>
        {/* Add more profile fields as needed */}
      </div>
    </div>
  );
}
