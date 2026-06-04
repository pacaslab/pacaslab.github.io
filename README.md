# Paca&rsquo;s Lab — *Built to adapt*

Brand showcase site for **Paca&rsquo;s Lab**, a contemporary Made-in-Italy clothing
label whose signature is the chameleon — *built to adapt*. Designed as a quiet,
editorial, premium experience: an immersive 3D hero, a manifesto, and a lookbook
of the collection.

> Minimal, warm, photo-led. One accent colour (bordeaux), generous whitespace,
> sober motion.

&nbsp;

## Art direction

Derived directly from the brand assets (logos + product shots):

| Token       | Value       | Origin                                  |
| ----------- | ----------- | --------------------------------------- |
| `bordeaux`  | `#901818`   | the chameleon print red                 |
| `ink`       | `#14110F`   | warm near-black — the immersive hero    |
| `paper`     | `#F5F1EA`   | warm off-white editorial canvas         |
| `sand`      | `#D8CBB4`   | the natural canvas of the tote / hat    |

**Type** — *Fraunces* (warm high-contrast serif) for display, *Inter* for UI and
body. The real `PACA'S` wordmark is used as the brand mark.

**Motion** — a restrained Three.js dust field with pointer parallax in the hero,
Framer-Motion scroll reveals elsewhere. Everything collapses gracefully under
`prefers-reduced-motion`.

&nbsp;

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** design system (`tailwind.config.ts`)
- **React Three Fiber / three.js** — hero particle field
- **Framer Motion** — scroll & UI animation
- **sharp** — build-time image pipeline (PNG → WebP)
- Ships as a **static export** for **GitHub Pages**

&nbsp;

## Getting started

```bash
npm install          # install dependencies
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run images       # (re)generate optimized WebP + icons + OG art
npm run build        # prebuild images, then static export to ./out
npm run start        # serve a production build
npm run lint         # eslint
```

`npm run build` runs the image pipeline automatically (`prebuild`) and emits a
fully static site to `./out`.

&nbsp;

## Image pipeline

Raw brand PNGs live in [`assets/source/`](assets/source). The script
[`scripts/optimize-images.mjs`](scripts/optimize-images.mjs):

- converts **logos** → lossless WebP (crisp flat art, still tiny),
- converts **product shots** → quality-tuned WebP, width-capped, with the
  bucket-hat cropped to its front view,
- generates the favicon (`app/icon.png`), Apple touch icon and the
  OpenGraph card (`public/og.png`).

It is idempotent (skips up-to-date files); force a rebuild with
`npm run images -- --force`. Typical savings: **92–98%** on product photos.

To add a product: drop the PNG in `assets/source/`, add an entry to
[`lib/products.ts`](lib/products.ts), map it in the script, then `npm run images`.

&nbsp;

## Structure

```
app/                 # App Router: layout (fonts, SEO), page, robots, sitemap, icons
components/
  hero/              # Hero + R3F canvas + particle field
  layout/            # Navbar, Footer
  sections/          # About (manifesto), Products, CallToAction
  products/          # ProductCard (lookbook plate)
  ui/                # Reveal, Ticker, Logo
lib/                 # site config, product data, clsx
scripts/             # optimize-images.mjs
assets/source/       # raw brand PNGs (committed, reproducible)
public/assets/       # generated WebP (logos + products)
```

&nbsp;

## Deployment (GitHub Pages)

The repo is named `pacaslab.github.io`, so it serves at the domain root.
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the static
export and publishes it on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
Actions**. A `.nojekyll` file is included so Pages serves the `_next/` directory.

&nbsp;

## Notes

- **SEO** — per-page metadata, OpenGraph/Twitter cards, JSON-LD, `sitemap.xml`,
  `robots.txt`, semantic landmarks, `lang="it"`.
- **Performance** — three.js is code-split (`ssr: false`) and kept off the
  critical path; images are pre-optimized WebP with lazy loading; fonts are
  `next/font` with `display: swap`.
- **Accessibility** — skip link, focus-visible rings, reduced-motion fallbacks,
  alt text on every product image.

&nbsp;

<sub>Product names, copy and social handles are illustrative placeholders for
this showcase.</sub>
