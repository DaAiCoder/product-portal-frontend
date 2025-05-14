// File: src/components/WidgetWrapper.jsx
import React, { useState } from 'react';
import { FaGripVertical, FaStar, FaRegStar, FaEllipsisV } from 'react-icons/fa';
import WidgetContextMenu from './WidgetContextMenu';

export default function WidgetWrapper({
  id,
  title,
  loading,
  onRename,
  onToggleFavorite,
  favorite,
  children
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDoubleClick = () => {
    const newTitle = prompt('Enter new title:', title);
    if (newTitle) onRename(id, newTitle);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow h-full flex flex-col">
      <div className="widget-header flex items-center p-2 relative">
        {/* ← Drag handle icon */}
        <span
          className="drag-handle cursor-move mr-2 text-gray-500 dark:text-gray-400"
          title="Drag to move"
        >
          <FaGripVertical />
        </span>

        {/* ← Inline title editing */}
        <h3
          className="flex-1 font-semibold text-gray-800 dark:text-gray-200 cursor-pointer"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </h3>

        {/* ← Favorite star */}
        <button onClick={() => onToggleFavorite(id)} className="p-1 mr-2">
          {favorite ? <FaStar /> : <FaRegStar />}
        </button>

        {/* ← 3-dot menu toggle */}
        <button onClick={() => setMenuOpen(o => !o)} className="p-1">
          <FaEllipsisV />
        </button>

        {/* ← Context menu */}
        {menuOpen && (
          <WidgetContextMenu
            onClose={() => setMenuOpen(false)}
            widgetId={id}
          />
        )}
      </div>

      {/* Widget body */}
      <div className="flex-1 overflow-auto p-2">
        {loading ? (
          <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
