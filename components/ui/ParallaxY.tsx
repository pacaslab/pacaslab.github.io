"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxYProps {
  children: React.ReactNode;
  /** Total vertical travel in px while the element crosses the viewport. */
  amount?: number;
  className?: string;
}

/** Slow vertical drift while scrolling past — editorial parallax. */
export function ParallaxY({ children, amount = 40, className }: ParallaxYProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
