// File: src/components/WidgetContextMenu.jsx
import React, { useEffect, useRef } from 'react';
import { FaCog, FaEyeSlash } from 'react-icons/fa';

export default function WidgetContextMenu({
  position,
  widgetId,
  onClose,
  onSettings,
  onHide,
}) {
  const ref = useRef();

  // Close when clicking elsewhere
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <ul
      ref={ref}
      className="absolute bg-white dark:bg-gray-800 shadow-lg rounded overflow-hidden z-50"
      style={{ top: position.y, left: position.x, minWidth: 160 }}
    >
      <li
        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        onClick={() => { onSettings(widgetId); onClose(); }}
      >
        <FaCog className="mr-2" /> Settings
      </li>
      <li
        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        onClick={() => { onHide(widgetId); onClose(); }}
      >
        <FaEyeSlash className="mr-2" /> Hide
      </li>
    </ul>
  );
}

