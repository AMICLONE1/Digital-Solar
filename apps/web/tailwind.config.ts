import type { Config } from "tailwindcss";
import { designSystem } from "./lib/design-system";

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
        // Core palette from design system
        forest: designSystem.colors.forest,
        gold: designSystem.colors.gold,
        charcoal: designSystem.colors.charcoal,
        offwhite: designSystem.colors.offwhite,
        // Semantic colors
        success: designSystem.colors.success,
        error: designSystem.colors.error,
        warning: designSystem.colors.warning,
        info: designSystem.colors.info,
      },
      fontFamily: {
        heading: designSystem.typography.fonts.heading,
        body: designSystem.typography.fonts.body,
        mono: designSystem.typography.fonts.mono,
        display: ["DM Serif Display", "serif"],
      },
      fontSize: designSystem.typography.sizes,
      fontWeight: designSystem.typography.weights,
      lineHeight: designSystem.typography.lineHeights,
      spacing: designSystem.spacing,
      borderRadius: designSystem.borderRadius,
      boxShadow: designSystem.shadows,
      screens: designSystem.breakpoints,
      zIndex: designSystem.zIndex,
      transitionDuration: designSystem.animations.durations,
      transitionTimingFunction: designSystem.animations.easings,
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "shimmer": "shimmer 3s infinite",
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
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

