// File: src/components/WidgetContextMenu.jsx
import React from 'react';

export default function WidgetContextMenu({
  widgetId,
  onClose,
  onHide,
  onToggleFavorite,
  isFavorite,
}) {
  return (
    <div className="absolute top-full right-0 mt-1 w-32 bg-white dark:bg-gray-800 shadow-lg rounded z-50">
      <button
        onClick={() => { onToggleFavorite(widgetId); onClose(); }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button
        onClick={() => { onHide(widgetId); onClose(); }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Hide
      </button>
    </div>
  );
}

