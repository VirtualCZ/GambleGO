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
    extend: {
      colors: {
        'Mil-Spec': '#4B69FF',
        'Restricted': '#1C1E22',
        'Classified': '#D32EE6',
        'Covert': '#EB4B4B',
        'Special': '#1C1E22',
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
}