// File: src/components/Layout.js
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  FaHome,
  FaRss,
  FaSignInAlt,
  FaUser,
  FaMoon,
  FaSun,
  FaBullseye,
  FaTimesCircle,
} from 'react-icons/fa';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const [bgIndex, setBgIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(
    () => JSON.parse(localStorage.getItem('focusMode')) || false
  );
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const menuRef = useRef();

  const bgImages = [
    'https://source.unsplash.com/1600x900/?nature,water',
    'https://source.unsplash.com/1600x900/?forest',
    'https://source.unsplash.com/1600x900/?mountain',
    'https://source.unsplash.com/1600x900/?beach',
  ];

  // Persist theme on load/change
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

  // Rotate background
  useEffect(() => {
    const iv = setInterval(
      () => setBgIndex((i) => (i + 1) % bgImages.length),
      10000
    );
    return () => clearInterval(iv);
  }, []);

  // Persist focusMode
  useEffect(() => {
    localStorage.setItem('focusMode', JSON.stringify(focusMode));
  }, [focusMode]);

  // Close profile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const toggleMenu = () => setMenuOpen((open) => !open);
  const toggleFocus = () => setFocusMode((f) => !f);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ${
        focusMode ? 'overflow-hidden' : ''
      }`}
    >
      {/* Top header */}
      <header
        className={`bg-white dark:bg-gray-800 shadow ${
          focusMode ? 'fixed w-full z-20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Product Portal
          </h1>
          <nav className="flex items-center space-x-4">
            {/* Focus Mode Toggle */}
            <button
              onClick={toggleFocus}
              className="flex items-center space-x-1 px-3 py-1 bg-yellow-400 text-white rounded"
            >
              {focusMode ? <FaTimesCircle /> : <FaBullseye />}
              <span>{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>

            {!focusMode && (
              <>
                <Link
                  to="/"
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <FaHome />
                  <span>Home</span>
                </Link>
                <Link
                  to="/feeds"
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <FaRss />
                  <span>Feeds</span>
                </Link>
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                ) : (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={toggleMenu}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                    >
                      <FaUser />
                    </button>
                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-1 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaUser />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-1 w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FaSignInAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex pt-16 flex-1">
        <Sidebar />

        <main
          className={`flex-1 relative overflow-hidden ${
            focusMode ? 'p-0' : 'p-6'
          } pl-16`}
        >
          {!focusMode ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
              />
              <div className="relative z-10 p-6">{children}</div>
            </>
          ) : (
            <div className="relative z-10">{children}</div>
          )}
        </main>
      </div>

      {/* Footer */}
      {!focusMode && (
        <footer className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Product Portal
          </div>
        </footer>
      )}
    </div>
  );
}

