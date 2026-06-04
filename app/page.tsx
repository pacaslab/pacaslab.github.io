import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { CallToAction } from "@/components/sections/CallToAction";
import { site } from "@/lib/site";


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
