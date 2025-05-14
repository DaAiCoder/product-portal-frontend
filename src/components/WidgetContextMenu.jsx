// File: src/components/WidgetContextMenu.jsx
import React from 'react';
import { createPortal } from 'react-dom';

export default function WidgetContextMenu({
  widgetId,
  onClose,
  onHide,
  onToggleFavorite,
  isFavorite,
  position = { x: 100, y: 100 },
}) {
  const top = typeof position?.y === 'number' ? position.y : 100;
  const left = typeof position?.x === 'number' ? position.x : 100;

  const menu = (
    <div
      className="widget-context-menu bg-white dark:bg-gray-800 shadow-lg rounded w-40 z-[9999]"
      style={{ position: 'absolute', top, left }}
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

  return createPortal(menu, document.body);
}
