/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',

        // OPTIONAL: override too-dark values
        backgroundDark: '#1e1e2e',
        surfaceDark: '#2a2a3b',
        textDark: '#e0e0e0',
      },
      fontSize: {
        base: 'var(--font-base)',
      },
      spacing: {
        base: 'var(--spacing-base)',
      },
    },
  },
  plugins: [],
};
