"use client";

import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import { highlight } from "@/lib/i18n/highlight";
import { Ambient } from "@/components/providers/Ambient";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { ChromaShift } from "@/components/ui/ChromaShift";
import { Lines } from "@/components/ui/Lines";
import { MetaList } from "@/components/ui/MetaList";
import { ParallaxY } from "@/components/ui/ParallaxY";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Brand statement on paper. A giant headline runs wide; a backstage portrait
 * climbs into it from the right, overlapping the type. The lower band fills
 * the gutters with atelier metadata, a pull-quote and the running copy.
 */
export function BrandIntro({ dict }: { dict: Dictionary["intro"] }) {
  return (
    <Ambient theme="paper">
      <div className="relative overflow-hidden py-28 md:py-40">
        <ParallaxY amount={50} className="pointer-events-none absolute -left-[12%] top-[8%] w-[52%]">
          <ChameleonMark className="h-auto w-full opacity-[0.04]" />
        </ParallaxY>

        <div className="container relative z-10">
          <Reveal>
            <p className="label">{dict.eyebrow}</p>
          </Reveal>

          <div className="mt-8 grid items-start gap-x-8 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <Lines
                as="h2"
                className="text-balance text-display-lg font-thin leading-[0.92] tracking-tightest md:text-display-xl"
                lines={[
                  dict.titleA,
                  highlight(dict.titleB, dict.emphasis, "font-normal italic text-bordeaux"),
                ]}
              />
            </div>

            {/* Portrait overlapping up into the headline */}
            <Reveal delay={0.12} className="md:col-span-4 md:-mt-28 md:pl-6">
              <ParallaxY amount={42}>
                <figure className="grain ml-auto w-2/3 md:w-full">
                  <ChromaShift className="overflow-hidden rounded-[3px] bg-velluto" intensity={0.5}>
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={media.backstage1.src}
                        alt={dict.caption}
                        fill
                        sizes="(min-width: 768px) 30vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  </ChromaShift>
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] opacity-50">
                    {dict.caption}
                  </figcaption>
                </figure>
              </ParallaxY>
            </Reveal>

            {/* Left gutter: metadata + pull-quote */}
            <Reveal delay={0.16} className="md:col-span-3 md:mt-2">
              <MetaList rows={dict.facts} />
              <p className="mt-8 text-pretty text-xl font-thin italic leading-snug text-bordeaux">
                {dict.pullquote}
              </p>
            </Reveal>

            {/* Running copy */}
            <Reveal delay={0.2} className="md:col-span-5 md:col-start-4">
              <div className="space-y-6 text-pretty text-lg leading-relaxed opacity-75">
                <p>{dict.body}</p>
                <p>{dict.body2}</p>
              </div>
              <TransitionLink
                href="/manifesto"
                className="link-underline mt-8 inline-block text-[0.78rem] font-medium uppercase tracking-[0.18em]"
              >
                {dict.link}&nbsp;&#8594;
              </TransitionLink>
            </Reveal>
          </div>
        </div>
      </div>
    </Ambient>
  );
}
