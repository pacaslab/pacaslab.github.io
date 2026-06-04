import Image from "next/image";
import type { Product } from "@/lib/products";
import { clsx } from "@/lib/clsx";
import { Reveal } from "@/components/ui/Reveal";

interface ProductCardProps {
  product: Product;
  /** Mirror the layout on alternating rows for a lookbook rhythm. */
  reverse?: boolean;
}

/**
 * One product, presented as an editorial lookbook plate + spec column.
 * The plate background matches the photo's own backdrop (white / ink) so the
 * shot reads as a framed object, and the image eases into a slow zoom on hover.
 */
export function ProductCard({ product, reverse }: ProductCardProps) {
  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
        {/* Plate */}
        <div className={clsx("md:col-span-7", reverse && "md:order-2")}>
          <div
            className={clsx(
              "group relative overflow-hidden rounded-[3px]",
              product.aspect,
              product.tone === "dark" ? "bg-ink" : "bg-white ring-1 ring-ink/5",
            )}
          >
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-editorial will-change-transform group-hover:scale-[1.045]"
            />
          </div>
        </div>

        {/* Spec column */}
        <div className={clsx("md:col-span-5", reverse && "md:order-1")}>
          <div className="flex items-center gap-4">
            <span className="font-display text-lg text-bordeaux">n&deg;{product.index}</span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="label">{product.colorway}</span>
          </div>

          <h3 className="mt-6 font-display text-4xl font-light tracking-tightest md:text-5xl">
            {product.name}
          </h3>
          <p className="mt-3 font-display text-lg italic text-clay">{product.tagline}</p>
          <p className="mt-5 max-w-prose text-pretty leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-9 grid grid-cols-2 gap-8">
            <div>
              <p className="label mb-3">Materiali</p>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-3">Dettagli</p>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
