// File: src/components/WidgetWrapper.jsx
import React, { useState } from 'react';
import { FaGripVertical, FaStar, FaRegStar, FaEllipsisV } from 'react-icons/fa';
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

  const handleDoubleClick = () => {
    const newTitle = prompt('Enter new title:', title);
    if (newTitle) onRename(id, newTitle);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow h-full flex flex-col">
      {/* Title Bar */}
      <div
        className="
          widget-title-bar 
          flex items-center 
          px-3 py-2 
          bg-gray-100 dark:bg-gray-700 
          border-b border-gray-200 dark:border-gray-600
        "
      >
        {/* Drag-handle Icon */}
        <span
          className="drag-handle cursor-move mr-2 text-gray-500 dark:text-gray-400"
          title="Drag to move"
        >
          <FaGripVertical />
        </span>

        {/* Title (double-click to rename) */}
        <h3
          className="flex-1 font-semibold text-gray-800 dark:text-gray-200 cursor-pointer select-none"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </h3>

        {/* Favorite Star */}
        <button onClick={() => onToggleFavorite(id)} className="p-1 mr-2">
          {favorite ? <FaStar /> : <FaRegStar />}
        </button>

        {/* 3-dot Menu Button */}
        <button onClick={() => setMenuOpen(o => !o)} className="p-1">
          <FaEllipsisV />
        </button>

        {/* Context Menu */}
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

      {/* Body */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}

