// File: src/components/WidgetWrapper.js
import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaRegStar, FaEllipsisV, FaCog } from 'react-icons/fa';
import WidgetContextMenu from './WidgetContextMenu';
import Skeleton from 'react-loading-skeleton'; // assuming already installed

export default function WidgetWrapper({
  id,
  title,
  loading,
  favorite,
  onRename,
  onToggleFavorite,
  onHide,
  showSettings = false,
  onOpenSettings,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contextPos, setContextPos] = useState({ x: 100, y: 100 });
  const [editing, setEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(() => {
    return localStorage.getItem(`widgetTitle-${id}`) || title;
  });

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(`widgetTitle-${id}`, titleInput);
  }, [titleInput]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const insideWidget = wrapperRef.current?.contains(e.target);
      const insideButton = buttonRef.current?.contains(e.target);
      const insideMenu = e.target.closest('.widget-context-menu');
      if (!insideWidget && !insideButton && !insideMenu) {
        setMenuOpen(false);
        setEditing(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTitleSubmit = () => {
    setEditing(false);
    if (onRename) onRename(id, titleInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded shadow-lg h-full flex flex-col"
      ref={wrapperRef}
    >
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 drag-handle bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 mr-1 cursor-move select-none">☰</span>
          {editing ? (
            <input
              ref={inputRef}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleKeyDown}
              className="text-sm rounded px-2 py-1 border dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <span
              onClick={() => setEditing(true)}
              className="font-semibold text-gray-800 dark:text-white cursor-pointer"
              title="Click to rename"
            >
              {titleInput}
            </span>
          )}
          <button onClick={() => onToggleFavorite(id)} className="text-yellow-500 hover:text-yellow-400">
            {favorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {showSettings && (
            <button
              onClick={() => onOpenSettings?.(id)}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              title="Settings"
            >
              <FaCog />
            </button>
          )}
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setContextPos({ x: e.pageX, y: e.pageY });
              setMenuOpen((o) => !o);
            }}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            title="More"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <div className="p-3 overflow-y-auto flex-1">
        {loading ? (
          <div className="space-y-3">
            <Skeleton height={24} />
            <Skeleton count={3} />
            <Skeleton width={'80%'} />
          </div>
        ) : (
          children
        )}
      </div>

      {menuOpen && (
        <WidgetContextMenu
          widgetId={id}
          onClose={() => setMenuOpen(false)}
          onHide={onHide}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorite}
          position={contextPos}
        />
      )}
    </div>
  );
}
