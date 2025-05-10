// File: src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const [bgIndex, setBgIndex] = useState(0);
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  const bgImages = [
    'https://source.unsplash.com/1600x900/?nature,water',
    'https://source.unsplash.com/1600x900/?forest',
    'https://source.unsplash.com/1600x900/?mountain',
    'https://source.unsplash.com/1600x900/?beach',
  ];

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // rotate background
  useEffect(() => {
    const iv = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(iv);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Product Portal
            </h1>
            {isAuthenticated && (
              <input
                type="text"
                placeholder="Search..."
                className="hidden md:block border rounded px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring"
              />
            )}
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Login
            </Link>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Rotating background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
        />
        {/* Foreground content */}
        <div className="relative z-10 p-6">{children}</div>
      </main>

      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Product Portal
        </div>
      </footer>
    </div>
  );
}

