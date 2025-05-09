// File: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <h1 className="text-4xl font-extrabold text-blue-600">
      Product Portal Frontend
    </h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
