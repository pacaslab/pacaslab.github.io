import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Ambient } from "@/components/providers/Ambient";
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
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { it: "/it/privacy", en: "/en/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);
  const l = dict.legal;
  const p = l.privacy;
  const updated = new Date(site.legal.updated).toLocaleDateString(
    locale === "it" ? "it-IT" : "en-GB",
    { year: "numeric", month: "long" },
  );

  const meta: { k: string; v: ReactNode }[] = [
    { k: l.controllerLabel, v: site.legal.controller },
    {
      k: l.contactLabel,
      v: (
        <a href={`mailto:${site.legal.email}`} className="link-underline">
          {site.legal.email}
        </a>
      ),
    },
    ...(site.legal.vatId ? [{ k: l.vatLabel, v: site.legal.vatId }] : []),
    { k: l.updatedLabel, v: updated },
  ];

  return (
    <Ambient theme="paper" className="relative min-h-screen pt-36 pb-28 md:pt-44 md:pb-36">
      <div className="container">
        <header className="border-b border-current/15 pb-12">
          <Reveal>
            <p className="label">{p.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-display-xl font-black uppercase tracking-tightest">{p.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-prose text-pretty text-lead leading-relaxed opacity-70">{p.intro}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 grid max-w-prose gap-x-8 gap-y-3 sm:grid-cols-2">
              {meta.map((row) => (
                <div key={row.k} className="flex flex-col gap-1 border-t border-current/15 pt-3">
                  <dt className="text-[0.62rem] font-medium uppercase tracking-[0.18em] opacity-45">{row.k}</dt>
                  <dd className="text-sm font-medium">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        <div className="mt-16 space-y-14 md:mt-20">
          {p.sections.map((s) => (
            <Reveal key={s.n} as="section" className="grid gap-x-8 gap-y-4 md:grid-cols-12">
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="tnum text-sm font-medium text-bordeaux-soft">{s.n}</span>
                <h2 className="text-base font-medium uppercase tracking-[0.08em]">{s.title}</h2>
              </div>
              <div className="max-w-prose space-y-4 text-pretty leading-relaxed opacity-75 md:col-span-8">
                {s.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal as="section" className="grid gap-x-8 gap-y-4 border-t border-current/15 pt-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="text-base font-medium uppercase tracking-[0.08em]">{p.rights.title}</h2>
            </div>
            <div className="max-w-prose md:col-span-8">
              <p className="text-pretty leading-relaxed opacity-75">{p.rights.intro}</p>
              <dl className="mt-6">
                {p.rights.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 border-t border-current/10 py-3 sm:flex-row sm:gap-4"
                  >
                    <dt className="text-sm font-medium uppercase tracking-[0.06em] text-bordeaux sm:w-40 sm:shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-relaxed opacity-70">{item.desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-pretty leading-relaxed opacity-75">{p.rights.complaint}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex items-center gap-8 border-t border-current/15 pt-8">
          <TransitionLink
            href="/"
            className="link-underline text-sm uppercase tracking-[0.14em] opacity-70 hover:opacity-100"
          >
            {l.backHome}
          </TransitionLink>
          <TransitionLink
            href="/cookie"
            className="link-underline text-sm uppercase tracking-[0.14em] opacity-70 hover:opacity-100"
          >
            {dict.footer.cookie}
          </TransitionLink>
        </div>
      </div>
    </Ambient>
  );
}
