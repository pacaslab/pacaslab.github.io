import type { Locale } from "./config";
import { it, type Dictionary } from "./dictionaries/it";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { it, en };

/** Synchronous dictionary lookup — all locales are bundled for static export. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export type { Locale } from "./config";
