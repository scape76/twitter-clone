import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        content: "200px 1fr"
      }
    },
  },
  plugins: [],
} satisfies Config;
