/**
 * The collection.
 *
 * Each entry maps to one optimized WebP produced by scripts/optimize-images.mjs
 * (assets/source -> public/assets/products). `tone` drives the colour of the
 * editorial plate so each photo's own background blends seamlessly:
 * light products sit on a white plate, the all-black tee sits on ink.
 */
export interface Product {
  id: string;
  /** Editorial running number, e.g. "01". */
  index: string;
  name: string;
  colorway: string;
  /** One-line hook shown next to the name. */
  tagline: string;
  description: string;
  materials: string[];
  details: string[];
  /** Path under /public. */
  image: string;
  alt: string;
  /** Plate background: light => white, dark => ink. */
  tone: "light" | "dark";
  /** Aspect ratio class for the plate, matched to the source photo. */
  aspect: string;
}

export const products: Product[] = [
  {
    id: "maglia-camaleonte",
    index: "01",
    name: "Maglia Camaleonte",
    colorway: "Avorio",
    tagline: "Stampa sul retro, firma sul cuore.",
    description:
      "Taglio oversize dal peso pieno. Il camaleonte bordeaux campeggia sul retro; sul fronte, soltanto la firma. Un capo che cambia con chi lo indossa.",
    materials: ["100% cotone pettinato", "Jersey pesante · 240 g/m²", "Vestibilità oversize"],
    details: ["Stampa serigrafica", "Etichetta interna “Built to adapt”", "Made in Italy"],
    image: "/assets/products/tee-white.webp",
    alt: "Maglia oversize avorio Paca's Lab, fronte con firma e retro con la stampa del camaleonte bordeaux.",
    tone: "light",
    aspect: "aspect-[1800/1286]",
  },
  {
    id: "maglia-firma",
    index: "02",
    name: "Maglia Firma",
    colorway: "Nero",
    tagline: "Nero su nero. Il dettaglio si svela da vicino.",
    description:
      "La versione essenziale: total black, camaleonte tono su tono sul cuore. Pensata per sparire e adattarsi a tutto ciò che indossi.",
    materials: ["100% cotone pettinato", "Jersey pesante · 240 g/m²", "Tinto in capo"],
    details: ["Mark ricamato tono su tono", "Vestibilità oversize", "Made in Italy"],
    image: "/assets/products/tee-black.webp",
    alt: "Maglia oversize nera Paca's Lab, fronte e retro su fondo scuro con piccolo camaleonte tono su tono.",
    tone: "dark",
    aspect: "aspect-[1800/1096]",
  },
  {
    id: "bucket-hat",
    index: "03",
    name: "Bucket Hat",
    colorway: "Sabbia",
    tagline: "Twill di cotone, camaleonte ricamato.",
    description:
      "Cappello a tesa morbida in cotone sabbia. Camaleonte ricamato sul fronte, firma sul retro: si adatta alla luce di ogni stagione.",
    materials: ["100% cotone twill", "Fodera interna", "Taglia unica"],
    details: ["Ricamo diretto", "Occhielli di areazione", "Made in Italy"],
    image: "/assets/products/bucket-hat.webp",
    alt: "Bucket hat color sabbia Paca's Lab con camaleonte ricamato sul fronte e firma sul retro.",
    tone: "light",
    aspect: "aspect-[1417/1240]",
  },
  {
    id: "tote-bag",
    index: "04",
    name: "Tote Bag",
    colorway: "Naturale",
    tagline: "Canvas grezzo, un solo tratto continuo.",
    description:
      "Shopper in canvas naturale ad alta grammatura. Qui il camaleonte diventa un disegno a tratto continuo, nato da un solo gesto.",
    materials: ["100% cotone canvas", "280 g/m²", "Manici lunghi rinforzati"],
    details: ["Stampa serigrafica bordeaux", "Cuciture rinforzate", "Made in Italy"],
    image: "/assets/products/tote-bag.webp",
    alt: "Tote bag in canvas naturale Paca's Lab con stampa bordeaux del camaleonte a tratto continuo.",
    tone: "light",
    aspect: "aspect-[1800/777]",
  },
];
