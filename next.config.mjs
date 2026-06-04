import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be served as plain files on GitHub Pages
  // (repo: pacaslab.github.io). No Node server at runtime.
  output: "export",

  // Pin the workspace root — a stray lockfile in $HOME otherwise confuses
  // Next's root inference.
  outputFileTracingRoot: __dirname,

  // We pre-convert every asset to optimized WebP ourselves (scripts/optimize-images.mjs),
  // so the built-in Image Optimization server is not needed.
  images: {
    unoptimized: true,
  },

  // GitHub Pages serves directories; trailing slashes keep links resolving cleanly.
  trailingSlash: true,

  // Lint is run separately (npm run lint); never let it block a static export build.
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
