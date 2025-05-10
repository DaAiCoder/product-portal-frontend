// File: src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme class to <html> and persist choice
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Product Portal
          </h1>
          <nav className="space-x-6 flex items-center">
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
      <main className="flex-grow">{children}</main>
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Product Portal
        </div>
      </footer>
    </div>
  );
}
