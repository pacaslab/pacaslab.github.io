import type { Metadata } from "next";
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
    title: dict.meta.cookie.title,
    description: dict.meta.cookie.description,
    alternates: {
      canonical: `/${locale}/cookie`,
      languages: { it: "/it/cookie", en: "/en/cookie" },
    },
  };
}

export default async function CookiePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);
  const l = dict.legal;
  const c = l.cookie;
  const updated = new Date(site.legal.updated).toLocaleDateString(
    locale === "it" ? "it-IT" : "en-GB",
    { year: "numeric", month: "long" },
  );

  return (
    <Ambient theme="paper" className="relative min-h-screen pt-36 pb-28 md:pt-44 md:pb-36">
      <div className="container">
        <header className="border-b border-current/15 pb-12">
          <Reveal>
            <p className="label">{c.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-display-xl font-black uppercase tracking-tightest">{c.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-prose text-pretty text-lead leading-relaxed opacity-70">{c.intro}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-10 text-[0.62rem] font-medium uppercase tracking-[0.18em] opacity-45">
              {l.updatedLabel}: {updated}
            </p>
          </Reveal>
        </header>

        <div className="mt-16 space-y-14 md:mt-20">
          {c.sections.map((s) => (
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
        </div>

        <div className="mt-20 flex items-center gap-8 border-t border-current/15 pt-8">
          <TransitionLink
            href="/"
            className="link-underline text-sm uppercase tracking-[0.14em] opacity-70 hover:opacity-100"
          >
            {l.backHome}
          </TransitionLink>
          <TransitionLink
            href="/privacy"
            className="link-underline text-sm uppercase tracking-[0.14em] opacity-70 hover:opacity-100"
          >
            {dict.footer.privacy}
          </TransitionLink>
        </div>
      </div>
    </Ambient>
  );
}
