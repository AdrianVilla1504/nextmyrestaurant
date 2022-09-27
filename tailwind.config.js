/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      filter: [ 'hover', 'focus' ],
      saturate: ['hover', 'focus'],
      saturate: {
        25: '.25',
        75: '.75',
      }
    },
  },
  plugins: [],
}
