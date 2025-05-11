import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeEditor() {
  const { settings, updateSetting } = useContext(ThemeContext);

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Theme Editor</h2>

      {/* Primary Color */}
      <div>
        <label className="block font-semibold mb-1">Primary Color</label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={settings.colors.primary}
            onChange={e => updateSetting('colors', 'primary', e.target.value)}
          />
          <span>{settings.colors.primary}</span>
        </div>
      </div>

      {/* Secondary Color */}
      <div>
        <label className="block font-semibold mb-1">Secondary Color</label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={settings.colors.secondary}
            onChange={e => updateSetting('colors', 'secondary', e.target.value)}
          />
          <span>{settings.colors.secondary}</span>
        </div>
      </div>

      {/* Base Font Size */}
      <div>
        <label className="block font-semibold mb-1">Base Font Size</label>
        <input
          type="text"
          value={settings.fonts.base}
          onChange={e => updateSetting('fonts', 'base', e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Base Spacing */}
      <div>
        <label className="block font-semibold mb-1">Base Spacing</label>
        <input
          type="text"
          value={settings.spacing.base}
          onChange={e => updateSetting('spacing', 'base', e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}

