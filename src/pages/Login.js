// File: src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);

    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || ''}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    if (!res.ok) {
      const err = await res.json();
      return alert(err.detail || 'Login failed');
    }
    const { access_token } = await res.json();
    // ← **Store the token so subsequent calls can use it**
    localStorage.setItem('authToken', access_token);
    // Redirect to feeds (or dashboard)
    navigate('/feeds');
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 space-y-4">
      <div>
        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </form>
  );
}
