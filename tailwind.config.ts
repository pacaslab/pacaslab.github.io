import type { Config } from "tailwindcss";

/**
 * Paca's Lab design system.
 * Tokens are derived directly from the brand assets:
 *  - bordeaux  -> the chameleon print red (#901818)
 *  - ink       -> warm near-black used in the immersive hero
 *  - paper     -> warm off-white editorial canvas
 *  - sand      -> the natural canvas of the tote bag / bucket hat
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Editorial, generous container.
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        bordeaux: {
          DEFAULT: "#901818",
          deep: "#6E1111",
          soft: "#A93B3B",
        },
        ink: {
          DEFAULT: "#14110F",
          soft: "#3A332E",
        },
        paper: {
          DEFAULT: "#F5F1EA",
          dim: "#EAE3D7",
        },
        sand: {
          DEFAULT: "#D8CBB4",
          deep: "#C3B395",
        },
        clay: "#8C7E6A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        label: "0.22em",
        tightest: "-0.03em",
      },
      fontSize: {
        // Fluid editorial display sizes.
        "display-sm": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3.5rem, 12vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        prose: "62ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-2%, 1%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
