// File: src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Stub login: store provider and dummy token, then redirect
  const handleLogin = (provider) => {
    localStorage.setItem('authToken', 'dummyToken');
    localStorage.setItem('authProvider', provider);
    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Login (Passwordless)</h2>
      <button
        onClick={() => handleLogin('google')}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => handleLogin('apple')}
        className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Sign in with Apple
      </button>
      <button
        onClick={() => handleLogin('reddit')}
        className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Sign in with Reddit
      </button>
      <button
        onClick={() => handleLogin('magic-link')}
        className="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Send Magic Link
      </button>
    </div>
  );
}
