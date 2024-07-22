// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "1280px",
        lg: "1440px",
        xl: "1900px",
      },
      colors: {
        brightBlue: "hsl(220, 98%, 61%)",
        checkBackground:
          "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        lightTheme: {
          veryLightGray: "hsl(0, 0%, 98%)",
          veryLightGrayishBlue: "hsl(236, 33%, 92%)",
          lightGrayishBlue: "hsl(233, 11%, 84%)",
          darkGrayishBlue: "hsl(236, 9%, 61%)",
          veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
        },
        darkTheme: {
          veryDarkBlue: "hsl(235, 21%, 11%)",
          veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
          lightGrayishBlue: "hsl(234, 39%, 85%)",
          lightGrayishBlueHover: "hsl(236, 33%, 92%)",
          darkGrayishBlue: "hsl(234, 11%, 52%)",
          veryDarkGrayishBlue1: "hsl(233, 14%, 35%)",
          veryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
        },
      },
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      fontSize: {
        body: ["18px", "1.5"],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      backgroundImage: {
        "check-gradient":
          "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
    },
  },
  plugins: [],
};
