/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          DEFAULT: '#9C6B3F',
          light: '#C9A47E',
          dark: '#6B4A2A',
        },
      },
    },
  },
  plugins: [],
}
