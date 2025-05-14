// File: src/components/WidgetContextMenu.jsx
import React from 'react';

export default function WidgetContextMenu({
  widgetId,
  onClose,
  onHide,
  onToggleFavorite,
  isFavorite,
  position = { x: 0, y: 0 },
}) {
  return (
    <div
      style={{ position: 'absolute', top: position.y, left: position.x }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded w-40 z-50"
    >
      <button
        onClick={() => {
          onToggleFavorite(widgetId);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button
        onClick={() => {
          onHide(widgetId);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Hide
      </button>
      <button
        onClick={() => {
          alert('Settings coming soon!');
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Settings
      </button>
    </div>
  );
}

