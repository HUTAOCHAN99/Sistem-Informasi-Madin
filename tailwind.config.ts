import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        madin: {
          navy: "#092A0E",     // sidebar / header dasar
          navySoft: "#0F4117",
          orange: "#FFD700",   // aksen utama (dari tema Eduka)
          orangeDark: "#FFD700",
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
