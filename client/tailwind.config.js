const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.3333%',
        '1/4': '25%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
