"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useLenis } from "./LenisProvider";
import { NAV_LINKS } from "@/data/nav";

const MENU_LINKS = [{ href: "/", label: "Home" }, ...NAV_LINKS];

const EASE_WIPE = [0.76, 0, 0.24, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

// Slanted wipe coming in from the right edge
const wipe = {
  hidden: { clipPath: "polygon(120% 0%, 100% 0%, 100% 100%, 100% 100%)" },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, -20% 100%)",
    transition: { duration: 0.65, ease: EASE_WIPE },
  },
  exit: {
    clipPath: "polygon(120% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: { duration: 0.5, ease: EASE_WIPE, delay: 0.1 },
  },
};

const linkVariants = {
  hidden: { y: "110%", skewY: 6 },
  visible: (i) => ({
    y: "0%",
    skewY: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.3 + i * 0.07 },
  }),
  exit: { y: "110%", transition: { duration: 0.3, ease: EASE_WIPE } },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.65 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function MobileMenu({ open, onClose }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const closeRef = useRef(null);

  // Lock scroll, focus close button, Escape to close
  useEffect(() => {
    if (!open) return;

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  // Auto-close if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) onClose();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={wipe}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="speed-streaks fixed inset-0 z-[60] flex flex-col bg-brand-900 md:hidden"
        >
          {/* Top bar */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center"
            >
              <span className="relative block h-6 w-7">
                <span className="absolute left-0 top-1/2 h-[3px] w-7 -translate-y-1/2 rotate-45 bg-bone" />
                <span className="absolute left-0 top-1/2 h-[3px] w-7 -translate-y-1/2 -rotate-45 bg-bone" />
              </span>
            </button>
          </div>

          {/* Links */}
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center px-4 sm:px-6"
          >
            <ul className="space-y-1">
              {MENU_LINKS.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="overflow-hidden pt-2">
                    <motion.div custom={i} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`group flex min-h-11 items-baseline gap-4 py-1 ${
                          active ? "text-glow glow-text" : "text-bone"
                        }`}
                      >
                        <span className="label-mono w-8 shrink-0 opacity-70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-kinetic text-[clamp(3.5rem,17vw,6.5rem)] transition-transform duration-300 ease-out-expo group-hover:translate-x-3 group-active:translate-x-3">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer strip */}
          <motion.div
            variants={fade}
            className="flex items-end justify-between gap-4 border-t border-bone/15 px-4 py-6 sm:px-6"
          >
            <div>
              <p className="label-mono text-brand-300">Season 01</p>
              <p className="text-kinetic mt-1 text-2xl">Now shipping</p>
            </div>
            <a
              href="mailto:pitlane@voltexmoto.co"
              className="label-mono flex min-h-11 items-center text-bone underline-offset-4 hover:underline"
            >
              pitlane@voltexmoto.co
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}