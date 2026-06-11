import { clsx } from "@/lib/clsx";

interface TickerProps {
  items: string[];
  className?: string;
  speed?: "default" | "slow";
}

/**
 * Infinite horizontal marquee. Decorative by design (aria-hidden); two
 * identical tracks translate -50% for a seamless loop. The global
 * reduced-motion rule freezes it gracefully.
 */
export function Ticker({ items, className, speed = "default" }: TickerProps) {
  // Ensure we have enough items to fill the viewport width on large screens.
  // We repeat the array of items until we have at least 12 items.
  let repeatedItems = [...items];
  if (items.length > 0) {
    while (repeatedItems.length < 12) {
      repeatedItems = [...repeatedItems, ...items];
    }
  }

  const Sequence = () => (
    <div className="flex shrink-0 items-center">
      {repeatedItems.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-[clamp(1.1rem,2.4vw,1.7rem)] font-thin uppercase tracking-[0.1em] leading-none">
            {item}
          </span>
          <span className="text-[0.55em] text-bordeaux-soft" aria-hidden>
            &#9670;
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className={clsx(
        "no-scrollbar flex w-full select-none overflow-hidden whitespace-nowrap",
        className,
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
