const { blackA, mauve, violet } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '4xl': { max: '1920px' },
      '3xl': { max: '1680px' },
      '2xl': { max: '1536px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' },
    },
    extend: {
      colors: {
        bgcolor: '#eee',
        yellow: '#ff0000',
        ...blackA,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
}
