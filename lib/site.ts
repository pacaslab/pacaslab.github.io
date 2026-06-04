/**
 * Single source of truth for brand metadata, navigation and social links.
 * Keeping this here makes the copy easy to audit and keeps components dumb.
 */
export const site = {
  name: "Paca's Lab",
  wordmark: "PACA'S",
  tagline: "Built to adapt",
  taglineIt: "Costruito per adattarsi",
  origin: "Made in Italy",
  description:
    "Paca's Lab — abbigliamento contemporaneo Made in Italy. Capi essenziali costruiti per adattarsi, con il camaleonte come firma.",
  url: "https://pacaslab.github.io",
  locale: "it_IT",
  // email: "ciao@pacaslab.com",
  nav: [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Collezione", href: "#collezione" },
    { label: "Contatti", href: "#contatti" },
  ],
  social: [
    { label: "Instagram", handle: "@pacaslab", href: "https://instagram.com/pacaslab" },
    { label: "TikTok", handle: "@pacaslab", href: "https://tiktok.com/@pacaslab" },
  ],
} as const;

export type SiteConfig = typeof site;
