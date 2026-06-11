"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { clsx } from "@/lib/clsx";
import type { Dictionary } from "@/lib/i18n";
import { ChameleonMark } from "@/components/ui/ChameleonMark";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface NavbarProps {
  nav: Dictionary["nav"];
  lang: Dictionary["lang"];
}

/**
 * Fixed header that adapts to whatever section is underneath: text and the
 * chameleon mark inherit the morphing --fg. Mobile navigation is a full-screen
 * velvet overlay. The IT/EN switch lives here, integrated, not bolted on.
 */
export function Navbar({ nav, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items = [
    { label: nav.manifesto, href: "/manifesto" },
    { label: nav.collezione, href: "/collezione" },
  ];
  // Strip the locale prefix to detect the active route.
  const path = pathname.replace(/^\/(it|en)/, "").replace(/\/$/, "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-editorial",
          scrolled && !open && "backdrop-blur-md",
          open && "text-paper",
        )}
        style={
          scrolled && !open
            ? { backgroundColor: "color-mix(in oklab, var(--bg) 72%, transparent)" }
            : undefined
        }
      >
        <nav className="container flex h-16 items-center justify-between md:h-20">
          <TransitionLink
            href="/"
            aria-label="Paca's Lab — home"
            className="group relative z-50 flex items-center gap-3"
          >
            <ChameleonMark
              title="Camaleonte — Paca's Lab"
              className="h-6 w-auto transition-transform duration-500 ease-editorial group-hover:-rotate-[8deg] md:h-7"
            />
            <span className="translate-y-px text-[0.95rem] font-black uppercase leading-none tracking-[0.02em]">
              {site.wordmark}
            </span>
          </TransitionLink>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-10 md:flex">
            <ul className="flex items-center gap-10">
              {items.map((item) => {
                const active = path === item.href;
                return (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "text-[0.76rem] font-medium uppercase tracking-[0.18em] transition-opacity duration-300",
                        active
                          ? "border-b border-current pb-1 opacity-100"
                          : "link-underline opacity-70 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden className="h-4 w-px bg-current opacity-20" />
            <LanguageSwitcher labels={lang} />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? nav.close : nav.menu}
            aria-expanded={open}
            className="relative z-50 -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px w-6 bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px w-6 bg-current"
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay — the velvet room. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grain fixed inset-0 z-40 bg-velluto text-paper md:hidden"
          >
            <ChameleonMark className="pointer-events-none absolute -bottom-10 -right-12 w-[70%] text-paper opacity-[0.05]" />
            <div className="container relative z-10 flex h-full flex-col justify-center">
              <ul className="flex flex-col gap-3">
                {[{ label: nav.home, href: "/" }, ...items].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-4"
                  >
                    <span className="tnum text-xs font-medium text-bordeaux-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <TransitionLink
                      href={item.href}
                      className={clsx(
                        "block text-5xl font-thin tracking-tightest",
                        path === item.href && "italic opacity-60",
                      )}
                    >
                      {item.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-12 flex items-center justify-between"
              >
                <div className="flex gap-6 text-sm text-paper/60">
                  {site.social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                      {s.label}
                    </a>
                  ))}
                </div>
                <LanguageSwitcher labels={lang} className="text-paper" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
