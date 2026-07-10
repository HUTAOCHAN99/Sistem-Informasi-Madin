import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        madin: {
          navy: "#132A3A",     // sidebar / header dasar
          navySoft: "#1B3A4F",
          orange: "#F7941D",   // aksen utama (dari tema Eduka)
          orangeDark: "#DC7F0F",
          teal: "#1F6F5C",     // aksen hijau madrasah
          cream: "#F7F7F5",    // background halaman
          line: "#E7E7E2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
