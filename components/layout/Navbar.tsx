"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { clsx } from "@/lib/clsx";

/**
 * Fixed header. Transparent and light while it overlays the dark hero, then
 * settles onto a frosted paper bar once the user scrolls. Mobile navigation is
 * a full-screen editorial overlay.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial",
          solid
            ? "border-b border-ink/10 bg-paper/80 text-ink backdrop-blur-xl"
            : "border-b border-transparent bg-transparent text-ink",
        )}
      >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          aria-label="Paca's Lab — home"
          onClick={() => setOpen(false)}
          className="group relative z-50 flex items-center gap-2.5"
        >
          <Logo
            mark="chameleon"
            variant="bordeaux"
            priority
            className="h-[24px] w-auto transition-transform duration-500 ease-editorial group-hover:-rotate-[7deg] md:h-7"
          />
          <Logo
            mark="wordmark"
            variant="black"
            priority
            className="h-3 w-auto translate-y-px transition-opacity duration-300 group-hover:opacity-60 md:h-[14px]"
          />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-[0.8rem] uppercase tracking-[0.14em] text-ink/75 transition-colors duration-300 ease-editorial hover:text-bordeaux"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="relative z-50 -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px w-6 bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px w-6 bg-current"
          />
        </button>
      </nav>
      </header>

      {/* Mobile overlay — rendered as a sibling of <header> so the header's
          backdrop-filter doesn't trap this fixed overlay in an ~80px box. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-paper text-ink md:hidden"
          >
            <ul className="container flex h-full flex-col justify-center gap-2">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl font-light tracking-tightest"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10 flex gap-6 text-sm text-clay"
              >
                {site.social.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                    {s.label}
                  </a>
                ))}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
