import React, { createContext, useState, useEffect } from 'react';

const defaultTheme = {
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

export const ThemeContext = createContext({
  theme: defaultTheme,
  applyTheme: () => {},
  resetTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  // on mount, load from localStorage or defaults
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('themeSettings'));
      if (stored) {
        setTheme(stored);
        injectCSSVars(stored);
      } else {
        injectCSSVars(defaultTheme);
      }
    } catch {
      injectCSSVars(defaultTheme);
    }
  }, []);

  function injectCSSVars(t) {
    const root = document.documentElement;
    Object.entries(t.colors).forEach(([key, val]) => {
      root.style.setProperty(`--color-${key}`, val);
    });
    root.style.setProperty(`--font-base`, t.fonts.base);
    root.style.setProperty(`--spacing-base`, t.spacing.base);
  }

  // apply & persist
  function applyTheme(updated) {
    setTheme(updated);
    injectCSSVars(updated);
    localStorage.setItem('themeSettings', JSON.stringify(updated));
  }

  // reset to defaults
  function resetTheme() {
    setTheme(defaultTheme);
    injectCSSVars(defaultTheme);
    localStorage.removeItem('themeSettings');
  }

  return (
    <ThemeContext.Provider value={{ theme, applyTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
