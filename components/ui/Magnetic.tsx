"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { clsx } from "@/lib/clsx";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element follows the cursor (0–1). */
  strength?: number;
}

/** Cursor-magnetic wrapper for CTAs. Mouse only; inert on touch. */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.5 });
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.5 });

  if (reduce) {
    return <div className={clsx("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={clsx("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
