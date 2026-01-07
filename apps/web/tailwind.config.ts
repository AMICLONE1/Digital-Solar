import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette from TRD
        forest: {
          DEFAULT: "#1B5E20", // Deep Forest Green
          light: "#2E7D32",
          dark: "#0D3E11",
        },
        offwhite: {
          DEFAULT: "#FAF9F6", // Warm Off-White
          light: "#FFFFFF",
          dark: "#F5F3F0",
        },
        gold: {
          DEFAULT: "#D4AF37", // Muted Gold Accent
          light: "#E8D5A3",
          dark: "#B8941F",
        },
        charcoal: {
          DEFAULT: "#2C2C2C", // Soft Charcoal
          light: "#4A4A4A",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        display: ["DM Serif Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

