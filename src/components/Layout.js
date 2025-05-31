// src/components/Layout.js

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import HelpWidget from './HelpWidget';
import CommandBar from './CommandBar';
import { handleCommand } from '../utils/intentHandler';
import {
  FaHome,
  FaSignInAlt,
  FaUser,
  FaMoon,
  FaSun,
  FaBullseye,
  FaTimesCircle,
  FaPlus,
} from 'react-icons/fa';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(
    () => JSON.parse(localStorage.getItem('focusMode')) || false
  );
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Persist focus mode
  useEffect(() => {
    localStorage.setItem('focusMode', JSON.stringify(focusMode));
  }, [focusMode]);

  const toggleFocus = () => setFocusMode((f) => !f);
  const toggleMenu  = () => setMenuOpen((m) => !m);

  return (
    <div
      className={`
        min-h-screen flex flex-col 
        bg-gray-50 dark:bg-gray-900 
        ${focusMode ? 'overflow-hidden' : ''}
      `}
    >
      {/* Top header */}
      <header className={`bg-white dark:bg-gray-400 shadow`}>
  <div className="max-w-7xl mx-auto flex flex-col items-stretch px-6 pt-8 pb-2">
    {/* Space above */}
    <div className="h-6 md:h-10"></div>
    {/* Header row (logo, controls) */}
    <div className="flex items-center justify-between mb-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Product Portal
      </h1>
      {/* Controls: Focus, Profile, Theme */}
      <nav className="flex items-center space-x-4">
        <button
          onClick={toggleFocus}
          className="flex items-center space-x-1 px-3 py-1 bg-yellow-400 text-white rounded-xl shadow"
        >
          {focusMode ? <FaTimesCircle /> : <FaBullseye />}
          <span>{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
        </button>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="User Menu"
        >
          <FaUser />
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-6 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-30"
          >
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaUser className="inline mr-2"/> Profile
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                navigate('/login');
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaSignInAlt className="inline mr-2"/> Logout
            </button>
          </div>
        )}
        <button
          onClick={() => {
            const newTheme = document.documentElement.classList.contains('dark')
              ? 'light'
              : 'dark';
            document.documentElement.classList.toggle('dark');
            setFocusMode((f) => f); // just to trigger re-render
          }}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Toggle Theme"
        >
          {document.documentElement.classList.contains('dark') ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </div>
    {/* CommandBar row */}
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl">
        <CommandBar onExecute={(text) => handleCommand(text, navigate)} />
      </div>
    </div>
    {/* Padding below command bar */}
    <div className="h-4"></div>
  </div>
</header>


      {/* Sidebar + Main content */}
      <div className="flex pt-16 flex-1">
        <Sidebar />

        <main
          className={`
            flex-1 relative overflow-hidden 
            ${focusMode ? 'p-0' : 'p-6'} 
            pl-16
          `}
        >
          {children}

          {/* Floating Add button */}
          {!focusMode && (
            <Link
              to="/widget-library"
              className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-40"
            >
              <FaPlus size={24} />
            </Link>
          )}

          <HelpWidget />
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
