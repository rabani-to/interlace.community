/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./pages/*.{tsx,js}",
    "./pages/**/*.{tsx,js}",
    "./components/*.{tsx,js}",
    "./components/**/*.{tsx,js}",
  ],
  theme: {
    extend: {
      fontWeight: {
        bold: 500,
      },
    },
  },
  plugins: [],
}
