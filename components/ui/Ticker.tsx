import { clsx } from "@/lib/clsx";

interface TickerProps {
  items: string[];
  className?: string;
  speed?: "default" | "slow";
}

/**
 * Infinite horizontal marquee. Decorative by design (aria-hidden); two identical
 * tracks translate -50% for a seamless loop. The global reduced-motion rule
 * freezes it gracefully.
 */
export function Ticker({ items, className, speed = "default" }: TickerProps) {
  const Sequence = () => (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-[clamp(1.4rem,3vw,2.1rem)] font-light italic leading-none">
            {item}
          </span>
          <span className="text-bordeaux/80" aria-hidden>
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
      </div>
    </div>
  );
}
