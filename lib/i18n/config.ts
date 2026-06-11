/**
 * i18n configuration. Static-export friendly: locales are baked into the
 * route tree under app/[lang]. Adding a language = add the code here and a
 * dictionary file; the [lang] segment generates the rest.
 */
export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
