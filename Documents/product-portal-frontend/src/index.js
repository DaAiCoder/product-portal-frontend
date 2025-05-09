// File: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import './styles/globals.css';

const App = () => (
  <Layout>
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl font-extrabold text-blue-600">
        Product Portal Frontend
      </h1>
    </div>
  </Layout>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
