import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { HtmlLang } from "@/components/providers/HtmlLang";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    title: { default: dict.meta.home.title, template: `%s · ${site.name}` },
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { it: "/it", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_GB",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: dict.meta.home.title }],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <LocaleProvider locale={lang}>
      <HtmlLang locale={lang} />
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.nav.home}
      </a>
      <Navbar nav={dict.nav} lang={dict.lang} />
      <main id="contenuto">{children}</main>
      <Footer footer={dict.footer} nav={dict.nav} common={dict.common} />
    </LocaleProvider>
  );
}
