"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LinesProps {
  /** One node per visual line; line breaks are deliberate, editorial. */
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div" | "blockquote" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll (hero usage). */
  immediate?: boolean;
}

/**
 * Headline choreography: each line rises out of its own clipping mask,
 * staggered — the signature entrance of the redesign.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: LinesProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={clsx("block will-change-transform")}
            initial={{ y: "115%" }}
            {...(immediate
              ? { animate: { y: "0%" } }
              : {
                  whileInView: { y: "0%" },
                  viewport: { once: true, margin: "-8% 0px" },
                })}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
