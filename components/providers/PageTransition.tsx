"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChameleonMark } from "@/components/ui/ChameleonMark";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/** next.config has trailingSlash: true — normalize before comparing routes. */
function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * Velvet-curtain route transitions — the digital echo of the campaign video.
 * The curtain only exists in the DOM while a transition runs: it sweeps up to
 * cover the page (the white chameleon flashes), the new route mounts and the
 * scroll resets underneath, then it exits upwards on unmount.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [covering, setCovering] = useState(false);
  const target = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (covering || normalizePath(href) === normalizePath(pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      target.current = href;
      setCovering(true);
    },
    [covering, pathname, router],
  );

  // The new route has mounted under the closed curtain: jump to the top
  // (hidden from view), hold a beat, then let the curtain exit. Lenis owns
  // the scroll position when active, so the jump must go through it or it
  // gets animated back.
  useEffect(() => {
    if (!covering || !target.current) return;
    if (normalizePath(target.current) !== normalizePath(pathname)) return;
    target.current = null;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    const hold = window.setTimeout(() => setCovering(false), 160);
    return () => window.clearTimeout(hold);
  }, [covering, pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}

      <AnimatePresence>
        {covering && (
          <motion.div
            key="curtain"
            aria-hidden
            initial={{ y: "102%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-102%" }}
            transition={{ duration: 0.55, ease: CURTAIN_EASE }}
            onAnimationComplete={(definition) => {
              // Fires for both animate and exit; only push when fully covered.
              if (
                typeof definition === "object" &&
                definition !== null &&
                (definition as { y?: string }).y === "0%" &&
                target.current
              ) {
                router.push(target.current);
              }
            }}
            className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-velluto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
              className="w-20 text-paper md:w-24"
            >
              <ChameleonMark className="h-auto w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
