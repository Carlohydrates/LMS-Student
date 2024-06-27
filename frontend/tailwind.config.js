/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/LOGIN_BG.png')",
      },
      colors: {
        black: {
          DEFAULT: "#010400",
          100: "#000100",
          200: "#010200",
          300: "#010300",
          400: "#010400",
          500: "#010400",
          600: "#1b6a00",
          700: "#34cf00",
          800: "#68ff35",
          900: "#b3ff9a",
        },
        black_olive: {
          DEFAULT: "#30332e",
          100: "#0a0a09",
          200: "#131412",
          300: "#1d1f1c",
          400: "#262925",
          500: "#30332e",
          600: "#595e55",
          700: "#82897d",
          800: "#acb1a8",
          900: "#d5d8d4",
        },
        snow: {
          DEFAULT: "#fffbfc",
          100: "#650019",
          200: "#ca0032",
          300: "#ff3064",
          400: "#ff95af",
          500: "#fffbfc",
          600: "#fffbfc",
          700: "#fffcfd",
          800: "#fffdfd",
          900: "#fffefe",
        },
        verdigris: {
          DEFAULT: "#82c8cd",
          100: "#11282a",
          200: "#215053",
          300: "#32787d",
          400: "#42a0a6",
          500: "#62bbc1",
          600: "#82c8cd",
          700: "#a1d6d9",
          800: "#c0e3e6",
          900: "#e0f1f2",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
