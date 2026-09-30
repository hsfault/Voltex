"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FAQS } from "@/data/contact";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="border-t border-bone/10 bg-ink px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          lines={[{ text: "Quick" }, { text: "Answers", outline: true }]}
        />

        <div className="border-t border-bone/10">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-bone/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span
                      className={`text-kinetic text-[length:clamp(1.5rem,3vw,2rem)] transition-colors ${
                        isOpen ? "text-glow" : "text-bone group-hover:text-brand-300"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 shrink-0 place-items-center border border-bone/20 text-xl text-glow transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-bone/70">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}