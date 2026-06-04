import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The collection — a lookbook of alternating editorial plates, populated
 * straight from lib/products (one entry per optimized WebP).
 */
export function Products() {
  return (
    <section id="collezione" className="scroll-mt-24 bg-paper py-24 md:py-36">
      <div className="container">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-3">
            <p className="label">Collezione — {products.length.toString().padStart(2, "0")}</p>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="text-balance font-display text-display-sm font-light tracking-tightest md:text-display">
                Quattro pezzi.{" "}
                <span className="italic text-clay">Una sola firma.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 max-w-prose text-pretty text-lg leading-relaxed text-ink-soft">
                Maglie, cappello e tote bag. Capi da indossare ogni giorno, costruiti per
                adattarsi a chi sei — con il camaleonte come unico segno.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Lookbook */}
        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
