"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
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
}

/**
 * 3D tilting product plate.
 * Uses Framer Motion mouse tracking and spring physics to tilt the card,
 * shift the product image (parallax), and overlay a dynamic light glare.
 */
function ProductPlate3D({ product }: ProductPlate3DProps) {
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
 * One product, presented as an editorial lookbook plate + spec column.
 * The plate background matches the photo's own backdrop (white / ink) so the
 * shot reads as a framed object, with a smooth 3D tilting parallax effect.
 */
export function ProductCard({ product, reverse }: ProductCardProps) {
  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
        {/* Plate */}
        <div className={clsx("md:col-span-7", reverse && "md:order-2")}>
          <ProductPlate3D product={product} />
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
