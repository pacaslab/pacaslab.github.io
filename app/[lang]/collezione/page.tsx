import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { Ambient } from "@/components/providers/Ambient";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { Lines } from "@/components/ui/Lines";
import { Magnetic } from "@/components/ui/Magnetic";
import { ProductTile } from "@/components/products/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
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
    title: dict.meta.collezione.title,
    description: dict.meta.collezione.description,
    alternates: { canonical: `/${locale}/collezione`, languages: { it: "/it/collezione", en: "/en/collezione" } },
  };
}

/** Staggered editorial spans — deliberately uneven, lookbook-style. */
const LAYOUT = [
  "md:col-span-7",
  "md:col-span-5 md:mt-36",
  "md:col-span-5 md:-mt-14",
  "md:col-span-7 md:mt-14",
];

export default async function CollezionePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);
  const c = dict.collectionPage;

  return (
    <>
      <Ambient theme="paper" className="relative overflow-hidden pb-28 pt-36 md:pb-36 md:pt-48">
        <ChameleonMark className="pointer-events-none absolute -right-[10%] -top-[6%] w-[44%] max-w-3xl rotate-12 text-ink opacity-[0.04]" />

        <div className="container relative z-10">
          <Reveal>
            <p className="label">{c.eyebrow}</p>
          </Reveal>
          <Lines as="h1" immediate delay={0.2} className="mt-5 text-display-xl font-black uppercase" lines={[c.title]} />
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-2 border-t border-current/15 pt-6 text-sm opacity-70">
              <span className="tnum">{c.count}</span>
              <span>{c.italy}</span>
              <span>{c.finite}</span>
            </div>
          </Reveal>

          <div className="mt-20 grid items-start gap-x-8 gap-y-16 md:mt-28 md:grid-cols-12">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 2) * 0.08} className={LAYOUT[i]}>
                <ProductTile
                  product={product}
                  copy={dict.products[product.id as keyof typeof dict.products]}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  priority={i < 2}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Ambient>

      {/* Closing CTA */}
      <Ambient theme="ink" className="py-28 md:py-40">
        <div className="container grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <p className="label">{dict.common.builtToAdapt}</p>
            </Reveal>
            <Lines
              as="h2"
              delay={0.06}
              className="mt-6 text-display-lg font-thin tracking-tightest"
              lines={[dict.footer.stayInTouch]}
            />
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Reveal delay={0.15}>
              <p className="max-w-xs text-sm leading-relaxed opacity-60">{dict.footer.blurb}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <a
                    href={site.social[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-bordeaux hover:text-paper"
                  >
                    {dict.footer.instaCta}&nbsp;&#8599;
                  </a>
                </Magnetic>
                <TransitionLink
                  href="/manifesto"
                  className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.16em] opacity-80"
                >
                  {dict.nav.manifesto}
                </TransitionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Ambient>
    </>
  );
}
