"use client";

import { useEffect } from "react";
import { ChameleonMark } from "@/components/ui/ChameleonMark";

/**
 * Locale gateway. The static root picks a language from the browser and
 * replaces itself with /it/ or /en/. A noscript fallback keeps it crawlable.
 */
export default function RootRedirect() {
  useEffect(() => {
    const prefersEn = /^en\b/i.test(navigator.language || "");
    window.location.replace(prefersEn ? "/en/" : "/it/");
  }, []);

  return (
    <div className="grain flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-velluto text-paper">
      <ChameleonMark className="w-16 animate-pulse" />
      <noscript>
        <p className="text-sm uppercase tracking-[0.18em]">
          <a className="underline" href="/it/">Italiano</a> · <a className="underline" href="/en/">English</a>
        </p>
      </noscript>
    </div>
  );
}
