// File: src/components/WidgetWrapper.js
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaEllipsisV } from 'react-icons/fa';
import WidgetContextMenu from './WidgetContextMenu';

export default function WidgetWrapper({
  id,
  title,
  loading,
  favorite,
  onRename,
  onToggleFavorite,
  onHide,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 drag-handle">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800 dark:text-white">{title}</span>
          <button onClick={() => onToggleFavorite(id)} className="text-yellow-500 hover:text-yellow-400">
            {favorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <FaEllipsisV />
          </button>
          {menuOpen && (
            <WidgetContextMenu
              widgetId={id}
              onClose={() => setMenuOpen(false)}
              onHide={onHide}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorite}
            />
          )}
        </div>
      </div>
      <div className="p-3 overflow-y-auto flex-1">{loading ? 'Loading...' : children}</div>
    </div>
  );
}


