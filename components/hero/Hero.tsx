"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import type { Tilt } from "./Chameleon";

// three.js stays out of the server bundle and off the critical path.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Hero — warm paper background, in two stacked bands:
 *   · upper band  → the floating bordeaux 3D chameleon (reacts to pointer / gyro)
 *   · lower band  → the PACA'S wordmark + statement + CTA, on clean paper background
 * Keeping them apart guarantees the bordeaux wordmark always sits on paper
 * (never on the red of the chameleon), so it stays the legible focal point.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const tilt = useRef<Tilt>({ x: 0, y: 0 });

  // 'pending' until WebGL is probed on the client — avoids a fallback flash.
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");

  useEffect(() => {
    setMode(!reduce && hasWebGL() ? "3d" : "static");
  }, [reduce]);

  // Feed pointer + device orientation into the tilt ref (no re-renders).
  useEffect(() => {
    if (mode !== "3d") return;

    const onPointer = (e: PointerEvent) => {
      tilt.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilt.current.x = Math.max(-1, Math.min(1, e.gamma / 28));
      tilt.current.y = Math.max(-1, Math.min(1, (e.beta - 48) / 28));
    };
    // iOS only delivers orientation after an explicit grant; ask quietly on
    // the first touch (inside the gesture) and fall back to touch parallax.
    const onFirstTouch = () => {
      const DOE = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (DOE && typeof DOE.requestPermission === "function") {
        DOE.requestPermission()
          .then((r) => {
            if (r === "granted") window.addEventListener("deviceorientation", onOrient);
          })
          .catch(() => {});
      }
      window.removeEventListener("touchstart", onFirstTouch);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onOrient);
    window.addEventListener("touchstart", onFirstTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("touchstart", onFirstTouch);
    };
  }, [mode]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
  };

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-paper text-ink">
      {/* Soft bordeaux gradient — depth without breaking the paper minimalism */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(54%_42%_at_50%_34%,rgba(144,24,24,0.10),transparent_72%)]"
      />

      {/* Upper band — the 3D chameleon lives only here */}
      <div className="relative flex-1">
        {/* Faint grounding shadow under the float */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[62%] h-16 w-[38%] max-w-md -translate-x-1/2 rounded-[50%] bg-bordeaux/10 blur-3xl"
        />

        {mode === "3d" && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <HeroCanvas tilt={tilt} isMobile={isMobile} />
          </div>
        )}
        {mode === "static" && (
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Logo mark="chameleon" variant="bordeaux" priority className="w-[min(54vw,300px)]" />
          </div>
        )}
      </div>

      {/* Lower band — wordmark + statement + CTA, always on clean paper */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-6 pb-[8vh] text-center"
      >
        <motion.p variants={item} className="label mb-6 text-clay">
          Camaleonte — {site.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center">
          <Logo
            mark="wordmark"
            variant="bordeaux"
            priority
            className="h-auto w-[min(80vw,540px)]"
          />
          <span className="sr-only">{site.name}</span>

          <p className="mt-7 max-w-md text-balance font-display text-xl italic text-ink-soft md:text-2xl">
            Costruito per adattarsi.
          </p>
          <p className="mt-3 text-[0.7rem] uppercase tracking-label text-clay">
            Abbigliamento contemporaneo · {site.origin}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#collezione"
              className="group inline-flex items-center gap-2 rounded-full bg-bordeaux px-8 py-3.5 text-sm font-medium text-paper transition-colors duration-300 ease-editorial hover:bg-bordeaux-deep"
            >
              Scopri la collezione
              <span className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#manifesto"
              className="rounded-full border border-ink/20 px-8 py-3.5 text-sm text-ink transition-colors duration-300 ease-editorial hover:border-ink/50"
            >
              Il manifesto
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
