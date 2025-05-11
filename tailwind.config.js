/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './src/globals.css'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontSize: {
        base: 'var(--font-base)',
      },
      spacing: {
        DEFAULT: 'var(--spacing)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};