// File: src/components/WidgetWrapper.jsx
import React, { useState, useRef, useEffect } from 'react';
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

  // Inline edit state (#10)
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef();

  // When title prop changes (e.g. reset), sync inputValue
  useEffect(() => {
    setInputValue(title);
  }, [title]);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    const newTitle = inputValue.trim() || title;
    setIsEditing(false);
    if (newTitle !== title) {
      onRename(id, newTitle);
    }
  };

  const handleInputKey = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    }
    if (e.key === 'Escape') {
      setInputValue(title);
      setIsEditing(false);
    }
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
        {/* Drag handle */}
        <span
          className="drag-handle cursor-move mr-2 text-gray-500 dark:text-gray-400"
          title="Drag to move"
        >
          <FaGripVertical />
        </span>

        {/* Inline editing of title */}
        {isEditing ? (
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-b border-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={handleInputKey}
          />
        ) : (
          <h3
            className="flex-1 font-semibold text-gray-800 dark:text-gray-200 cursor-text select-none"
            onDoubleClick={handleTitleDoubleClick}
          >
            {title}
          </h3>
        )}

        {/* Favorite toggle */}
        <button onClick={() => onToggleFavorite(id)} className="p-1 mr-2">
          {favorite ? <FaStar /> : <FaRegStar />}
        </button>

        {/* Ellipsis menu */}
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

