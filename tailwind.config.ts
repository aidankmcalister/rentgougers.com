import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

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
              DEFAULT: "#e63946",
              100: "#ffb3b3",
              200: "#ff9999",
              300: "#ff6666",
              400: "#ff4d4d",
              500: "#e63946",
              600: "#e63946",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
