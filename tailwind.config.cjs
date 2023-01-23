/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "darkcyan": "	#00494d",
        "darkgraycyan": "#5e7a7d",
        "grayishcyan": "#7f9c9f",
        "lightgraycyan": "#c5e4e7",
        "lightcyan": "#f4fafa",
      }
    },
  },
  plugins: [],
}