import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        "hero": ["clamp(3.5rem, 15vw, 12rem)", { lineHeight: "0.85", letterSpacing: "-0.04em", fontWeight: "900" }],
        "display": ["clamp(2.5rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.03em", fontWeight: "800" }],
        "heading-xl": ["clamp(2rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading": ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" }],
        "subheading": ["clamp(1.25rem, 3vw, 2.25rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body-lg": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.6", fontWeight: "300" }],
        "body": ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.7", fontWeight: "300" }],
      },
      spacing: {
        "section": "clamp(6rem, 20vh, 12rem)",
        "section-sm": "clamp(4rem, 12vh, 8rem)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "grain": "grain 8s steps(10) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(60px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-60px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
