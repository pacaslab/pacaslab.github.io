"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ElementType } from "react";

interface ScrollTintProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  /** Resting colour. Defaults to the section's own --fg. */
  from?: string;
  /** Colour it leans toward at mid-scroll. */
  to?: string;
}

/**
 * Type that shifts tone as it scrolls past, the way light moves over a
 * chameleon: the colour eases from `from` into `to` and back. Refined by
 * default (bordeaux peak), never a rainbow.
 */
export function ScrollTint({
  children,
  className,
  as = "span",
  from = "var(--fg)",
  to = "#901818",
}: ScrollTintProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const color = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag ref={ref} style={reduce ? undefined : { color }} className={className}>
      {children}
    </MotionTag>
  );
}
