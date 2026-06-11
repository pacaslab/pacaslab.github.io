import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { clsx } from "@/lib/clsx";
import { Ambient } from "@/components/providers/Ambient";
import { Lines } from "@/components/ui/Lines";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, id: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const locale: Locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);
  const copy = dict.products[id as keyof typeof dict.products];
  if (!copy) return {};
  return {
    title: `${copy.name} — ${copy.colorway}`,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/collezione/${id}`,
      languages: { it: `/it/collezione/${id}`, en: `/en/collezione/${id}` },
    },
    openGraph: {
      title: `${copy.name} — ${copy.colorway} · ${site.name}`,
      description: copy.description,
      images: [{ url: products.find((p) => p.id === id)?.image ?? "/og.png" }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) notFound();
  const product = products[index];
  const copy = dict.products[id as keyof typeof dict.products];
  const next = products[(index + 1) % products.length];
  const nextCopy = dict.products[next.id as keyof typeof dict.products];
  const t = dict.productPage;
  const plate = product.tone === "dark" ? "bg-ink" : "bg-white";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${copy.name} — ${copy.colorway}`,
    image: `${site.url}${product.image}`,
    description: copy.description,
    brand: { "@type": "Brand", name: site.name },
    material: copy.materials.join(", "),
  };

  return (
    <>
      <Ambient theme="paper" className="pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="container">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <TransitionLink
                href="/collezione"
                className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.18em] opacity-70"
              >
                &#8592;&nbsp;{t.back}
              </TransitionLink>
              <span className="tnum text-[0.78rem] font-medium uppercase tracking-[0.18em] opacity-50">
                {product.index} / {String(products.length).padStart(2, "0")} — {t.capsule}
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-x-10">
            {/* Gallery */}
            <div className="md:col-span-7">
              <Reveal>
                <figure className={clsx("relative overflow-hidden rounded-[3px]", product.aspect, plate)}>
                  <Image
                    src={product.image}
                    alt={copy.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              </Reveal>

              <div className="mt-6 grid grid-cols-2 gap-6">
                {product.crops.map((crop, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.08}>
                    <figure>
                      <div className={clsx("group relative aspect-square overflow-hidden rounded-[3px]", plate)}>
                        <Image
                          src={product.image}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(min-width: 768px) 30vw, 50vw"
                          className="object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.06]"
                          style={{
                            objectPosition: crop.position,
                            transform: `scale(${crop.scale})`,
                            transformOrigin: crop.position,
                          }}
                        />
                      </div>
                      <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] opacity-50">
                        {copy.cropLabels[i]}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Spec sheet */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <Reveal>
                  <p className="tnum text-display-sm font-thin text-bordeaux">{product.index}</p>
                  <Lines as="h1" delay={0.05} className="mt-3 text-display-sm font-black uppercase" lines={[copy.name]} />
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] opacity-50">{copy.colorway}</p>
                  <p className="mt-5 italic opacity-70">{copy.tagline}</p>
                  <p className="mt-5 max-w-prose text-pretty leading-relaxed opacity-75">{copy.description}</p>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Magnetic>
                      <a
                        href={site.social[0].href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-bordeaux px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:bg-ink"
                      >
                        {t.orderCta}&nbsp;&#8599;
                      </a>
                    </Magnetic>
                    <span className="max-w-[180px] text-xs leading-relaxed opacity-50">{t.orderHint}</span>
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="mt-12 grid grid-cols-2 gap-8 border-t border-current/10 pt-8">
                    <div>
                      <h2 className="label">{t.materials}</h2>
                      <ul className="mt-4 space-y-2 text-sm opacity-75">
                        {copy.materials.map((mat) => (
                          <li key={mat}>{mat}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="label">{t.details}</h2>
                      <ul className="mt-4 space-y-2 text-sm opacity-75">
                        {copy.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 border-t border-current/10 pt-8">
                    <h2 className="label">{t.sizes}</h2>
                    <table className="mt-4 w-full text-sm">
                      <thead>
                        <tr>
                          {copy.sizeColumns.map((col) => (
                            <th
                              key={col}
                              scope="col"
                              className="border-b border-current/15 pb-3 pr-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.14em] opacity-50"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {copy.sizeRows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td
                                key={i}
                                className={clsx("tnum border-b border-current/10 py-3 pr-4", i === 0 && "font-medium")}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-3 text-xs leading-relaxed opacity-50">{copy.sizeNote}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.22}>
                  <div className="mt-10 border-t border-current/10 pt-8">
                    <h2 className="label">{t.fit}</h2>
                    <p className="mt-4 max-w-prose text-sm leading-relaxed opacity-75">{copy.fit}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.26}>
                  <div className="mt-10 border-t border-current/10 pt-8">
                    <h2 className="label">{t.styling}</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed opacity-75">
                      {copy.styling.map((tip) => (
                        <li key={tip} className="flex gap-3">
                          <span aria-hidden className="mt-[0.45em] block h-1 w-1 shrink-0 rotate-45 bg-bordeaux" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Ambient>

      {/* Next garment */}
      <Ambient theme="ink" className="py-24 md:py-32">
        <div className="container">
          <Reveal>
            <p className="label">{t.next}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <TransitionLink
              href={`/collezione/${next.id}/`}
              className="group mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2"
            >
              <span className="tnum text-display-sm font-thin text-bordeaux-soft">{next.index}</span>
              <span className="text-display-lg font-thin tracking-tightest transition-opacity duration-300 group-hover:opacity-60">
                {nextCopy.name}
              </span>
              <span
                aria-hidden
                className="text-display-sm text-bordeaux-soft transition-transform duration-500 ease-editorial group-hover:translate-x-3"
              >
                &#8594;
              </span>
            </TransitionLink>
          </Reveal>
        </div>
      </Ambient>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
