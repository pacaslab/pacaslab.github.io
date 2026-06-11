"use client";

import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Ambient } from "@/components/providers/Ambient";
import { ChromaShift } from "@/components/ui/ChromaShift";
import { Lines } from "@/components/ui/Lines";
import { ParallaxY } from "@/components/ui/ParallaxY";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A diptych: two offset portraits with an oversized quote slung across the
 * gutter between them. A heading row opens the spread and a two-column
 * caption/credit closes it, so the negative space reads as composed, not empty.
 */
export function Diptych({ dict }: { dict: Dictionary["diptych"] }) {
  return (
    <Ambient theme="paper">
      <div className="container py-24 md:py-36">
        {/* Opening row */}
        <div className="mb-12 grid items-baseline gap-6 md:mb-16 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label">{dict.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-4">
            <p className="text-pretty text-lg leading-relaxed opacity-75">{dict.lead}</p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <figure className="md:pr-8">
              <ParallaxY amount={28}>
                <ChromaShift className="grain overflow-hidden rounded-[3px] bg-velluto" intensity={0.46}>
                  <div className="relative aspect-[3/4] md:aspect-[4/5]">
                    <Image
                      src={media.walk.src}
                      alt={dict.captionLeft}
                      fill
                      sizes="(min-width: 768px) 46vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                </ChromaShift>
              </ParallaxY>
              <figcaption className="mt-3 flex items-baseline gap-2 text-xs uppercase tracking-[0.18em] opacity-50">
                <span className="tnum text-bordeaux">01</span>
                {dict.captionLeft}
              </figcaption>
            </figure>

            <figure className="md:mt-40 md:pl-8">
              <ParallaxY amount={-22}>
                <ChromaShift className="grain overflow-hidden rounded-[3px] bg-velluto" intensity={0.46}>
                  <div className="relative aspect-[3/4] md:aspect-[4/5]">
                    <Image
                      src={media.gap.src}
                      alt={dict.captionRight}
                      fill
                      sizes="(min-width: 768px) 46vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                </ChromaShift>
              </ParallaxY>
              <figcaption className="mt-3 flex items-baseline justify-end gap-2 text-xs uppercase tracking-[0.18em] opacity-50">
                <span className="tnum text-bordeaux">02</span>
                {dict.captionRight}
              </figcaption>
            </figure>
          </div>

          <blockquote className="relative z-20 mx-auto -mt-6 max-w-4xl px-2 text-center md:absolute md:inset-x-0 md:top-[44%] md:-mt-0 md:-translate-y-1/2">
            <Lines
              as="span"
              className="block text-balance text-display-lg font-thin leading-[0.95] tracking-tightest"
              lines={[dict.quote]}
            />
          </blockquote>
        </div>

        {/* Closing row */}
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-3 md:self-end">
            <p className="text-xs uppercase tracking-[0.18em] opacity-45">{dict.eyebrow} · Capsule 01</p>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <p className="text-pretty text-lg leading-relaxed opacity-75">{dict.body}</p>
          </Reveal>
        </div>
      </div>
    </Ambient>
  );
}
