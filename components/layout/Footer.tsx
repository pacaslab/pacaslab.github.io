import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

/**
 * Ink footer. Brand sign-off, navigation, socials and the legal line.
 * A large, faint chameleon sits behind the content as a watermark.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contatti" className="relative overflow-hidden bg-ink text-paper">
      {/* Watermark */}
      <Logo
        mark="chameleon"
        variant="white"
        decorative
        className="pointer-events-none absolute -bottom-16 -right-10 w-[42%] max-w-2xl opacity-[0.04]"
      />

      <div className="container relative">
        {/* Statement */}
        <div className="grid gap-12 border-b border-paper/10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <p className="label text-clay">{site.tagline} — {site.origin}</p>
            <h2 className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-[1.05] tracking-tightest md:text-6xl">
              Capi essenziali,<br />
              <span className="italic text-paper/70">costruiti per adattarsi.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-2">
            <nav aria-label="Footer">
              <p className="label text-clay">Esplora</p>
              <ul className="mt-5 space-y-3 text-sm">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="link-underline text-paper/80 hover:text-paper">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label text-clay">Social</p>
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
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-paper/80 hover:text-paper"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
          <Logo mark="wordmark" variant="white" className="h-3.5 w-auto opacity-90" />
          <div className="flex flex-col gap-1 text-xs text-clay md:flex-row md:items-center md:gap-6">
            <span>© {year} {site.name}. Tutti i diritti riservati.</span>
            <span className="hidden md:inline" aria-hidden>·</span>
            <span>{site.origin}</span>
          </div>
          <a href="#top" className="link-underline text-xs uppercase tracking-[0.14em] text-paper/70">
            Torna su ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
