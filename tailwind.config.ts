import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        h: ["var(--font-alegrea)", ...fontFamily.serif],
        p: ["var(--font-mulish)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
