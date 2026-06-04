/**
 * Asset pipeline — Paca's Lab
 * ---------------------------------
 * Converts the raw brand PNGs in /assets/source into optimized WebP served
 * from /public/assets, and generates favicon / apple-icon / OpenGraph art.
 *
 * Logos are flat vector-like art -> lossless WebP (crisp, still tiny).
 * Product photos -> high-quality lossy WebP, capped width, progressive.
 *
 * Idempotent: skips a target if it is already newer than its source, so it is
 * safe to wire into `prebuild`. Force a full rebuild with `--force`.
 *
 * Run: npm run images   (or automatically via `npm run build`)
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "assets", "source");
const OUT = path.join(ROOT, "public", "assets");
const FORCE = process.argv.includes("--force");

// Source file -> { out, kind }. Slugified, human-readable target names.
const LOGOS = [
  ["PACA'S_black.png", "logos/wordmark-black"],
  ["PACA'S_white.png", "logos/wordmark-white"],
  ["PACA'S_bordeaux.png", "logos/wordmark-bordeaux"],
  ["Camaleonte_nero.png", "logos/chameleon-black"],
  ["Camaleonte_bianco.png", "logos/chameleon-white"],
  ["Camaleonte_bordeaux.png", "logos/chameleon-bordeaux"],
  ["BtA_black.png", "logos/bta-black"],
  ["BtA_white.png", "logos/bta-white"],
  ["BtA_bordeaux.png", "logos/bta-bordeaux"],
];

// `extract` (optional) crops the source before trim/resize. The bucket-hat
// source is a stacked two-up (front over back); we keep only the front view.
const PRODUCTS = [
  { src: "Tee_white.png", out: "products/tee-white" },
  { src: "Tee_black.png", out: "products/tee-black" },
  { src: "Bucket Hat.png", out: "products/bucket-hat", extract: { left: 0, top: 0, width: 1417, height: 1240 } },
  { src: "Tote Bag.png", out: "products/tote-bag" },
];

const kb = (n) => `${(n / 1024).toFixed(1)}kb`;

async function isStale(src, dest) {
  if (FORCE) return true;
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true; // dest missing
  }
}

async function ensureDir(file) {
  await fs.mkdir(path.dirname(file), { recursive: true });
}

async function convert(srcName, outBase, opts) {
  const src = path.join(SRC, srcName);
  const dest = path.join(OUT, `${outBase}.webp`);
  await ensureDir(dest);

  if (!(await isStale(src, dest))) {
    console.log(`  · skip   ${outBase}.webp (up to date)`);
    return;
  }

  let img = sharp(src);

  if (opts.extract) img = sharp(await img.extract(opts.extract).toBuffer());
  const meta = await img.metadata();

  if (opts.trim) img = img.trim({ threshold: 12 });
  if (opts.maxWidth && meta.width && meta.width > opts.maxWidth) {
    img = img.resize({ width: opts.maxWidth, withoutEnlargement: true });
  }

  await img.webp(opts.webp).toFile(dest);

  const [a, b] = await Promise.all([fs.stat(src), fs.stat(dest)]);
  const saved = (100 * (1 - b.size / a.size)).toFixed(0);
  console.log(`  ✓ ${outBase}.webp  ${kb(a.size)} -> ${kb(b.size)}  (-${saved}%)`);
}

async function generateIcons() {
  // Favicon + apple-icon from the chameleon mark. Next.js auto-wires app/icon.png.
  const mark = path.join(SRC, "Camaleonte_bordeaux.png");
  const appDir = path.join(ROOT, "app");
  await fs.mkdir(appDir, { recursive: true });

  // Transparent favicon, trimmed + padded square.
  const trimmed = await sharp(mark)
    .trim({ threshold: 12 })
    .resize(404, 404, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 54, bottom: 54, left: 54, right: 54, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(appDir, "icon.png"), trimmed);

  // Apple touch icon on the brand ink, mark in white for contrast.
  const markWhite = await sharp(path.join(SRC, "Camaleonte_bianco.png"))
    .trim({ threshold: 12 })
    .resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({
    create: { width: 180, height: 180, channels: 4, background: "#14110F" },
  })
    .composite([{ input: markWhite, gravity: "center" }])
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));

  console.log("  ✓ app/icon.png + app/apple-icon.png");
}

async function generateOg() {
  // 1200x630 OpenGraph card — ink field, white wordmark, bordeaux tagline.
  const W = 1200;
  const H = 630;
  const wordmark = await sharp(path.join(SRC, "PACA'S_white.png"))
    .trim({ threshold: 12 })
    .resize({ width: 560, withoutEnlargement: true })
    .toBuffer();
  const wmMeta = await sharp(wordmark).metadata();

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
          stroke="#3A332E" stroke-width="1"/>
    <text x="${W / 2}" y="${H / 2 + 96}" text-anchor="middle"
          font-family="Helvetica, Arial, sans-serif" font-size="26"
          letter-spacing="14" fill="#A93B3B">BUILT&#160;&#160;TO&#160;&#160;ADAPT</text>
    <text x="${W / 2}" y="${H - 70}" text-anchor="middle"
          font-family="Helvetica, Arial, sans-serif" font-size="20"
          letter-spacing="8" fill="#8C7E6A">PACA&#8217;S&#160;LAB &#183; MADE IN ITALY</text>
  </svg>`;

  await sharp({ create: { width: W, height: H, channels: 4, background: "#14110F" } })
    .composite([
      {
        input: wordmark,
        top: Math.round(H / 2 - (wmMeta.height ?? 120) / 2 - 24),
        left: Math.round(W / 2 - (wmMeta.width ?? 560) / 2),
      },
      { input: Buffer.from(svg), top: 0, left: 0 },
    ])
    .png()
    .toFile(path.join(ROOT, "public", "og.png"));

  console.log("  ✓ public/og.png");
}

async function main() {
  console.log(`\nPaca's Lab · asset pipeline${FORCE ? " (force)" : ""}\n`);

  console.log("Logos");
  for (const [src, out] of LOGOS) {
    await convert(src, out, {
      trim: true,
      webp: { lossless: true, effort: 6 },
    });
  }

  console.log("\nProducts");
  for (const p of PRODUCTS) {
    await convert(p.src, p.out, {
      extract: p.extract,
      maxWidth: 1800,
      webp: { quality: 80, effort: 6, smartSubsample: true },
    });
  }

  console.log("\nBrand art");
  await generateIcons();
  await generateOg();

  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
