// File: src/pages/Login.js
import React from 'react';

export default function Login() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {/* TODO: wire up OAuth & Magic Link */}
      <button className="w-full py-2 mb-2 bg-blue-600 text-white rounded">
        Sign in with Google
      </button>
      <button className="w-full py-2 mb-2 bg-gray-200 text-gray-800 rounded">
        Magic Link
      </button>
    </div>
  );
}
