import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#F4A300",
          50: "#FFF8E7",
          100: "#FFEFC0",
          200: "#FFD96B",
          300: "#FFC436",
          400: "#F4A300",
          500: "#D48800",
          600: "#A86900",
          700: "#7D4E00",
          800: "#523300",
          900: "#261900",
        },
        maroon: {
          DEFAULT: "#651F12",
          50: "#FDF0EE",
          100: "#F9D5CF",
          200: "#EEA99E",
          300: "#E07D6E",
          400: "#CB5040",
          500: "#651F12",
          600: "#561A0F",
          700: "#40130B",
          800: "#2B0D08",
          900: "#150604",
        },
        cream: {
          DEFAULT: "#FFF8F1",
          50: "#FFFFFF",
          100: "#FFF8F1",
          200: "#FFEEDD",
          300: "#FFE1C7",
          400: "#FFD0AB",
          500: "#FFBC8A",
        },
        gold: {
          DEFAULT: "#C9962B",
          light: "#E8B84C",
          dark: "#9A7020",
        },
        charcoal: {
          DEFAULT: "#1F1F1F",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#C8C8C8",
          300: "#A0A0A0",
          400: "#707070",
          500: "#505050",
          600: "#383838",
          700: "#2A2A2A",
          800: "#1F1F1F",
          900: "#141414",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(244, 163, 0, 0.25)",
        "glow-lg": "0 0 60px rgba(244, 163, 0, 0.35)",
        "glow-maroon": "0 0 30px rgba(101, 31, 18, 0.4)",
        elevated:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05)",
        "elevated-lg":
          "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
        card: "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "card-hover":
          "0 8px 16px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "saffron-gradient": "linear-gradient(135deg, #F4A300, #C9962B)",
        "maroon-gradient": "linear-gradient(135deg, #651F12, #3D1209)",
        "hero-overlay":
          "linear-gradient(to right, rgba(31,10,5,0.90) 0%, rgba(31,10,5,0.6) 50%, rgba(31,10,5,0.1) 100%)",
        "section-fade":
          "linear-gradient(to bottom, transparent, rgba(255,248,241,0.8))",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(244, 163, 0, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(244, 163, 0, 0.5)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
