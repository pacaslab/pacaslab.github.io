"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import { defaultLocale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Current locale, for client helpers (TransitionLink, LanguageSwitcher). */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Prefix an app-internal path with the active locale: "/manifesto" -> "/it/manifesto". */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return `/${locale}`;
  const seg = href.split("/")[1];
  if (seg === "it" || seg === "en") return href; // already localized
  return `/${locale}${href}`;
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
