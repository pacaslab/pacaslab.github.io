"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/providers/PageTransition";
import { useLocale, localizedHref } from "@/lib/i18n/LocaleProvider";

/**
 * Drop-in replacement for next/link that (1) prefixes app-internal paths with
 * the active locale and (2) routes through the velvet-curtain transition.
 * External links, hashes and modified clicks fall through to default behaviour.
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const navigate = usePageTransition();
  const locale = useLocale();

  const raw = typeof href === "string" ? href : href.pathname ?? "";
  const isInternal = raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("#");
  const resolved = isInternal ? localizedHref(raw, locale) : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    if (isInternal && typeof resolved === "string") {
      event.preventDefault();
      navigate(resolved);
    }
  };

  return <Link href={resolved} onClick={handleClick} {...props} />;
}
