/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/src/**/*.{html,js,jsx}"], // Added jsx extension for React components
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Added Roboto for your custom font
      },
    },
  },
  corePlugins: {
    fontFamily: false, // Disable default Tailwind fonts
  },
}