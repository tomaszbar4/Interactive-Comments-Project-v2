/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'comment': '50rem'
      },
      minWidth: {
        'comment': '50rem'
      }
    },
  },
  plugins: [],
}