import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { CallToAction } from "@/components/sections/CallToAction";
import { Ticker } from "@/components/ui/Ticker";
import { site } from "@/lib/site";

const TICKER_ITEMS = [
  "Built to adapt",
  "Camaleonte",
  "Made in Italy",
  "Paca’s Lab",
  "Costruito per adattarsi",
];

// Minimal structured data for richer search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/assets/logos/wordmark-black.webp`,
  image: `${site.url}/og.png`,
  slogan: site.tagline,
  description: site.description,
  sameAs: site.social.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Brand ticker — keeps the ink mood for one beat before the page opens up */}
      <div className="border-y border-paper/10 bg-ink py-6 text-paper">
        <Ticker items={TICKER_ITEMS} />
      </div>

      <About />
      <Products />
      <CallToAction />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
