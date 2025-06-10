/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lily: ['"Lily Script One"', 'cursive'], // add this line
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

