# DESIGN.md — Paca's Lab

## Palette (tailwind.config.ts)

| Token | Hex | Uso |
|---|---|---|
| `bordeaux` | #901818 | Firma: pannelli drench, indici, hover, CTA prodotto |
| `bordeaux-deep` | #6E1111 | Variante scura del bordeaux |
| `bordeaux-soft` | #A93B3B | Accenti su fondi scuri (leggibilità) |
| `velluto` | #310C11 | Le tende del video: hero, sipario transizioni, menu mobile |
| `velluto-deep` | #1E0709 | Overlay/vignettatura video |
| `ink` | #14110F | Sezioni scure, footer, testo su chiaro |
| `paper` | #F5F1EA | Canvas dominante (~60% del sito) |
| `sand` | #D8CBB4 | Capitolo "La firma", accenti materici |
| `clay` | #8C7E6A | Testo secondario su chiaro |

Strategia: Restrained su paper per la collezione; Drenched (bordeaux/velluto) nei momenti campagna. Mai #000/#fff puri (neutri caldi tinti verso il bordeaux).

## Color-morph ("il sito è il camaleonte")

`--bg`/`--fg` su `:root`, transizione 0.9s su `<body>` (globals.css). Le sezioni avvolte in `<Ambient theme="paper|sand|ink|velluto">` cambiano il canvas quando attraversano il centro viewport. I pannelli drench (`bg-bordeaux`, footer `bg-ink`) hanno fondo proprio e NON sono Ambient.

## Tipografia

Unica famiglia: Neue Haas Grotesk Display (`--font-haas`, next/font/local, woff2 in app/fonts).
Pesi caricati: 100 XXThin · 200 Thin · 400 Roman (+Italic) · 500 Medium · 900 Black.

Scala fluida (tailwind `fontSize`):
- `display-2xl` clamp(4.25rem→16vw→15rem) — wordmark footer, cover Manifesto
- `display-xl` — H1 hero/pagine
- `display-lg` — headline sezioni (peso Thin)
- `display-sm` — sottotitoli, numeri indice giganti
- `lead` — paragrafi d'apertura

Voce = contrasto estremo di peso: Black uppercase per gli statement, Thin per l'editoriale, Medium per label/nav (tracking 0.16–0.22em), Roman per il corpo. Italic solo Roman 400 (citazioni, enfasi). Numeri tabulari `.tnum` per il sistema 01–04.

## Motion

- Lenis smooth scroll (lerp 0.11), `anchors: true`.
- Transizione pagina: sipario `velluto` (ease curtain `cubic-bezier(0.76,0,0.24,1)`, 0.55s su / 0.7s giù) con flash del camaleonte bianco — `PageTransitionProvider` + `TransitionLink`.
- Reveal standard: clip-wipe + rise 0.9s ease editorial `cubic-bezier(0.16,1,0.3,1)`, once.
- Headline: `<Lines>` — righe che salgono da maschere, stagger 90–130ms.
- Hero: scale video 1→1.16 + parallax su scroll, cursore ±16px sul titolo (mouse only).
- Hover immagini: scale 1.045, 1100ms ease editorial + indice bordeaux che appare.
- `Magnetic` sulle CTA pill. `ParallaxY` per derive editoriali. `ChameleonDraw` (stroke SVG disegnato dallo scroll) nel Manifesto.
- Grain: `.grain` (feTurbulence data-URI, opacity 0.07, jitter steps) su video/pannelli drench.
- Tutto si spegne con `prefers-reduced-motion` (hook globale CSS + `useReducedMotion`).

## Camaleonte — mappa d'uso

| Dove | Come |
|---|---|
| Nav | `ChameleonMark` currentColor: si riadatta al morph (concept in miniatura) |
| Home intro | Watermark gigante opacity 0.045, deriva parallax |
| Manifesto cap. 02 | `ChameleonDraw` disegnato dallo scroll |
| Manifesto cap. 04 | Protagonista: bordeaux pieno su sand |
| Collezione header | Watermark ruotato opacity 0.04 |
| Transizione pagina | Flash bianco al centro del sipario |
| Footer | Watermark + ticker |

Regola: mai più di una presenza per viewport.

## Componenti chiave

`Ambient` (color-morph) · `PageTransitionProvider`/`TransitionLink` (sipario, prefissa la lingua) · `Lines` (headline mascherate) · `Reveal` (clip-wipe) · `Magnetic` · `ParallaxY` · `Ticker` (marquee) · `ChameleonMark`/`ChameleonDraw` (SVG dal tracciato `lib/chameleon-shape.ts`) · `ProductTile` (griglia sfalsata, niente card) · `ChromaShift`/`ScrollTint` (effetto camaleontico) · `LanguageSwitcher`.

## Effetto camaleontico (scroll-driven)

- `ChromaShift`: velo gradiente caldo (bordeaux→velluto, opacità ~0.4) che attraversa le foto su scroll — vira la dominante cromatica senza filtri. **Niente `mix-blend-mode`** (rompe gli screenshot headless, costoso/incoerente cross-browser): solo overlay translucido normale.
- `ScrollTint`: testo che vira tono (es. "Made in Italy", dichiarazione manifesto) da `--fg` a bordeaux e ritorno.
- Camaleonte watermark a bassa opacità in deriva `ParallaxY` (mai loop `animate` infiniti: girano fuori schermo e bloccano cattura/CPU).

## i18n (IT default / EN)

Static export friendly: tutte le pagine sotto `app/[lang]/` (`generateStaticParams` it+en). Root `app/page.tsx` (client) redirect a lingua browser. `lib/i18n/`: `config.ts` (locales), `dictionaries/{it,en}.ts` (`Dictionary = typeof it`, niente `as const`), `index.ts` `getDictionary`, `LocaleProvider` (`useLocale`/`localizedHref`). Le pagine (server) leggono `getDictionary(lang)` e passano slice ai componenti come prop. `LanguageSwitcher` cambia lingua sulla stessa pagina via sipario. URL `/it/...` `/en/...`; sitemap con `alternates`.

## Sezioni homepage (editoriale, ispirazione Zara)

Hero video · `BrandIntro` (headline gigante + ritratto sovrapposto) · `EditorialBand` (foto busta fullscreen + overlay "Made in Italy" ScrollTint) · `Diptych` (2 ritratti sfalsati + citazione in overlap) · Ticker · `CollectionPreview` · `ManifestoTeaser` (drench) · `FaqSection`. Manifesto: cover, dichiarazione, chi siamo, visione+ChameleonDraw, citazione drench, capitolo camaleonte immersivo, valori, chiusura CTA.

## Video

`public/assets/video/hero.mp4` (portrait 464×832, 15.5s, senza audio, 2.8MB) + poster webp. Autoplay muted loop playsInline; overlay gradiente velluto + vignettatura radiale + grain per mascherare l'upscale desktop. Still editoriali in `public/assets/stills/`.
