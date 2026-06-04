import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";

/**
 * The single full-strength bordeaux moment of the page — a climax before the
 * footer. Uses the brand red at full depth, then hands off to the ink footer.
 */
export function CallToAction() {
  const instagram = site.social.find((s) => s.label === "Instagram")?.href ?? "#";

  return (
    <section className="relative overflow-hidden bg-bordeaux-deep text-paper">
      <Logo
        mark="chameleon"
        variant="white"
        decorative
        className="pointer-events-none absolute -left-10 -top-10 w-1/3 max-w-sm opacity-[0.06]"
      />

      <div className="container relative py-24 text-center md:py-36">
        <Reveal>
          <p className="label text-paper/60">{site.tagline}</p>
        </Reveal>
        <Reveal>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-display-sm font-light tracking-tightest md:text-display">
            Indossa il cambiamento.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/75">
            Piccole serie, Made in Italy. Seguici per le prossime uscite, o scrivici due
            righe: ci adattiamo volentieri.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3 text-sm font-medium text-bordeaux-deep transition-transform duration-300 ease-editorial hover:-translate-y-0.5"
            >
              Seguici su Instagram
              <span className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-paper/40 px-7 py-3 text-sm text-paper transition-colors duration-300 ease-editorial hover:bg-paper/10"
            >
              Scrivici
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
