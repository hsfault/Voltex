"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GearTile from "./GearTile";
import QuickViewDrawer from "./QuickViewDrawer";
import { CATEGORIES, GEAR } from "@/data/gear";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function SuitUp() {
  const [filter, setFilter] = useState("All");
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);

  const products = useMemo(
    () => (filter === "All" ? GEAR : GEAR.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section
      id="suit-up"
      aria-labelledby="suit-up-title"
      className="relative bg-ink px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="suit-up-title"
            eyebrow="The collection"
            lines={[{ text: "Suit Up" }, { text: "Season 01", outline: true }]}
          />
          <p className="max-w-sm text-bone/70">
            Eight pieces, every one crash-tested and road-proven. Hover to light
            them up, tap for the full spec.
          </p>
        </div>

        {/* Filter chips (scroll sideways on small phones) */}
        <div
          role="group"
          aria-label="Filter gear by category"
          className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          {CATEGORIES.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(cat)}
                className={`relative h-11 shrink-0 -skew-x-12 border px-5 transition-colors ${
                  active
                    ? "border-brand-500 text-bone"
                    : "border-bone/20 text-bone/70 hover:border-bone/50 hover:text-bone"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="chip-active"
                    className="absolute inset-0 bg-brand-500"
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  />
                )}
                <span className="label-mono relative inline-block skew-x-12">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul
          layout
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {products.map((product) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                <GearTile
                  product={product}
                  index={GEAR.indexOf(product)}
                  onQuickView={setQuick}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/gear"
            className="group inline-flex h-12 -skew-x-12 items-center border-2 border-bone px-6 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="text-kinetic flex skew-x-12 items-center gap-2 text-xl">
              View all gear
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>

      <QuickViewDrawer product={quick} onClose={closeQuick} />
    </section>
  );
}