// File: src/components/WidgetSettingsPanel.js
import React from 'react';
import WidgetBackgroundControl from './WidgetBackgroundControl';

export default function WidgetSettingsPanel({ visible, onClose, widgetId }) {
  if (!visible) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-lg z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Widget Settings</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-black dark:hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <WidgetBackgroundControl
          widgetId={widgetId}
          value={{ type: 'default', color: '' }}
          onChange={(bg) =>
            console.log('Saving background for', widgetId, '->', bg)
          }
        />
      </div>
    </div>
  );
}
