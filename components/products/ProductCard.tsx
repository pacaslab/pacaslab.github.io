"use client";

import { useRef, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { clsx } from "@/lib/clsx";
import { Reveal } from "@/components/ui/Reveal";

interface ProductCardProps {
  product: Product;
  /** Mirror the layout on alternating rows for a lookbook rhythm. */
  reverse?: boolean;
}

interface ProductPlate3DProps {
  product: Product;
  onClick: () => void;
}

interface ProductLightboxProps {
  product: Product;
  onClose: () => void;
}

/**
 * 3D tilting product plate.
 * Uses Framer Motion mouse tracking and spring physics to tilt the card,
 * shift the product image (parallax), and overlay a dynamic light glare.
 */
function ProductPlate3D({ product, onClick }: ProductPlate3DProps) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates relative to card center [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for a smooth premium feel
  const springConfig = { stiffness: 90, damping: 20, mass: 0.8 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Image translation for depth (opposite direction for parallax)
  const imageTranslateX = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const imageTranslateY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), springConfig);
  const imageScale = useSpring(1, springConfig);

  // Shine position and opacity
  const shineX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  const shineOpacity = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    if (reduce) return;
    imageScale.set(1.04);
    shineOpacity.set(0.65);
  };

  const handleMouseLeave = () => {
    if (reduce) return;
    imageScale.set(1);
    x.set(0);
    y.set(0);
    shineOpacity.set(0);
  };

  // Custom light reflection gradient depending on product tone (dark / light)
  const shineGradient = useTransform([shineX, shineY], ([sx, sy]) => {
    const color =
      product.tone === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(144, 24, 24, 0.08)";
    return `radial-gradient(circle at ${sx}% ${sy}%, ${color}, transparent 65%)`;
  });

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full cursor-pointer select-none"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reduce
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className={clsx(
          "group relative w-full h-full overflow-hidden rounded-[3px] transition-shadow duration-500",
          product.aspect,
          product.tone === "dark"
            ? "bg-ink hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
            : "bg-white ring-1 ring-ink/5 hover:shadow-[0_24px_50px_rgba(20,17,15,0.08)]"
        )}
      >
        {/* Parallax Image */}
        <motion.div
          style={
            reduce
              ? { width: "100%", height: "100%" }
              : {
                  x: imageTranslateX,
                  y: imageTranslateY,
                  scale: imageScale,
                  transformStyle: "preserve-3d",
                }
          }
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover pointer-events-none"
            priority={product.index === "01"}
          />
        </motion.div>

        {/* Dynamic Light/Shine Overlay */}
        {!reduce && (
          <motion.div
            style={{
              background: shineGradient,
              opacity: shineOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Interactive Lightbox Modal.
 * Renders a full-screen overlay with smooth scale zoom, supporting
 * high-resolution panning via mousemove (desktop) and touchmove (mobile).
 */
function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth hardware-accelerated transformOrigin updates
  const zoomX = useMotionValue(50);
  const zoomY = useMotionValue(50);
  const transformOrigin = useTransform([zoomX, zoomY], ([zx, zy]) => `${zx}% ${zy}%`);

  useEffect(() => {
    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const el = zoomRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoomX.set(Math.max(0, Math.min(100, x)));
    zoomY.set(Math.max(0, Math.min(100, y)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const el = zoomRef.current;
    if (!el) return;

    const touch = e.touches[0];
    const rect = el.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    zoomX.set(Math.max(0, Math.min(100, x)));
    zoomY.set(Math.max(0, Math.min(100, y)));
  };

  const toggleZoom = () => {
    setIsZoomed((z) => !z);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink/98 p-6 text-paper backdrop-blur-md cursor-pointer"
    >
      {/* Lightbox Header */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="flex w-full max-w-5xl items-center justify-between border-b border-paper/10 pb-4 cursor-default"
      >
        <div>
          <span className="font-display text-sm text-bordeaux mr-2">n&deg;{product.index}</span>
          <span className="text-lg font-light tracking-tight">{product.name}</span>
          <span className="ml-3 label text-clay">{product.colorway}</span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi finestra"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 bg-paper/5 transition-colors duration-300 hover:border-paper/60 hover:bg-paper/10"
        >
          <span className="absolute h-px w-4 bg-current rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
          <span className="absolute h-px w-4 bg-current -rotate-45 transition-transform duration-300 group-hover:-rotate-[-45deg]" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="flex flex-1 items-center justify-center w-full py-6">
        <div
          ref={zoomRef}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={() => setIsZoomed(false)}
          className={clsx(
            "relative overflow-hidden rounded-[3px] bg-paper-dim/5 transition-all duration-300 w-full max-w-5xl select-none",
            product.aspect,
            isZoomed ? "cursor-zoom-out shadow-2xl" : "cursor-zoom-in"
          )}
          style={{ maxHeight: "68vh" }}
        >
          <motion.div
            animate={{
              scale: isZoomed ? 2.5 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
              priority
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Lightbox Footer */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="flex w-full max-w-5xl flex-col items-center justify-center border-t border-paper/10 pt-4 text-center md:flex-row md:justify-between cursor-default"
      >
        <p className="text-xs text-clay">
          {isZoomed
            ? "Trascina o muovi il cursore per esplorare i dettagli. Clicca di nuovo per uscire."
            : "Clicca sull'immagine per zoomare, o clicca sullo sfondo per chiudere."}
        </p>
        <p className="mt-2 text-xs italic text-paper/60 md:mt-0">
          {product.tagline}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * One product, presented as an editorial lookbook plate + spec column.
 * The plate background matches the photo's own backdrop (white / ink) so the
 * shot reads as a framed object, with a smooth 3D tilting parallax effect.
 */
export function ProductCard({ product, reverse }: ProductCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <Reveal>
        <article className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
          {/* Plate */}
          <div className={clsx("md:col-span-7", reverse && "md:order-2")}>
            <ProductPlate3D product={product} onClick={() => setIsLightboxOpen(true)} />
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

      {/* Detail Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <ProductLightbox product={product} onClose={() => setIsLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
