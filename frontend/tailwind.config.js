/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf7f2',
        champagne: '#f0e8d8',
        blush: '#e8c9b8',
        rose: '#c9826b',
        deep: '#3d2b1f',
        muted: '#8a7068',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
