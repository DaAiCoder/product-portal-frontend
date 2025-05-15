import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import WidgetBackgroundControl from './WidgetBackgroundControl';

export default function WidgetSettingsPanel({ visible, onClose, widgetId }) {
  const [bgStyle, setBgStyle] = useState({ type: 'default', color: '' });

  useEffect(() => {
    const saved = localStorage.getItem(`widgetBg-${widgetId}`);
    if (saved) {
      setBgStyle(JSON.parse(saved));
    }
  }, [widgetId]);

  useEffect(() => {
    if (widgetId) {
      localStorage.setItem(`widgetBg-${widgetId}`, JSON.stringify(bgStyle));
    }
  }, [bgStyle, widgetId]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-30 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings: {widgetId}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <WidgetBackgroundControl
            widgetId={widgetId}
            value={bgStyle}
            onChange={(val) => setBgStyle(val)}
          />
        </div>
      </div>
    </div>
  );
}
