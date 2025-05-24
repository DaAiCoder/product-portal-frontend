// File: src/components/CategoryManager.jsx

// src/components/CategoryManager.jsx

import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';

const API = '/api/calendar/categories';

export default function CategoryManager({ onCategoriesChange }) {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#90cdf4');

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        onCategoriesChange(data);
      });
  }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), color: newColor }),
    });
    const cat = await res.json();
    setCategories((c) => [...c, cat]);
    onCategoriesChange([...categories, cat]);
    setNewName('');
  };

  const removeCategory = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    onCategoriesChange(updated);
  };

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Manage Categories</h3>
      <div className="flex mb-2">
        <input
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
          '#90cdf4','#f6ad55','#fc8181','#9ae6b4','#faf089',
          '#d6bcfa','#f5c2fc','#feb2b2','#bee3f8','#c6f6d5'
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
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
