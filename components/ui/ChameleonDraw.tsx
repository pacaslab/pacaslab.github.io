"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CHAMELEON_OUTLINE_PATH, CHAMELEON_VIEWBOX } from "@/components/ui/ChameleonMark";

/**
 * The chameleon outline drawn by the scroll position — a single continuous
 * stroke, like the tote bag print. Wrap it in a tall-enough section so the
 * drawing has room to complete.
 */
export function ChameleonDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.35"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const pathLength = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <div ref={ref} className={className}>
      <svg viewBox={CHAMELEON_VIEWBOX} className="h-auto w-full" aria-hidden focusable="false">
        <motion.path
          d={CHAMELEON_OUTLINE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.014}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={reduce ? undefined : { pathLength }}
        />
      </svg>
    </div>
  );
}
