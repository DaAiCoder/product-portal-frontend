import React, { createContext, useState } from 'react';

// A sensible default so ThemeEditor’s Object.entries(theme) never breaks
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
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('themeSettings'));
      return saved || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // Persist on change
  React.useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
