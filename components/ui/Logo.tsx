/* eslint-disable @next/next/no-img-element */
import { clsx } from "@/lib/clsx";

type Mark = "wordmark" | "chameleon" | "bta";
type Variant = "black" | "white" | "bordeaux";

/** Intrinsic dimensions of each optimized mark — prevents layout shift. */
const DIMENSIONS: Record<Mark, { w: number; h: number; label: string }> = {
  wordmark: { w: 509, h: 120, label: "Paca's Lab" },
  chameleon: { w: 872, h: 710, label: "Camaleonte — Paca's Lab" },
  bta: { w: 887, h: 139, label: "Built to adapt" },
};

interface LogoProps {
  mark: Mark;
  variant?: Variant;
  className?: string;
  /** Purely decorative (alt=""), e.g. background marks. */
  decorative?: boolean;
  /** Eager-load + high priority for above-the-fold marks. */
  priority?: boolean;
}

/**
 * Renders an optimized brand mark (WebP). Plain <img> on purpose: the marks are
 * tiny, vector-flat assets and this keeps them usable in server components
 * without next/image's sizing constraints.
 */
export function Logo({ mark, variant = "black", className, decorative, priority }: LogoProps) {
  const { w, h, label } = DIMENSIONS[mark];
  return (
    <img
      src={`/assets/logos/${mark}-${variant}.webp`}
      width={w}
      height={h}
      alt={decorative ? "" : label}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      draggable={false}
      className={clsx("select-none", className)}
    />
  );
}
