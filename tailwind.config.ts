/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alert-red': '#c13515', // Main alert color
        'alert-red-light': '#fff8f6', // Light variant of alert-red,
        'special-grey': '#f7f7f7'
      },
      fontSize: {
        'xxs': '0.6rem',
        'xs': '0.70rem',  // Slightly smaller than the default
        'sm': '0.80rem', // Slightly smaller than the default
        'base': '0.9375rem', // Slightly smaller than the default
        'lg': '1.0625rem',    // Slightly smaller than the default
        'xl': '1.1875rem', // Slightly smaller than the default
        '2xl': '1.3125rem', // Slightly smaller than the default
        '3xl': '1.4375rem',  // Slightly smaller than the default
        '4xl': '1.5625rem', // Slightly smaller than the default
        '5xl': '1.6875rem',    // Slightly smaller than the default
        '6xl': '1.8125rem', // Slightly smaller than the default
        '7xl': '2.2rem',  // Slightly smaller than the default,
        '8xl': '2.6rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
