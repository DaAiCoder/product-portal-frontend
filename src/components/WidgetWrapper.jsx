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
  onSettings,
  onHide,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const handleDoubleClick = () => {
    const newTitle = prompt('Enter new title:', title);
    if (newTitle) onRename(id, newTitle);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded shadow h-full flex flex-col"
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
      }}
    >
      <div className="widget-title-bar flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        {/* ① Drag handle */}
        <span
          className="drag-handle cursor-move mr-2 text-gray-500 dark:text-gray-400"
          title="Drag to move"
        >
          <FaGripVertical />
        </span>

        {/* ② Title (double-click to rename) */}
        <h3
          className="flex-1 font-semibold text-gray-800 dark:text-gray-200 cursor-pointer select-none"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </h3>

        {/* ③ Favorite toggle */}
        <button onClick={() => onToggleFavorite(id)} className="p-1 mr-2">
          {favorite ? <FaStar /> : <FaRegStar />}
        </button>

        {/* ④ Ellipsis menu toggle */}
        <button onClick={() => setMenuOpen((o) => !o)} className="p-1">
          <FaEllipsisV />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded" />
        ) : (
          children
        )}
      </div>

      {/* ⑤ Custom context menu */}
      {menuOpen && (
        <WidgetContextMenu
          position={menuPos}
          widgetId={id}
          onClose={() => setMenuOpen(false)}
          onSettings={onSettings}
          onHide={onHide}
        />
      )}
    </div>
  );
}

