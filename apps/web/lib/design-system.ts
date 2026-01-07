/**
 * PowerNetPro Design System
 * Centralized design tokens and utilities
 * Version: 1.0
 */

// Color Palette - Primary Colors
export const colors = {
  // Brand Colors
  forest: {
    DEFAULT: "#1B5E20",
    light: "#2E7D32",
    dark: "#0D3E11",
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#1B5E20", // DEFAULT
    600: "#2E7D32",
    700: "#388E3C",
    800: "#0D3E11",
    900: "#1B5E20",
  },
  gold: {
    DEFAULT: "#D4AF37",
    light: "#E8D5A3",
    dark: "#B8941F",
    50: "#FDF8E8",
    100: "#FAF0D1",
    200: "#F5E1A3",
    300: "#F0D275",
    400: "#D4AF37", // DEFAULT
    500: "#B8941F",
    600: "#9A7A17",
    700: "#7C600F",
    800: "#5E4607",
    900: "#402C00",
  },
  charcoal: {
    DEFAULT: "#1A1A1A",
    light: "#4A4A4A",
    dark: "#0A0A0A",
    50: "#F5F5F5",
    100: "#E0E0E0",
    200: "#BDBDBD",
    300: "#9E9E9E",
    400: "#757575",
    500: "#616161",
    600: "#424242",
    700: "#2C2C2C",
    800: "#1A1A1A", // DEFAULT
    900: "#0A0A0A",
  },
  offwhite: {
    DEFAULT: "#F5F5F5",
    light: "#FFFFFF",
    dark: "#E0E0E0",
  },
  // Semantic Colors
  success: {
    DEFAULT: "#10B981",
    light: "#34D399",
    dark: "#059669",
  },
  error: {
    DEFAULT: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
  },
  warning: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
  },
  info: {
    DEFAULT: "#3B82F6",
    light: "#60A5FA",
    dark: "#2563EB",
  },
} as const;

// Typography
export const typography = {
  fonts: {
    heading: ["Playfair Display", "DM Serif Display", "serif"],
    body: ["Inter", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  },
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
} as const;

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
} as const;

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Animation Durations
export const animations = {
  durations: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easings: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Design System Utilities
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex,
} as const;

// Type exports
export type ColorPalette = typeof colors;
export type TypographyConfig = typeof typography;
export type SpacingScale = typeof spacing;

