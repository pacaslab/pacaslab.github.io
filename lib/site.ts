/**
 * Single source of truth for brand metadata, navigation and social links.
 * Keeping this here makes the copy easy to audit and keeps components dumb.
 */
export interface SiteConfig {
  readonly name: string;
  readonly wordmark: string;
  readonly tagline: string;
  readonly taglineIt: string;
  readonly origin: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  readonly nav: readonly { readonly label: string; readonly href: string; }[];
  readonly social: readonly { readonly label: string; readonly handle: string; readonly href: string; }[];
}

export const site: SiteConfig = {
  name: "Paca's Lab",
  wordmark: "PACA'S",
  tagline: "Built to adapt",
  taglineIt: "Costruito per adattarsi",
  origin: "Made in Italy",
  description:
    "Paca's Lab — abbigliamento contemporaneo Made in Italy. Capi essenziali costruiti per adattarsi, con il camaleonte come firma.",
  url: "https://pacaslab.github.io",
  locale: "it_IT",
  nav: [
    { label: "Manifesto", href: "/manifesto" },
    { label: "Collezione", href: "/collezione" },
  ],
  social: [
    { label: "Instagram", handle: "@pacas_lab", href: "https://www.instagram.com/pacas_lab?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "TikTok", handle: "@pacaslab", href: "https://tiktok.com/@pacaslab" },
  ],
};
