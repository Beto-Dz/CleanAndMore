import tailmotion from "@betodz/tailmotion";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        auto1fr: "auto 1fr",
      },
      colors: {
        primary: "#94C8D6",
        secondary: "#62BCE5",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgb(255, 255, 255)",
      },
      backgroundImage: {
        clean: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
      },
    },
  },
  plugins: [tailmotion],
};
