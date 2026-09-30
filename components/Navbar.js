"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/data/nav";
import { useGarage } from "@/context/GarageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { count, openGarage } = useGarage();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 40);

    if (menuOpen) return;
    if (Math.abs(current - previous) < 4) return;

    if (current > previous && current > 140) setHidden(true);
    else if (current < previous) setHidden(false);
  });

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? "border-b border-bone/10 bg-ink/80 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-10"
          >
            <Logo />

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative flex h-11 items-center px-4 text-kinetic text-2xl text-bone"
                    >
                      {link.label}
                      <span
                        className={`absolute inset-x-4 bottom-1.5 h-[3px] origin-left -skew-x-12 bg-bone transition-transform duration-300 ease-out-expo ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openGarage}
                aria-label={`Open garage, ${count} item${count === 1 ? "" : "s"}`}
                className="group flex h-11 min-w-11 -skew-x-12 items-center justify-center gap-2 border-2 border-bone px-3 text-bone transition-colors duration-200 hover:bg-bone hover:text-ink sm:px-4"
              >
                <span className="flex skew-x-12 items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 sm:hidden"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                  </svg>
                  <span className="label-mono hidden sm:inline">Garage</span>
                  <span className="grid h-6 min-w-6 place-items-center bg-bone px-1 font-mono text-xs font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-bone">
                    {count}
                  </span>
                </span>
              </button>

              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-11 w-11 place-items-center md:hidden"
              >
                <span className="flex w-7 flex-col items-end gap-1.5">
                  <span className="h-[3px] w-7 -skew-x-12 bg-bone" />
                  <span className="h-[3px] w-5 -skew-x-12 bg-bone" />
                  <span className="h-[3px] w-6 -skew-x-12 bg-bone" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}