"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Ambient } from "@/components/providers/Ambient";
import { Lines } from "@/components/ui/Lines";
import { Magnetic } from "@/components/ui/Magnetic";
import { TransitionLink } from "@/components/ui/TransitionLink";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen campaign hero. The backstage video (velvet curtains, 9:16) runs
 * as a silent loop under a velvet grade + film grain — the "premium GIF".
 * Type drifts a few px after the cursor; scrolling away scales the footage and
 * fades the copy for a cinematic exit.
 */
export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  const mx = useSpring(0, { stiffness: 50, damping: 16 });
  const my = useSpring(0, { stiffness: 50, damping: 16 });

  return (
    <Ambient theme="velluto" as="section" aria-label={`${dict.line1} ${dict.line2}`}>
      <div
        ref={frameRef}
        onPointerMove={(event) => {
          if (reduce || event.pointerType !== "mouse") return;
          const { innerWidth, innerHeight } = window;
          mx.set((event.clientX / innerWidth - 0.5) * 16);
          my.set((event.clientY / innerHeight - 0.5) * 10);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-velluto text-paper"
      >
        <motion.div
          initial={reduce ? false : { scale: 1.08, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.7, ease: EASE }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div style={reduce ? undefined : { scale: videoScale, y: videoY }} className="h-full w-full">
            {reduce ? (
              <img src="/assets/video/hero-poster.webp" alt="" aria-hidden className="h-full w-full object-cover" />
            ) : (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/assets/video/hero-poster.webp"
                aria-hidden
              >
                <source src="/assets/video/hero.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>
        </motion.div>

        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-velluto/25 to-velluto-deep/60" />
        <div
          aria-hidden
          className="absolute inset-0 [background:radial-gradient(110%_85%_at_50%_42%,transparent_42%,rgba(30,7,9,0.55)_100%)]"
        />

        <motion.div
          style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
          className="container relative z-10 pb-24 md:pb-28"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            className="label text-paper/70"
          >
            {dict.eyebrow}
          </motion.p>

          <motion.div style={reduce ? undefined : { x: mx, y: my }}>
            <Lines
              as="h1"
              immediate
              delay={0.55}
              stagger={0.13}
              className="mt-6 text-display-xl font-black uppercase"
              lines={[
                dict.line1,
                <span key="adapt">
                  {dict.line2}
                  <span className="text-bordeaux-soft">.</span>
                </span>,
              ]}
            />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
            className="mt-8 max-w-md text-pretty text-base leading-relaxed text-paper/75 md:text-lg"
          >
            {dict.lead}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Magnetic>
              <TransitionLink
                href="/collezione"
                className="inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-bordeaux hover:text-paper"
              >
                {dict.ctaPrimary}
              </TransitionLink>
            </Magnetic>
            <TransitionLink
              href="/manifesto"
              className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.16em] text-paper/80"
            >
              {dict.ctaSecondary}
            </TransitionLink>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-12 right-6 z-10 hidden flex-col items-center gap-3 md:flex lg:right-12"
        >
          <span className="rotate-90 text-[0.6rem] uppercase tracking-[0.3em] text-paper/55">{dict.scroll}</span>
          <span className="relative mt-4 h-12 w-px overflow-hidden bg-paper/20">
            <motion.span
              animate={reduce ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1/2 bg-paper/80"
            />
          </span>
        </motion.div>
      </div>
    </Ambient>
  );
}
