"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Ambient } from "@/components/providers/Ambient";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

function FaqAccordionItem({
  number,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  number: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-paper/10 py-6">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-baseline justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-4 pr-4">
          <span className="tnum text-xs font-medium text-bordeaux-soft">{number}</span>
          <span className="text-base font-medium uppercase tracking-[0.06em] text-paper transition-opacity duration-300 group-hover:opacity-75 md:text-lg">
            {question}
          </span>
        </span>
        <span className="text-lg text-paper/40 transition-transform duration-300 ease-editorial group-hover:text-paper">
          {isOpen ? "—" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 max-w-prose pl-8 text-sm leading-relaxed text-paper/60 md:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection({ dict }: { dict: Dictionary["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Ambient theme="ink" className="py-32 md:py-44">
      <div className="container grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label">{dict.eyebrow}</p>
          </Reveal>
          <Lines
            as="h2"
            delay={0.08}
            className="mt-8 text-display-xl font-thin leading-[0.9] tracking-tightest"
            lines={[dict.titleA, <span key="w" className="font-black uppercase">{dict.titleB}</span>]}
          />
          <Reveal delay={0.18} className="mt-12 max-w-sm">
            <div className="space-y-8 border-t border-paper/15 pt-8">
              <div>
                <h3 className="label text-bordeaux-soft opacity-80">{dict.relationsTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{dict.relationsBody}</p>
              </div>
              <div>
                <h3 className="label text-bordeaux-soft opacity-80">{dict.channelTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{dict.channelBody}</p>
                <a
                  href={site.social[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-paper hover:text-bordeaux-soft"
                >
                  {dict.channelCta}&nbsp;&#8599;
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.15}>
            <div className="border-t border-paper/10">
              {dict.items.map((faq, i) => (
                <FaqAccordionItem
                  key={faq.q}
                  number={String(i + 1).padStart(2, "0")}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Ambient>
  );
}
