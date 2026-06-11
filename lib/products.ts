/**
 * The collection — structural data only. All copy (name, description,
 * materials, size guide, styling…) is localized in lib/i18n/dictionaries
 * under `products[id]`, keyed by the `id` below. Images and crop geometry are
 * language-independent and live here.
 */
export interface ProductCrop {
  /** CSS object-position of the detail, e.g. "32% 38%". */
  position: string;
  /** Zoom factor applied around that anchor. */
  scale: number;
}

export interface Product {
  id: string;
  /** Editorial running number, e.g. "01". */
  index: string;
  /** Path under /public. */
  image: string;
  /** Plate background: light => white, dark => ink. */
  tone: "light" | "dark";
  /** Aspect ratio class for the plate, matched to the source photo. */
  aspect: string;
  /** Detail crops for the product page pseudo-gallery. */
  crops: ProductCrop[];
}

export const products: Product[] = [
  {
    id: "maglia-camaleonte",
    index: "01",
    image: "/assets/products/tee-white.webp",
    tone: "light",
    aspect: "aspect-[1800/1286]",
    crops: [
      { position: "32% 38%", scale: 2.2 },
      { position: "71% 42%", scale: 1.9 },
    ],
  },
  {
    id: "maglia-firma",
    index: "02",
    image: "/assets/products/tee-black.webp",
    tone: "dark",
    aspect: "aspect-[1800/1096]",
    crops: [
      { position: "39% 30%", scale: 2.4 },
      { position: "52% 62%", scale: 1.6 },
    ],
  },
  {
    id: "bucket-hat",
    index: "03",
    image: "/assets/products/bucket-hat.webp",
    tone: "light",
    aspect: "aspect-[1417/1240]",
    crops: [
      { position: "50% 52%", scale: 2.1 },
      { position: "50% 82%", scale: 1.7 },
    ],
  },
  {
    id: "tote-bag",
    index: "04",
    image: "/assets/products/tote-bag.webp",
    tone: "light",
    aspect: "aspect-[1800/777]",
    crops: [
      { position: "28% 64%", scale: 2.1 },
      { position: "29% 38%", scale: 2.3 },
    ],
  },
];

export type ProductId = (typeof products)[number]["id"];
