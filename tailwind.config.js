import tailmotion from "@betodz/tailmotion"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        auto1fr: "auto 1fr",
      },
      colors: {
        primary: "#a2cacb",
        secondary: "#1fd1bf",
      },
    },
  },
  plugins: [tailmotion],
};
