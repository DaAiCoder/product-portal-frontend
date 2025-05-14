import React, { useState, useRef, useEffect } from 'react';
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
  const [contextPos, setContextPos] = useState({ x: 100, y: 100 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextPos({ x: e.pageX, y: e.pageY });
    setMenuOpen(true);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded shadow-lg h-full flex flex-col"
      onContextMenu={handleContextMenu}
      ref={wrapperRef}
    >
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 drag-handle">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800 dark:text-white">{title}</span>
          <button onClick={() => onToggleFavorite(id)} className="text-yellow-500 hover:text-yellow-400">
            {favorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setContextPos({ x: e.pageX, y: e.pageY });
              setMenuOpen((o) => !o);
            }}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <div className="p-3 overflow-y-auto flex-1">{loading ? 'Loading...' : children}</div>

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
