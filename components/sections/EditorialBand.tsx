"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Ambient } from "@/components/providers/Ambient";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollTint } from "@/components/ui/ScrollTint";

/**
 * Full-bleed campaign image (the PACA'S package, warm light) with the headline
 * laid straight over it. The photo drifts on a parallax while a velvet grade
 * keeps the type legible; "Made in Italy" shifts tone as it scrolls past —
 * the chameleon, working on the words themselves.
 */
export function EditorialBand({ dict }: { dict: Dictionary["editorial"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  return (
    <Ambient theme="ink">
      <section
        ref={ref}
        className="grain relative flex min-h-[92svh] items-end overflow-hidden bg-velluto-deep text-paper"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div style={reduce ? undefined : { y: imgY, scale: imgScale }} className="absolute inset-0">
            <Image
              src={media.packageDetail.src}
              alt={dict.statement}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-velluto/35 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-velluto-deep/70 via-transparent to-transparent" />

        <div className="container relative z-10 grid items-end gap-x-8 gap-y-10 pb-16 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-8">
            <Reveal>
              <p className="label text-paper/65">{dict.eyebrow}</p>
            </Reveal>
            <ScrollTint as="div" from="#F5F1EA" to="#C84A3A">
              <Lines
                as="h2"
                className="mt-5 text-display-2xl font-black uppercase leading-[0.82]"
                lines={[dict.over1, dict.over2]}
              />
            </ScrollTint>
          </div>
          <Reveal delay={0.1} className="md:col-span-4 md:pb-2">
            <p className="max-w-sm text-pretty leading-relaxed text-paper/75">{dict.statement}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-paper/45">{dict.tag}</p>
          </Reveal>

          {/* Spec strip fills the lower band */}
          <Reveal delay={0.18} className="md:col-span-12">
            <dl className="grid grid-cols-3 gap-x-6 gap-y-2 border-t border-paper/20 pt-6">
              {dict.specs.map((s) => (
                <div key={s.k}>
                  <dt className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/45">{s.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-paper/90 md:text-base">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </Ambient>
  );
}
