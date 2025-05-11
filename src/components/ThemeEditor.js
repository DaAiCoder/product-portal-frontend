//ThemeEditor.js

import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeEditor() {
  const { tokens, setToken } = useContext(ThemeContext);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Theme Editor</h1>

      <div className="space-y-4">
        {Object.entries(tokens).map(([key, val]) => (
          <div key={key} className="flex items-center space-x-4">
            <label className="w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            {key.startsWith('color') ? (
              <input
                type="color"
                value={val}
                onChange={(e) => setToken(key, e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={val}
                onChange={(e) => setToken(key, e.target.value)}
                className="border px-2 py-1 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
