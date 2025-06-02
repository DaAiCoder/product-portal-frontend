import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeEditor() {
  const { theme, applyTheme, resetTheme } = useContext(ThemeContext);

  // local copy for edits
  const [draft, setDraft] = useState(theme);

  // when theme context changes (e.g. on reset), sync draft
  useEffect(() => {
    setDraft(theme);
  }, [theme]);

  const onColorChange = (key) => (e) => {
    setDraft((d) => ({
      ...d,
      colors: { ...d.colors, [key]: e.target.value },
    }));
  };

  const onFontChange = (e) => {
    setDraft((d) => ({
      ...d,
      fonts: { ...d.fonts, base: e.target.value },
    }));
  };

  const onSpacingChange = (e) => {
    setDraft((d) => ({
      ...d,
      spacing: { ...d.spacing, base: e.target.value },
    }));
  };

  const isDirty = JSON.stringify(draft) !== JSON.stringify(theme);

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold">Theme Editor</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Primary Color</label>
          <input
            type="color"
            value={draft.colors.primary}
            onChange={onColorChange('primary')}
          />
        </div>

        <div>
          <label className="block mb-1">Secondary Color</label>
          <input
            type="color"
            value={draft.colors.secondary}
            onChange={onColorChange('secondary')}
          />
        </div>

        <div>
          <label className="block mb-1">Base Font Size</label>
          <input
            type="text"
            value={draft.fonts.base}
            onChange={onFontChange}
            placeholder="e.g. 1rem"
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Base Spacing</label>
          <input
            type="text"
            value={draft.spacing.base}
            onChange={onSpacingChange}
            placeholder="e.g. 1rem"
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => applyTheme(draft)}
          disabled={!isDirty}
          className={`px-4 py-2 rounded ${
            isDirty
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Save
        </button>

        <button
          onClick={resetTheme}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

