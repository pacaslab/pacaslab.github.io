"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { clsx } from "@/lib/clsx";

interface ChromaShiftProps {
  children: React.ReactNode;
  className?: string;
  /** Peak strength of the colour wash (0–1). Keep it low; this is a whisper. */
  intensity?: number;
}

/**
 * The chameleon, applied to photographs. A warm bordeaux→velluto veil crosses
 * the image as it travels the viewport: the picture warms, then releases,
 * shifting its chromatic dominance without ever looking filtered. A plain
 * translucent overlay (no mix-blend) so it stays cheap and consistent across
 * browsers. Parent of the image, which should clip (overflow-hidden).
 */
export function ChromaShift({ children, className, intensity = 0.4 }: ChromaShiftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, intensity, intensity * 0.25]);

  return (
    <div ref={ref} className={clsx("relative", className)}>
      {children}
      <motion.div
        aria-hidden
        style={reduce ? { opacity: 0 } : { opacity }}
        className="pointer-events-none absolute inset-0 z-[2]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(125deg, rgba(144,24,24,0.85) 0%, rgba(49,12,17,0.55) 48%, rgba(20,17,15,0.0) 82%)",
          }}
        />
      </motion.div>
    </div>
  );
}
