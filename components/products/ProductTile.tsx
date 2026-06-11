import Image from "next/image";
import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { clsx } from "@/lib/clsx";
import { TransitionLink } from "@/components/ui/TransitionLink";

export type ProductCopy = Dictionary["products"][keyof Dictionary["products"]];

interface ProductTileProps {
  product: Product;
  copy: ProductCopy;
  className?: string;
  /** next/image sizes hint for the grid context. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Editorial product tile: the photo on its plate, a slow zoom on hover and
 * the bordeaux index flashing in like an atelier stamp.
 */
export function ProductTile({ product, copy, className, sizes, priority }: ProductTileProps) {
  return (
    <TransitionLink
      href={`/collezione/${product.id}/`}
      className={clsx("group block", className)}
      aria-label={`${product.index} — ${copy.name}, ${copy.colorway}`}
    >
      <figure>
        <div
          className={clsx(
            "relative overflow-hidden rounded-[3px]",
            product.aspect,
            product.tone === "dark" ? "bg-ink" : "bg-white",
          )}
        >
          <Image
            src={product.image}
            alt={copy.alt}
            fill
            sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
            priority={priority}
            className="object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.045]"
          />
          <span
            aria-hidden
            className={clsx(
              "tnum absolute left-4 top-4 -translate-y-1 text-sm font-medium text-bordeaux opacity-0 transition-all duration-500 ease-editorial",
              "group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            {product.index}
          </span>
        </div>
        <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="flex items-baseline gap-3">
            <span className="tnum text-xs font-medium text-bordeaux">{product.index}</span>
            <span className="text-base font-medium">{copy.name}</span>
          </span>
          <span className="text-sm opacity-50">{copy.colorway}</span>
        </figcaption>
      </figure>
    </TransitionLink>
  );
}
