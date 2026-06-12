import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { Ticker } from "@/components/ui/Ticker";
import { TransitionLink } from "@/components/ui/TransitionLink";

interface FooterProps {
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}

/**
 * Ink footer: marquee sign-off, an oversized typographic wordmark and the
 * essential links. The chameleon closes the page as a faint watermark.
 */
export function Footer({ footer, nav, common }: FooterProps) {
  const year = new Date().getFullYear();
  const links = [
    { label: nav.home, href: "/" },
    { label: nav.manifesto, href: "/manifesto" },
    { label: nav.collezione, href: "/collezione" },
  ];

  return (
    <footer id="contatti" className="relative overflow-hidden bg-ink text-paper">
      <ChameleonMark className="pointer-events-none absolute -bottom-14 -right-10 w-[44%] max-w-2xl text-paper opacity-[0.04]" />

      <Ticker
        items={[common.builtToAdapt, common.madeInItaly, site.name, common.builtToAdaptIt]}
        speed="slow"
        className="border-b border-paper/10 py-5 text-paper/80"
      />

      <div className="container relative">
        <div className="grid gap-14 border-b border-paper/10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <p className="label">{footer.stayInTouch}</p>
            <a
              href={site.social[0].href}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-6 inline-block text-display-sm font-thin tracking-tightest"
            >
              {footer.instaCta}&nbsp;&#8599;
            </a>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-paper/55">
              {footer.blurb} {common.madeInItaly}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5">
            <nav aria-label={footer.explore}>
              <p className="label">{footer.explore}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map((item) => (
                  <li key={item.href}>
                    <TransitionLink href={item.href} className="link-underline text-paper/80 hover:text-paper">
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label">{footer.social}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-paper/80 hover:text-paper"
                    >
                      {s.label}
                      <span className="ml-1 text-paper/40">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized wordmark — the typographic sign-off. */}
        <div className="flex items-end justify-between gap-6 pt-10">
          <p
            aria-hidden
            className="select-none text-display-2xl font-black uppercase leading-[0.78] tracking-[-0.04em] text-paper/95"
          >
            {site.wordmark}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <span className="text-xs text-paper/45">
              © {year} {site.name}. {footer.rights}
            </span>
            <nav
              aria-label={footer.legal}
              className="flex items-center gap-5 text-xs uppercase tracking-[0.12em] text-paper/55"
            >
              <TransitionLink href="/privacy" className="link-underline hover:text-paper">
                {footer.privacy}
              </TransitionLink>
              <TransitionLink href="/cookie" className="link-underline hover:text-paper">
                {footer.cookie}
              </TransitionLink>
            </nav>
          </div>
          <span className="text-xs text-paper/45">
            {common.builtToAdapt} — {common.madeInItaly}
          </span>
          <a href="#contenuto" className="link-underline text-xs uppercase tracking-[0.14em] text-paper/70">
            {footer.backToTop}&nbsp;&#8593;
          </a>
        </div>
      </div>
    </footer>
  );
}
