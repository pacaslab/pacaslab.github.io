import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Hero } from "@/components/hero/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { EditorialBand } from "@/components/sections/EditorialBand";
import { Diptych } from "@/components/sections/Diptych";
import { CollectionPreview } from "@/components/sections/CollectionPreview";
import { ManifestoTeaser } from "@/components/sections/ManifestoTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { Ticker } from "@/components/ui/Ticker";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.url}/${locale}`,
    logo: `${site.url}/assets/logos/wordmark-black.webp`,
    image: `${site.url}/og.png`,
    slogan: dict.common.builtToAdapt,
    description: dict.meta.home.description,
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <>
      <Hero dict={dict.hero} />
      <BrandIntro dict={dict.intro} />
      <EditorialBand dict={dict.editorial} />
      <Diptych dict={dict.diptych} />
      <Ticker
        items={[dict.common.builtToAdapt, dict.common.builtToAdaptIt, dict.common.madeInItaly]}
        className="border-y border-current/10 py-5 opacity-80"
      />
      <CollectionPreview dict={dict.collection} productCopy={dict.products} />
      <ManifestoTeaser dict={dict.manifestoTeaser} />
      <FaqSection dict={dict.faq} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
