// File: src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Portal
          </h1>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-3 px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Product Portal
        </div>
      </footer>
    </div>
  );
}
