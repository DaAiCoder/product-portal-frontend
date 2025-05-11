import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeEditor() {
  const { theme, setTheme } = useContext(ThemeContext);

  // Guard in case context isn’t ready
  const sections = theme ? Object.entries(theme) : [];

  const updateValue = (section, key, value) => {
    setTheme({
      ...theme,
      [section]: {
        ...theme[section],
        [key]: value,
      },
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold">Theme Editor</h1>
      {sections.map(([section, values]) => (
        <div key={section}>
          <h2 className="text-xl font-semibold capitalize">{section}</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {Object.entries(values).map(([key, val]) => (
              <div key={key} className="flex flex-col">
                <label className="capitalize mb-1">{key}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => updateValue(section, key, e.target.value)}
                  className="px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

