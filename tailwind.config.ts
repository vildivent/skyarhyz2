import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        h: ["var(--font-alegrea)"],
        p: ["var(--font-mulish)"],
      },
      colors: {
        darkgray: "#1e1e1e",
        grayish: "#292929",
        lightgray: "#444444",
        smoke: "#dddddd",
        primary: "rgb(2 132 199)",
        secondary: "rgb(3 105 161)",
      },
    },
  },
  plugins: [],
} satisfies Config;
