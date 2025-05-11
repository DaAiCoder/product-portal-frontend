import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const DEFAULT_SETTINGS = {
  colors: {
    primary: '#1d4ed8',
    secondary: '#9333ea',
  },
  fonts: {
    base: '1rem',
  },
  spacing: {
    base: '1rem',
  },
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('themeSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Apply CSS variables & persist on change
  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    const root = document.documentElement;
    Object.entries(settings.colors).forEach(
      ([k, v]) => root.style.setProperty(`--color-${k}`, v)
    );
    Object.entries(settings.fonts).forEach(
      ([k, v]) => root.style.setProperty(`--font-${k}`, v)
    );
    Object.entries(settings.spacing).forEach(
      ([k, v]) => root.style.setProperty(`--spacing-${k}`, v)
    );
  }, [settings]);

  const updateSetting = (category, key, value) => {
    setSettings(s => ({
      ...s,
      [category]: { ...s[category], [key]: value },
    }));
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ThemeContext.Provider>
  );
}
