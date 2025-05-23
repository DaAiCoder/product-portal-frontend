// File: src/components/CategoryManager.jsx

import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';

const STORAGE_KEY = 'calendarCategories';

export default function CategoryManager({ onCategoriesChange }) {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#90cdf4');

  // Load saved categories
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  // Persist and notify parent
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    onCategoriesChange(categories);
  }, [categories, onCategoriesChange]);

  const addCategory = () => {
    if (!newName.trim()) return;
    setCategories([
      ...categories,
      { id: Date.now().toString(), name: newName.trim(), color: newColor },
    ]);
    setNewName('');
  };

  const removeCategory = (id) =>
    setCategories(categories.filter((c) => c.id !== id));

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Manage Categories</h3>
      <div className="flex mb-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Category name"
          className="flex-1 border p-1 rounded"
        />
        <button
          onClick={addCategory}
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <TwitterPicker
        triangle="hide"
        colors={[
          '#90cdf4',
          '#f6ad55',
          '#fc8181',
          '#9ae6b4',
          '#faf089',
          '#d6bcfa',
          '#f5c2fc',
          '#feb2b2',
          '#bee3f8',
          '#c6f6d5',
        ]}
        onChangeComplete={(c) => setNewColor(c.hex)}
      />
      <ul className="mt-4 space-y-1">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between">
            <span style={{ color: c.color }}>{c.name}</span>
            <button
              onClick={() => removeCategory(c.id)}
              className="text-red-500"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
