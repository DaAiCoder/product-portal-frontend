/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // ✅ ADD THIS LINE
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
        base: 'var(--spacing-base)',
      },
    },
  },
  plugins: [],
};
