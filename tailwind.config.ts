import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pa-primary": "#0000FF",
        "pa-primary-red": "#FF0000",
        "pa-primary-hover": "#BDBDFF",
        "pa-blue-mint": "#A1F1E8",
        "pa-dark-1": "#3A3B3C",
        "pa-dark-2": "#242526",
        "pa-dark-3": "#18191A",
        "pa-green": "#42B72A",
        "pa-dark-light": "#F0F2F5",
        "pa-font-light": "#B0B3B8",
        "pa-home-blue": "#092652",
        "pa-home-blue-light": "#4095E6",
        "pa-home-grey": "#E5E4F5",
        "pa-home-purple": "#6835FF",
        "pa-home-pink": "#E95CFF",
        "pa-home-yellow": "#FFB429",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
