// File: src/components/WidgetBackgroundControl.js
import React from 'react';

export default function WidgetBackgroundControl({ widgetId, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Background Style</label>
      <select
        value={value?.type || 'default'}
        onChange={(e) =>
          onChange({
            type: e.target.value,
            color: e.target.value === 'custom' ? value.color || '#ffffff' : '',
          })
        }
        className="w-full border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800 dark:text-white"
      >
        <option value="default">Default</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="custom">Custom</option>
      </select>

      {value?.type === 'custom' && (
        <input
          type="color"
          value={value.color || '#ffffff'}
          onChange={(e) => onChange({ ...value, color: e.target.value })}
        />
      )}
    </div>
  );
}
