import { CHAMELEON_SHAPES } from "@/lib/chameleon-shape";

/**
 * The chameleon as inline SVG, traced from the original artwork
 * (lib/chameleon-shape.ts). currentColor fill, so the mark adapts to any
 * section — the brand concept in miniature.
 */
function ringToPath(ring: [number, number][]): string {
  // The traced points are y-up (three.js convention); SVG is y-down.
  // Closed Catmull-Rom -> cubic bezier smoothing hides the decimated polygon
  // edges of the trace, which would show as facets at display sizes.
  const n = ring.length;
  const pt = (i: number) => ring[((i % n) + n) % n];
  const fmt = (x: number, y: number) => `${x.toFixed(3)},${(-y).toFixed(3)}`;
  let d = `M${fmt(pt(0)[0], pt(0)[1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pt(i - 1);
    const p1 = pt(i);
    const p2 = pt(i + 1);
    const p3 = pt(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${fmt(c1x, c1y)} ${fmt(c2x, c2y)} ${fmt(p2[0], p2[1])}`;
  }
  return d + "Z";
}

export const CHAMELEON_PATH = CHAMELEON_SHAPES.map((shape) =>
  [shape.outline, ...shape.holes].map(ringToPath).join(""),
).join("");

/** Outline only — used for the scroll-drawn stroke version. */
export const CHAMELEON_OUTLINE_PATH = ringToPath(CHAMELEON_SHAPES[0].outline);

export const CHAMELEON_VIEWBOX = "-1.02 -0.84 2.04 1.68";

interface ChameleonMarkProps {
  className?: string;
  /** Accessible name; omit for decorative use. */
  title?: string;
}

export function ChameleonMark({ className, title }: ChameleonMarkProps) {
  return (
    <svg
      viewBox={CHAMELEON_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={CHAMELEON_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
