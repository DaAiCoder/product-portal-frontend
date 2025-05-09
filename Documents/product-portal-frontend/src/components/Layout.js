// File: src/components/Layout.js
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Portal
          </h1>
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
