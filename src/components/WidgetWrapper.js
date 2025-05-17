// File: src/components/WidgetWrapper.js
import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaRegStar, FaEllipsisV, FaCog } from 'react-icons/fa';
import WidgetContextMenu from './WidgetContextMenu';

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
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const [bgStyle, setBgStyle] = useState(() => {
    const saved = localStorage.getItem(`widgetBg-${id}`);
    return saved ? JSON.parse(saved) : { type: 'default', color: '' };
  });

  useEffect(() => {
    localStorage.setItem(`widgetBg-${id}`, JSON.stringify(bgStyle));
  }, [bgStyle]);

  const getBgClass = () => {
    if (bgStyle.type === 'light') return 'bg-white';
    if (bgStyle.type === 'dark') return 'bg-gray-900';
    if (bgStyle.type === 'custom') return '';
    return 'bg-white dark:bg-gray-900';
  };

  const getBgStyle = () => {
    return bgStyle.type === 'custom' ? { backgroundColor: bgStyle.color } : {};
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      const clickedInsideWrapper = wrapperRef.current?.contains(e.target);
      const clickedButton = buttonRef.current?.contains(e.target);
      const clickedMenu = menuRef.current?.contains(e.target);
      if (!clickedInsideWrapper && !clickedButton && !clickedMenu) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextPos({ x: e.pageX, y: e.pageY });
    setMenuOpen(true);
  };

  return (
    <div
      className={`${getBgClass()} rounded shadow-lg h-full flex flex-col`}
      style={getBgStyle()}
      onContextMenu={handleContextMenu}
      ref={wrapperRef}
    >
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 drag-handle bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 mr-1 cursor-move select-none">☰</span>
          <span className="font-semibold text-gray-800 dark:text-white">{title}</span>
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
      <div className="p-3 overflow-y-auto flex-1">{loading ? 'Loading...' : children}</div>

      {menuOpen && (
        <WidgetContextMenu
          ref={menuRef}
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
