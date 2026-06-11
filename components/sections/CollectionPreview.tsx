import { products } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { Ambient } from "@/components/providers/Ambient";
import { ProductTile } from "@/components/products/ProductTile";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";

/** Staggered editorial spans — deliberately uneven, lookbook-style. */
const LAYOUT = [
  "md:col-span-6",
  "md:col-span-5 md:col-start-8 md:mt-28",
  "md:col-span-5 md:-mt-10",
  "md:col-span-6 md:col-start-7 md:mt-8",
];

interface CollectionPreviewProps {
  dict: Dictionary["collection"];
  productCopy: Dictionary["products"];
}

/**
 * Collection preview: four garments on a broken 12-column grid. Large
 * imagery, generous offsets, no card in sight.
 */
export function CollectionPreview({ dict, productCopy }: CollectionPreviewProps) {
  return (
    <Ambient theme="paper" className="py-28 md:py-36">
      <div className="container">
        <div className="mb-16 grid items-end gap-8 md:mb-24 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="label">{dict.eyebrow}</p>
            <h2 className="mt-5 text-display-sm font-thin tracking-tightest md:text-display-lg">{dict.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="text-pretty leading-relaxed opacity-75">{dict.lead}</p>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-current/15 pt-5">
              <span className="flex items-baseline gap-3">
                <span className="tnum text-display-sm font-thin leading-none text-bordeaux">{dict.count}</span>
                <span className="text-xs uppercase tracking-[0.16em] opacity-50">{dict.countLabel}</span>
              </span>
              <TransitionLink
                href="/collezione"
                className="link-underline text-[0.74rem] font-medium uppercase tracking-[0.16em]"
              >
                {dict.link}&nbsp;&#8594;
              </TransitionLink>
            </div>
          </Reveal>
        </div>

        <div className="grid items-start gap-x-8 gap-y-16 md:grid-cols-12">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 2) * 0.08} className={LAYOUT[i]}>
              <ProductTile
                product={product}
                copy={productCopy[product.id as keyof Dictionary["products"]]}
                sizes="(min-width: 768px) 45vw, 100vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Ambient>
  );
}
