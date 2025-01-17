import type { Config } from "tailwindcss";
import { colors, nextui } from "@nextui-org/react";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "Poppins",
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#803ab3",
              100: "#c9a6de",
              200: "#bb91d6",
              300: "#ad7bcd",
              400: "#9e66c4",
              500: "#8f50bc",
              600: "#803ab3",
              foreground: "#ffffff",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#deae09",
              100: "#f6da9e",
              200: "#f3d186",
              300: "#eec86e",
              400: "#e9bf54",
              500: "#e4b738",
              600: "#deae09",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
