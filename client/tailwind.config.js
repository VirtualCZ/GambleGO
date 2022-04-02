const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    borderRadius: {
      'cool' : '13px',
      ...defaultTheme.borderRadius,
    },
    extend: {},
  },
  plugins: [],
}