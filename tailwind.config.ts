export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-main": "var(--color-background-main)",
        "background-navigation": "var(--color-background-navigation)",
        "text-color": "var(--color-text-color)",
        active: "var(--active-color)",
      },
    },
  },
  plugins: [],
};