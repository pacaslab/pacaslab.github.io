import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";

const VALUES = [
  {
    n: "01",
    title: "Adattamento",
    body: "Un guardaroba che si muove con te, non contro di te. Capi che restano attuali.",
  },
  {
    n: "02",
    title: "Essenzialità",
    body: "Tolto tutto il rumore, resta il capo. Tagli netti, una sola firma bordeaux.",
  },
  {
    n: "03",
    title: "Materiali onesti",
    body: "Cotone pettinato, canvas naturale, fibre vere. Pensati per durare nel tempo.",
  },
  {
    n: "04",
    title: "Made in Italy",
    body: "Piccole serie, mani esperte, filiera corta. Ogni pezzo nasce qui.",
  },
];

/**
 * Manifesto / Chi siamo — editorial brand story, philosophy, materials and
 * values, anchored by the chameleon mark.
 */
export function About() {
  return (
    <section id="manifesto" className="scroll-mt-24 bg-paper py-24 md:py-36">
      <div className="container">
        {/* Statement */}
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-3">
            <p className="label">Manifesto</p>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="text-balance font-display text-display-sm font-light tracking-tightest md:text-display">
                Non mimetismo.{" "}
                <span className="italic text-bordeaux">Adattamento.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 max-w-prose text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
                Paca&rsquo;s Lab nasce da un&rsquo;idea semplice: i vestiti migliori sono
                quelli che cambiano con te. Come il camaleonte — la nostra firma — non
                inseguono le mode. Si adattano alla persona, al momento, alla luce.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Chameleon panel + philosophy / materials */}
        <div className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-12 md:gap-16">
          <Reveal as="div" className="md:col-span-5">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[3px] bg-paper-dim">
              <div
                aria-hidden
                className="absolute inset-0 [background:radial-gradient(70%_60%_at_50%_45%,rgba(144,24,24,0.08),transparent_70%)]"
              />
              <Logo mark="chameleon" variant="bordeaux" className="w-2/3 max-w-xs" />
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7">
            <Reveal>
              <h3 className="label mb-4 text-ink">Filosofia</h3>
              <p className="text-pretty leading-relaxed text-ink-soft">
                Disegniamo capi essenziali, pensati per durare e per stare bene addosso a
                chiunque. Tagli oversize, dettagli misurati, una sola firma. Niente di
                superfluo, nulla di gridato.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="label mb-4 text-ink">Materiali &amp; qualità</h3>
              <p className="text-pretty leading-relaxed text-ink-soft">
                Lavoriamo cotoni pesanti e canvas naturali, con stampe serigrafiche e
                ricami fatti per resistere ai lavaggi e al tempo. Ogni capo è prodotto in
                Italia, in piccole serie.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid gap-x-10 gap-y-12 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.06}>
              <p className="font-display text-2xl text-bordeaux">{v.n}</p>
              <h4 className="mt-3 text-base font-medium">{v.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-clay">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
