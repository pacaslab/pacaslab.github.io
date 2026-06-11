import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Ambient } from "@/components/providers/Ambient";
import { ChameleonDraw } from "@/components/ui/ChameleonDraw";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { ChromaShift } from "@/components/ui/ChromaShift";
import { Lines } from "@/components/ui/Lines";
import { ParallaxY } from "@/components/ui/ParallaxY";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollTint } from "@/components/ui/ScrollTint";
import { TransitionLink } from "@/components/ui/TransitionLink";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);
  return {
    title: dict.meta.manifesto.title,
    description: dict.meta.manifesto.description,
    alternates: { canonical: `/${locale}/manifesto`, languages: { it: "/it/manifesto", en: "/en/manifesto" } },
  };
}

const ANCHORS = ["#capitolo-01", "#capitolo-02", "#capitolo-03", "#capitolo-04"];

/** Small key/value list used to fill columns with editorial metadata. */
function MetaList({ rows, className = "" }: { rows: { k: string; v: string }[]; className?: string }) {
  return (
    <dl className={`space-y-3 ${className}`}>
      {rows.map((r) => (
        <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-current/15 pb-2">
          <dt className="text-[0.62rem] font-medium uppercase tracking-[0.18em] opacity-45">{r.k}</dt>
          <dd className="text-sm font-medium">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function ManifestoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const m = getDictionary(locale).manifesto;

  return (
    <>
      {/* Cover */}
      <Ambient
        theme="velluto"
        className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden pb-16 pt-36 md:pb-20"
      >
        <ChameleonMark className="pointer-events-none absolute -right-[8%] top-[10%] w-[40%] text-paper opacity-[0.05]" />
        <div className="container relative z-10">
          <Reveal>
            <p className="label">{m.cover.eyebrow}</p>
          </Reveal>
          <Lines
            as="h1"
            immediate
            delay={0.2}
            className="mt-6 text-display-2xl font-black uppercase"
            lines={[m.cover.line1, m.cover.line2]}
          />

          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <Reveal delay={0.35} className="md:col-span-6">
              <p className="max-w-prose text-pretty text-lg leading-relaxed text-paper/80">{m.cover.lead}</p>
            </Reveal>
            <Reveal delay={0.45} className="md:col-span-3 md:col-start-10">
              <MetaList rows={m.cover.meta} />
            </Reveal>
          </div>

          <Reveal delay={0.55}>
            <nav
              aria-label={m.cover.eyebrow}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-current/15 pt-6"
            >
              {m.chapters.map((c, i) => (
                <a
                  key={c.n}
                  href={ANCHORS[i]}
                  className="link-underline flex items-baseline gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] opacity-75 hover:opacity-100"
                >
                  <span className="tnum text-bordeaux-soft">{c.n}</span>
                  {c.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </Ambient>

      {/* 00 — Declaration */}
      <Ambient theme="ink" className="relative overflow-hidden py-28 md:py-40">
        <ChameleonMark className="pointer-events-none absolute -bottom-20 right-[2%] w-[34%] text-paper opacity-[0.04]" />
        <div className="container relative z-10 grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="tnum text-sm font-medium text-bordeaux-soft">{m.declaration.index}</span>
                <span className="label">{m.declaration.kicker}</span>
              </div>
            </Reveal>
            <Lines
              as="p"
              delay={0.08}
              className="mt-7 text-display-xl font-thin leading-[0.92] tracking-tightest"
              lines={[
                m.declaration.line1,
                <span key="2" className="opacity-45">{m.declaration.line2}</span>,
                <ScrollTint key="3" as="span" className="block font-black uppercase" from="#F5F1EA" to="#A93B3B">
                  {m.declaration.line3}
                </ScrollTint>,
              ]}
            />
          </div>
          <Reveal delay={0.2} className="md:col-span-4">
            <p className="text-pretty leading-relaxed text-paper/70">{m.declaration.body}</p>
            <dl className="mt-8 space-y-3 border-t border-paper/15 pt-6 text-sm">
              <div className="flex items-baseline gap-3 opacity-55">
                <span aria-hidden className="text-bordeaux-soft">—</span>
                {m.declaration.reject}
              </div>
              <div className="flex items-baseline gap-3 font-medium text-bordeaux-soft">
                <span aria-hidden>+</span>
                {m.declaration.choose}
              </div>
            </dl>
          </Reveal>
        </div>
      </Ambient>

      {/* 01 — Chi siamo */}
      <Ambient theme="paper" id="capitolo-01" className="scroll-mt-24 py-28 md:py-40">
        <div className="container">
          <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
            <Reveal className="md:col-span-3">
              <p className="label">{m.who.eyebrow}</p>
            </Reveal>
            <div className="md:col-span-9">
              <Lines
                as="h2"
                className="text-balance text-display-lg font-thin tracking-tightest"
                lines={[m.who.titleA, m.who.titleB]}
              />
            </div>

            {/* Left gutter: facts + pull quote */}
            <Reveal delay={0.16} className="md:col-span-3 md:mt-4">
              <MetaList rows={m.who.facts} />
              <p className="mt-8 text-pretty text-xl font-thin italic leading-snug text-bordeaux">
                {m.who.pullquote}
              </p>
            </Reveal>

            {/* Body */}
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-4">
              <div className="space-y-6 text-pretty text-lg leading-relaxed opacity-75">
                <p>{m.who.body1}</p>
                <p>{m.who.body2}</p>
                <p>{m.who.body3}</p>
              </div>
            </Reveal>

            {/* Stacked portraits */}
            <div className="md:col-span-3 md:col-start-10 md:-mt-16">
              <Reveal delay={0.18}>
                <ParallaxY amount={34}>
                  <figure className="grain">
                    <ChromaShift className="overflow-hidden rounded-[3px] bg-velluto" intensity={0.48}>
                      <div className="relative aspect-[9/16]">
                        <Image
                          src={media.backstage3.src}
                          alt={m.who.caption}
                          fill
                          sizes="(min-width: 768px) 22vw, 80vw"
                          className="object-cover"
                        />
                      </div>
                    </ChromaShift>
                    <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] opacity-50">
                      {m.who.caption}
                    </figcaption>
                  </figure>
                </ParallaxY>
              </Reveal>
              <Reveal delay={0.26}>
                <ParallaxY amount={-18}>
                  <figure className="grain mt-8 ml-auto w-3/4">
                    <ChromaShift className="overflow-hidden rounded-[3px] bg-velluto" intensity={0.42}>
                      <div className="relative aspect-square">
                        <Image
                          src={media.backstage1.src}
                          alt={m.who.caption2}
                          fill
                          sizes="(min-width: 768px) 16vw, 60vw"
                          className="object-cover"
                        />
                      </div>
                    </ChromaShift>
                    <figcaption className="mt-3 text-right text-xs uppercase tracking-[0.18em] opacity-50">
                      {m.who.caption2}
                    </figcaption>
                  </figure>
                </ParallaxY>
              </Reveal>
            </div>
          </div>
        </div>
      </Ambient>

      {/* 02 — La visione + chameleon drawn by scroll (kept) */}
      <Ambient theme="ink" id="capitolo-02" className="scroll-mt-24 py-32 md:py-48">
        <div className="container grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <p className="label">{m.vision.eyebrow}</p>
            </Reveal>
            <Lines
              as="h2"
              delay={0.08}
              className="mt-8 text-balance text-display-lg font-thin tracking-tightest"
              lines={[m.vision.titleA, m.vision.titleB]}
            />
            <Reveal delay={0.2}>
              <div className="mt-10 max-w-prose space-y-6 text-pretty text-lg leading-relaxed opacity-70">
                <p>{m.vision.body1}</p>
                <p>{m.vision.body2}</p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <ChameleonDraw className="mx-auto w-full max-w-xl text-paper/80" />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-paper/45">{m.vision.tag}</p>
          </div>
        </div>
      </Ambient>

      {/* Credo — drench */}
      <Ambient theme="bordeaux" as="section" className="grain relative overflow-hidden bg-bordeaux py-28 text-paper md:py-40">
        <ChameleonMark className="pointer-events-none absolute -left-[10%] top-1/2 w-[44%] max-w-2xl -translate-y-1/2 text-paper opacity-[0.07]" />
        <div className="container relative z-10 grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label text-paper/70">{m.quote.kicker}</p>
            </Reveal>
            <Lines
              as="blockquote"
              delay={0.08}
              className="mt-6 text-balance text-display-lg font-thin tracking-tightest"
              lines={[m.quote.line1, m.quote.line2]}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-paper/70">
                {m.quote.attribution}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4 md:col-start-9">
            <p className="border-t border-paper/25 pt-6 text-pretty text-lg leading-relaxed text-paper/85">
              {m.quote.body}
            </p>
          </Reveal>
        </div>
      </Ambient>

      {/* 03 — Il camaleonte: words + definitions over a portrait */}
      <Ambient theme="velluto" id="capitolo-03" className="scroll-mt-24 relative overflow-hidden">
        <section className="grain relative flex min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <ChromaShift className="h-full w-full" intensity={0.34}>
              <div className="relative h-full w-full">
                <Image src={media.walk.src} alt={m.meaning.caption} fill sizes="100vw" className="object-cover" />
              </div>
            </ChromaShift>
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-velluto-deep/90 via-velluto/45 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />

          <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center py-28">
            <div className="flex-1" />
            <div>
              <Reveal>
                <p className="label text-paper/65">{m.meaning.eyebrow}</p>
              </Reveal>
              <Lines
                as="h2"
                delay={0.06}
                stagger={0.12}
                className="mt-6 text-display-xl font-black uppercase leading-[0.86] text-paper"
                lines={[
                  m.meaning.word1,
                  <span key="2" className="text-bordeaux-soft">{m.meaning.word2}</span>,
                  m.meaning.word3,
                ]}
              />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-paper/80">{m.meaning.body}</p>
              </Reveal>
            </div>

            {/* Definitions band fills the lower third */}
            <Reveal delay={0.28}>
              <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-paper/20 pt-8 sm:grid-cols-3">
                {m.meaning.defs.map((d, i) => (
                  <div key={d.w} className="flex gap-4">
                    <span className="tnum text-sm font-medium text-bordeaux-soft">{`0${i + 1}`}</span>
                    <div>
                      <dt className="text-base font-medium uppercase tracking-[0.08em] text-paper">{d.w}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-paper/65">{d.d}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </Ambient>

      {/* 04 — I valori */}
      <Ambient theme="paper" id="capitolo-04" className="scroll-mt-24 py-28 md:py-40">
        <div className="container">
          <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
            <Reveal className="md:col-span-3">
              <p className="label">{m.values.eyebrow}</p>
            </Reveal>
            <div className="md:col-span-6">
              <Lines
                as="h2"
                className="text-display-lg font-thin tracking-tightest"
                lines={[m.values.titleA, m.values.titleB]}
              />
            </div>
            <Reveal delay={0.12} className="md:col-span-3 md:col-start-10 md:self-end">
              <p className="text-pretty leading-relaxed opacity-70">{m.values.lead}</p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-current/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
            {m.values.items.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.07} className={i % 2 === 1 ? "lg:mt-12" : undefined}>
                <p className="tnum text-display-sm font-thin text-bordeaux">{v.n}</p>
                <h3 className="mt-4 text-base font-medium uppercase tracking-[0.08em]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-60">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Ambient>

      {/* Close — emotional + CTA */}
      <Ambient theme="ink" className="relative overflow-hidden py-28 md:py-40">
        <ChameleonMark className="pointer-events-none absolute -bottom-20 -left-12 w-[46%] text-paper opacity-[0.05]" />
        <div className="container relative z-10 grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <p className="label">{m.close.eyebrow}</p>
            </Reveal>
            <Lines
              as="h2"
              delay={0.06}
              className="mt-8 text-display-xl font-thin tracking-tightest"
              lines={[m.close.titleA, <span key="w" className="font-black uppercase">{m.close.titleB}</span>]}
            />
            <Reveal delay={0.18}>
              <div className="mt-8 max-w-xl space-y-5 text-pretty text-lg leading-relaxed opacity-70">
                <p>{m.close.body}</p>
                <p>{m.close.body2}</p>
              </div>
              <TransitionLink
                href="/collezione"
                className="group mt-10 inline-flex items-baseline gap-4 text-[0.82rem] font-medium uppercase tracking-[0.18em]"
              >
                {m.close.cta}
                <span aria-hidden className="text-bordeaux-soft transition-transform duration-500 ease-editorial group-hover:translate-x-2">
                  &#8594;
                </span>
              </TransitionLink>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="md:col-span-3 md:col-start-10 md:self-end">
            <div className="flex items-center gap-3 border-t border-paper/15 pt-6">
              <ChameleonMark className="h-7 w-auto text-bordeaux-soft" />
              <p className="text-sm font-medium uppercase leading-snug tracking-[0.06em] text-paper/80">
                {m.close.signature}
              </p>
            </div>
          </Reveal>
        </div>
      </Ambient>
    </>
  );
}
