"use client";

import { useEffect, useRef } from "react";

/**
 * "Built to adapt", literally: sections wrapped in <Ambient> tint the whole
 * page canvas (--bg / --fg on :root) when they cross the centre of the
 * viewport, like a chameleon's skin. The actual colour transition lives on
 * <body> in globals.css.
 */
const THEMES = {
  paper: { bg: "#F5F1EA", fg: "#14110F" },
  sand: { bg: "#D8CBB4", fg: "#14110F" },
  ink: { bg: "#14110F", fg: "#F5F1EA" },
  velluto: { bg: "#310C11", fg: "#F5F1EA" },
  bordeaux: { bg: "#901818", fg: "#F5F1EA" },
} as const;

export type AmbientTheme = keyof typeof THEMES;

interface AmbientProps extends React.HTMLAttributes<HTMLElement> {
  theme: AmbientTheme;
  as?: "section" | "div" | "header" | "footer";
  children: React.ReactNode;
}

export function Ambient({ theme, as: Tag = "section", children, ...rest }: AmbientProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { bg, fg } = THEMES[theme];
            const root = document.documentElement;
            root.style.setProperty("--bg", bg);
            root.style.setProperty("--fg", fg);
          }
        }
      },
      // A narrow band around the viewport centre decides the active theme.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [theme]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} {...rest}>
      {children}
    </Tag>
  );
}
