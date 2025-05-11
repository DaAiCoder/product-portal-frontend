// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // scan all JS/TS files in src/
    "./public/index.html"           // your HTML entrypoint
  ],
  theme: {
    extend: {
      // you can add custom colors, fonts, spacing here,
      // and inject CSS variables from your ThemeContext
    },
  },
  plugins: [],
  darkMode: "class",  // since you toggle 'dark' class on <html>
};
