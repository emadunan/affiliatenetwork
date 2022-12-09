/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BE3F3F", // rgba(14, 40, 59, 1)
        secondary: "#FFFFFF", // rgba(202, 238, 237, 1)
        error: "#D1AA2C", // rgba(215, 53, 0, 1)
      },
    },
  },
  plugins: [],
}
