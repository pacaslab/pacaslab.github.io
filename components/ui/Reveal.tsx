"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
 * Scroll-reveal wrapper. Subtle fade + rise, fires once when the element
 * enters the viewport. Collapses to a plain fade when the user prefers
 * reduced motion.
 */
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  // Memoized so the motion component identity is stable across renders.
  const MotionTag = useMemo(() => motion.create(as), [as]);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
