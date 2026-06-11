"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { usePageTransition } from "@/components/providers/PageTransition";
import { clsx } from "@/lib/clsx";

interface LanguageSwitcherProps {
  labels: { it: string; en: string; label: string };
  className?: string;
}

/**
 * IT / EN toggle. Switching language navigates to the same page in the other
 * locale, through the velvet-curtain transition, so it feels like a deliberate
 * change of skin rather than a reload.
 */
export function LanguageSwitcher({ labels, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const current = useLocale();
  const navigate = usePageTransition();

  const swapTo = (target: string) => {
    if (target === current) return;
    const parts = pathname.split("/");
    parts[1] = target; // ["", "it", "manifesto", ...] -> swap locale segment
    navigate(parts.join("/") || `/${target}`);
  };

  return (
    <div
      role="group"
      aria-label={labels.label}
      className={clsx("flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]", className)}
    >
      {locales.map((loc, i) => (
        <Fragment key={loc}>
          <button
            type="button"
            onClick={() => swapTo(loc)}
            aria-current={loc === current ? "true" : undefined}
            className={clsx(
              "transition-opacity duration-300",
              loc === current ? "opacity-100" : "opacity-45 hover:opacity-90",
            )}
          >
            {labels[loc]}
          </button>
          {i === 0 && <span aria-hidden className="opacity-30">/</span>}
        </Fragment>
      ))}
    </div>
  );
}
