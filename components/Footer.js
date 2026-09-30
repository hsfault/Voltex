"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import { useLenis } from "./LenisProvider";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Helmets", href: "/gear?category=Helmets" },
      { label: "Jackets", href: "/gear?category=Jackets" },
      { label: "Gloves", href: "/gear?category=Gloves" },
      { label: "Boots", href: "/gear?category=Boots" },
    ],
  },
  {
    title: "Ride",
    links: [
      { label: "Night Run", href: "/#night-run" },
      { label: "The Crew", href: "/crew" },
      { label: "Size guide", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & returns", href: "#" },
      { label: "Warranty", href: "#" },
    ],
  },
];

const SOCIALS = ["Instagram", "YouTube", "TikTok"];

export default function Footer() {
  const wordRef = useRef(null);
  const lenis = useLenis();

  // Wordmark fills left → right as you reach the bottom of the page
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end end"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const scanLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scanOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      {/* Top: brand + link columns */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 pt-20 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
            Armored riding gear for the street, the canyon and the track.
            Designed after dark.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="label-mono flex h-11 items-center border border-bone/20 px-4 text-bone/70 transition-colors hover:border-glow hover:text-bone"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label-mono text-glow">{col.title}</p>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex min-h-11 items-center gap-2 text-bone/70 transition-colors hover:text-bone"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-glow transition-all duration-300 group-hover:w-4"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Giant wordmark: outline + scroll-driven fill + scan line */}
      <div ref={wordRef} aria-hidden="true" className="relative select-none">
        <p className="text-kinetic text-outline whitespace-nowrap pb-[0.04em] pt-[0.08em] text-center text-[length:31vw] [--outline-color:rgb(238_242_247/0.18)]">
          Voltex
        </p>
        <motion.p
          style={{ clipPath: clip }}
          className="text-kinetic absolute inset-0 whitespace-nowrap bg-linear-to-r from-brand-300 via-bone to-brand-300 bg-clip-text pb-[0.04em] pt-[0.08em] text-center text-[length:31vw] text-transparent"
        >
          Voltex
        </motion.p>
        <motion.span
          style={{ left: scanLeft, opacity: scanOpacity }}
          className="absolute inset-y-[8%] w-[3px] bg-glow shadow-[0_0_24px_6px_var(--color-glow)]"
        />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p className="label-mono text-bone/40">
            © 2026 VOLTEX Moto Co. — Concept site by Arcline Studio
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a href="#" className="label-mono flex min-h-11 items-center px-2 text-bone/40 hover:text-bone">
              Privacy
            </a>
            <a href="#" className="label-mono flex min-h-11 items-center px-2 text-bone/40 hover:text-bone">
              Terms
            </a>
            <button
              type="button"
              onClick={toTop}
              className="label-mono flex h-11 items-center gap-2 border border-bone/20 px-4 text-bone/70 transition-colors hover:border-glow hover:text-bone"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}