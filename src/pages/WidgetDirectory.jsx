// File: src/pages/WidgetDirectory.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { widgetLibrary } from '../utils/widgetLibrary';

export default function WidgetDirectory() {
  const navigate = useNavigate();

  const addWidget = (widget) => {
    const stored = JSON.parse(localStorage.getItem('dashboardLayout')) || [];
    if (stored.some((w) => w.i === widget.id)) {
      alert(widget.label + ' is already on your dashboard.');
      return;
    }
    const newItem = {
      i: widget.id,
      x: (stored.length * widget.w) % 12,
      y: Infinity,
      w: widget.w,
      h: widget.h,
    };
    const newLayout = [...stored, newItem];
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Widget Directory
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {widgetLibrary.map((widget) => (
          <div
            key={widget.id}
            className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            {widget.icon && (
              <div className="mb-2 text-blue-500">{widget.icon}</div>
            )}
            <span className="text-lg text-gray-800 dark:text-gray-200">
              {widget.label}
            </span>
            <button
              onClick={() => addWidget(widget)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
