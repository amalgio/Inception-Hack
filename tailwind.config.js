/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"]
      }
    },
  },
  plugins: [
    require("flyonui")
  ],
  flyonui: {
    themes: ["light"]
  }
}