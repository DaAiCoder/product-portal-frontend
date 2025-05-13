// src/components/WidgetWrapper.jsx
import React, { useState, useRef } from 'react';
import { FaGripVertical, FaStar, FaRegStar } from 'react-icons/fa';
import WidgetContextMenu from './WidgetContextMenu';

export default function WidgetWrapper({
  id,
  title,
  children,
  loading,
  onRename,
  onToggleFavorite
}) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [favorite, setFavorite] = useState(false);
  const headerRef = useRef();

  // Double-click header to rename
  const handleDoubleClick = () => setEditing(true);
  const finishRename = () => {
    setEditing(false);
    onRename(id, newTitle);
  };

  // Toggle the “star” favorite state
  const toggleFav = () => {
    setFavorite((f) => !f);
    onToggleFavorite(id);
  };

  return (
    <div className="widget-wrapper border dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow">
      <div className="widget-header flex items-center p-2 relative" ref={headerRef}>
        {/* Drag handle for react-grid-layout */}
        <span className="drag-handle cursor-move mr-2">
          <FaGripVertical />
        </span>

        {/* Inline title edit on double-click */}
        {editing ? (
          <input
            className="border-b flex-1 mr-2 p-1 bg-transparent text-gray-800 dark:text-gray-200"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={finishRename}
            onKeyDown={(e) => e.key === 'Enter' && finishRename()}
            autoFocus
          />
        ) : (
          <h3
            className="flex-1 text-lg font-semibold text-gray-800 dark:text-gray-200"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </h3>
        )}

        {/* Favorite star icon */}
        <button onClick={toggleFav} className="p-1 mr-2">
          {favorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
        </button>

        {/* Custom context menu on right-click */}
        <WidgetContextMenu targetRef={headerRef} widgetId={id} />
      </div>

      {/* Skeleton loader when content is loading */}
      {loading ? (
        <div className="p-4 animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded" />
      ) : (
        <div className="widget-content p-2">{children}</div>
      )}
    </div>
  );
}
