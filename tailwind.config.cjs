const { theme } = require('./theme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  prefix: 'cdx-',
  content: ["./**/*.tsx"],
  theme: theme,
  plugins: [],
}
