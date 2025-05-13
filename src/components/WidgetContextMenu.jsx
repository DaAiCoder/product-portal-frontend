// src/components/WidgetContextMenu.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function WidgetContextMenu({ targetRef, widgetId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Open when header is right-clicked; close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (targetRef.current && targetRef.current.contains(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('contextmenu', handler);
    return () => window.removeEventListener('contextmenu', handler);
  }, [targetRef]);

  const hideWidget = () => {
    // TODO: hook in hide logic
    setOpen(false);
  };
  const openSettings = () => {
    // TODO: open widget settings for widgetId
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div ref={menuRef} className="absolute bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md z-50">
      <button onClick={openSettings} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
        Settings
      </button>
      <button onClick={hideWidget} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
        Hide
      </button>
    </div>
  );
}
