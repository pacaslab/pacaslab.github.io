/**
 * Central registry of campaign imagery. One place to swap photos as new
 * shoots arrive (the brief promises more). Alt text is localized at the call
 * site via the dictionaries; these are the raw asset paths + intrinsic ratios.
 */
export const media = {
  hero: {
    video: "/assets/video/hero.mp4",
    poster: "/assets/video/hero-poster.webp",
  },
  // The campaign still life: the PACA'S package, warm light, terrazzo floor.
  package: { src: "/assets/editorial/package.webp", ratio: "9/16" },
  packageDetail: { src: "/assets/editorial/package-detail.webp", ratio: "3/2" },
  // Backstage frames pulled from the campaign film.
  curtain: { src: "/assets/editorial/curtain.webp", ratio: "9/16" },
  gap: { src: "/assets/editorial/gap.webp", ratio: "9/16" },
  turn: { src: "/assets/editorial/turn.webp", ratio: "9/16" },
  walk: { src: "/assets/editorial/walk.webp", ratio: "9/16" },
  backstage1: { src: "/assets/stills/backstage-01.webp", ratio: "9/16" },
  backstage2: { src: "/assets/stills/backstage-02.webp", ratio: "9/16" },
  backstage3: { src: "/assets/stills/backstage-03.webp", ratio: "9/16" },
} as const;
