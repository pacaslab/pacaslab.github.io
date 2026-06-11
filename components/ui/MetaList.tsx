import { clsx } from "@/lib/clsx";

/**
 * Editorial key/value list (atelier metadata). Uses currentColor so it adapts
 * to any section background.
 */
export function MetaList({
  rows,
  className,
}: {
  rows: { k: string; v: string }[];
  className?: string;
}) {
  return (
    <dl className={clsx("space-y-3", className)}>
      {rows.map((r) => (
        <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-current/15 pb-2">
          <dt className="text-[0.62rem] font-medium uppercase tracking-[0.18em] opacity-45">{r.k}</dt>
          <dd className="text-sm font-medium">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
