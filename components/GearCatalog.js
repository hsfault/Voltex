"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GearTile from "./GearTile";
import QuickViewDrawer from "./QuickViewDrawer";
import { CATEGORIES, GEAR } from "@/data/gear";

const EASE_OUT = [0.16, 1, 0.3, 1];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name: A–Z" },
];

const PERKS = [
  { title: "30-day returns", text: "Wrong fit? Send it back unworn and we cover the label." },
  { title: "CE certified", text: "Every armored piece is tested to CE Level 1 or Level 2." },
  { title: "Crash replacement", text: "Helmet down in year one? Get 40% off a new shell." },
];

export default function GearCatalog({ initialCategory = "All" }) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);

  // Update the URL without a reload so filtered views can be shared
  const changeCategory = (cat) => {
    setCategory(cat);
    const url = cat === "All" ? "/gear" : `/gear?category=${encodeURIComponent(cat)}`;
    window.history.replaceState(null, "", url);
  };

  const products = useMemo(() => {
    const list = category === "All" ? [...GEAR] : GEAR.filter((p) => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, sort]);

  return (
    <section aria-label="Gear catalog" className="bg-ink px-4 pb-24 pt-10 sm:px-6 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Toolbar */}
        <div className="flex flex-col gap-5 border-b border-bone/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter gear by category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:pb-0"
          >
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeCategory(cat)}
                  className={`relative h-11 shrink-0 -skew-x-12 border px-5 transition-colors ${
                    active
                      ? "border-brand-500 text-bone"
                      : "border-bone/20 text-bone/70 hover:border-bone/50 hover:text-bone"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="catalog-chip"
                      className="absolute inset-0 bg-brand-500"
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    />
                  )}
                  <span className="label-mono relative inline-block skew-x-12">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p aria-live="polite" className="label-mono text-bone/50">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
            <label className="flex items-center gap-3">
              <span className="label-mono text-bone/50">Sort</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-11 appearance-none border border-bone/20 bg-steel pl-4 pr-10 font-mono text-sm text-bone outline-none transition-colors focus:border-glow"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bone/60"
                >
                  ▾
                </span>
              </span>
            </label>
          </div>
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

        {/* Perks */}
        <ul className="mt-20 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-3">
          {PERKS.map((perk, i) => (
            <li key={perk.title} className="bg-ink p-6 lg:p-8">
              <p className="label-mono text-bone/40">/{String(i + 1).padStart(2, "0")}</p>
              <p className="text-kinetic mt-3 text-3xl text-bone">{perk.title}</p>
              <p className="mt-2 text-sm text-bone/60">{perk.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <QuickViewDrawer product={quick} onClose={closeQuick} />
    </section>
  );
}