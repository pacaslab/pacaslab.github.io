import type { Dictionary } from "@/lib/i18n";
import { Ambient } from "@/components/providers/Ambient";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Drenched bordeaux panel — the manifesto speaking in its own voice before
 * you reach the page. Quote on the left, an elaboration on the right, so the
 * colour field carries weight instead of empty space.
 */
export function ManifestoTeaser({ dict }: { dict: Dictionary["manifestoTeaser"] }) {
  return (
    <Ambient theme="bordeaux" as="section" className="grain relative overflow-hidden bg-bordeaux text-paper">
      <ChameleonMark className="pointer-events-none absolute -left-24 top-1/2 w-[48%] max-w-2xl -translate-y-1/2 text-paper opacity-[0.06]" />

      <div className="container relative z-10 grid items-center gap-12 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label text-paper/70">{dict.eyebrow}</p>
          </Reveal>
          <Lines
            as="blockquote"
            delay={0.1}
            className="mt-8 text-display-lg font-thin tracking-tightest"
            lines={[dict.quote1, dict.quote2, dict.quote3]}
          />
          <Reveal delay={0.25}>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-paper/65">{dict.attribution}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="md:col-span-4 md:col-start-9">
          <p className="border-t border-paper/25 pt-6 text-pretty text-lg leading-relaxed text-paper/85">
            {dict.body}
          </p>
          <TransitionLink
            href="/manifesto"
            className="link-underline mt-8 inline-block text-[0.78rem] font-medium uppercase tracking-[0.18em] text-paper/90"
          >
            {dict.link}&nbsp;&#8594;
          </TransitionLink>
        </Reveal>
      </div>
    </Ambient>
  );
}
