"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger helper — seconds of delay before this element animates in. */
  delay?: number;
  /** Travel distance in px (vertical). */
  y?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "span"). Defaults to div. */
  as?: ElementType;
}

/**
 * Scroll-reveal wrapper: a soft clip wipe plus a short rise, fired once when
 * the element enters the viewport. Collapses to a plain fade under reduced
 * motion.
 */
export function Reveal({ children, delay = 0, y = 26, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  // Memoized so the motion component identity is stable across renders.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, clipPath: "inset(6% 0% 24% 0%)" }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
      }
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
