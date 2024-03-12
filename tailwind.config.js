/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        lightBg: "#888EB0",
        darkBg: "#141625",
      },
    },
  },

  daisyui: {
    themes: false,
  },

  plugins: [require("daisyui")],
}
