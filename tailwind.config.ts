import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "ui-sans-serif", "system-ui"],
        body: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui"],
        persian: ["IRANYekanX", "ui-sans-serif", "system-ui"]
      },
      colors: {
        midnight: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1f1b4d"
        }
      },
      boxShadow: {
        glow: "0 0 24px rgba(99, 102, 241, 0.35)"
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
