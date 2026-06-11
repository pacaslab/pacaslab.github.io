import type { Config } from "tailwindcss";

/**
 * Paca's Lab design system.
 * Tokens are derived directly from the brand assets and the campaign video:
 *  - bordeaux  -> the chameleon print red (#901818)
 *  - velluto   -> the velvet curtains of the campaign video (hero, transitions)
 *  - ink       -> warm near-black
 *  - paper     -> warm off-white editorial canvas
 *  - sand      -> the natural canvas of the tote bag / bucket hat
 * One typeface only — Neue Haas Grotesk Display — with extreme weight contrast
 * (XXThin 100 ... Black 900) doing the expressive work.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
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
        velluto: {
          DEFAULT: "#310C11",
          deep: "#1E0709",
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
        sans: [
          "var(--font-haas)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "ui-sans-serif",
          "sans-serif",
        ],
        display: [
          "var(--font-haas)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      letterSpacing: {
        label: "0.22em",
        tightest: "-0.03em",
      },
      fontSize: {
        // Fluid display scale — architectural at the top, editorial below.
        "display-2xl": ["clamp(4.25rem, 16vw, 15rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3.25rem, 10vw, 9.5rem)", { lineHeight: "0.9", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.5rem, 6.8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.9rem, 4vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        lead: ["clamp(1.2rem, 2vw, 1.6rem)", { lineHeight: "1.35" }],
      },
      maxWidth: {
        prose: "62ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        curtain: "cubic-bezier(0.76, 0, 0.24, 1)",
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
