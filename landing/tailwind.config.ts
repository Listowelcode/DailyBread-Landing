import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#164346",
          rust: "#7b241e",
          ink: "#0d1e23",
          surface: "#f1fbff",
          paper: "#ffffff",
        },
      },
      fontFamily: {
        display: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        meta: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        ambient: "0 20px 60px rgba(92, 13, 11, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
