// File: src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultVars = {
  primary: '#3b82f6',
  secondary: '#f59e0b',
  fontSize: '16px',
  spacing: '8px',
};

const ThemeContext = createContext({
  themeVars: defaultVars,
  setThemeVars: () => {},
});

export function ThemeProvider({ children }) {
  const [themeVars, setThemeVars] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('themeVars')) || defaultVars;
    } catch {
      return defaultVars;
    }
  });

  // Whenever themeVars changes, write to localStorage & update :root CSS vars
  useEffect(() => {
    localStorage.setItem('themeVars', JSON.stringify(themeVars));
    const root = document.documentElement.style;
    root.setProperty('--color-primary', themeVars.primary);
    root.setProperty('--color-secondary', themeVars.secondary);
    root.setProperty('--font-base', themeVars.fontSize);
    root.setProperty('--spacing', themeVars.spacing);
  }, [themeVars]);

  return (
    <ThemeContext.Provider value={{ themeVars, setThemeVars }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming
export function useTheme() {
  return useContext(ThemeContext);
}
