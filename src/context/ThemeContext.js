import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const defaultTokens = {
  colorPrimary: '#2563eb',
  colorSecondary: '#10b981',
  fontBase: '1rem',
  spacing: '1rem',
};

export function ThemeProvider({ children }) {
  const [tokens, setTokens] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('themeTokens')) || defaultTokens;
    } catch {
      return defaultTokens;
    }
  });

  // Write CSS vars to :root
  useEffect(() => {
    const root = document.documentElement.style;
    Object.entries(tokens).forEach(([key, val]) => {
      root.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, val);
    });
    localStorage.setItem('themeTokens', JSON.stringify(tokens));
  }, [tokens]);

  const setToken = (key, value) => {
    setTokens((t) => ({ ...t, [key]: value }));
  };

  return (
    <ThemeContext.Provider value={{ tokens, setToken }}>
      {children}
    </ThemeContext.Provider>
  );
}
