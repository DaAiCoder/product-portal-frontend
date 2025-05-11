/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
