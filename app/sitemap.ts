import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { locales } from "@/lib/i18n/config";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alt = (path: string) =>
    Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`]));

  return locales.flatMap((locale) => {
    const base = `${site.url}/${locale}`;
    return [
      { url: base, lastModified, changeFrequency: "monthly" as const, priority: 1, alternates: { languages: alt("") } },
      {
        url: `${base}/manifesto`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.8,
        alternates: { languages: alt("/manifesto") },
      },
      {
        url: `${base}/collezione`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        alternates: { languages: alt("/collezione") },
      },
      {
        url: `${base}/privacy`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: { languages: alt("/privacy") },
      },
      {
        url: `${base}/cookie`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: { languages: alt("/cookie") },
      },
      ...products.map((product) => ({
        url: `${base}/collezione/${product.id}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: alt(`/collezione/${product.id}`) },
      })),
    ];
  });
}
