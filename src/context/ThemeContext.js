// File: src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: {
    primaryColor: '#3B82F6',    // Tailwind blue-500
    secondaryColor: '#10B981',  // Tailwind green-500
    baseFontSize: '1rem',
    baseSpacing: '1rem',
  },
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage or use defaults
    try {
      const stored = JSON.parse(localStorage.getItem('appTheme'));
      return stored || {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        baseFontSize: '1rem',
        baseSpacing: '1rem',
      };
    } catch {
      return {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        baseFontSize: '1rem',
        baseSpacing: '1rem',
      };
    }
  });

  // Apply CSS variables and persist on theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--font-base', theme.baseFontSize);
    root.style.setProperty('--spacing-base', theme.baseSpacing);

    localStorage.setItem('appTheme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
