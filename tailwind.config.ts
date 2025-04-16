import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dark: "url(../assets/images/bg-dark.png)",
        light: "url(../assets/images/bg-light.png)",
      },
    },
  },
  plugins: [],
} satisfies Config;
