"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "./LenisProvider";

const EASE = [0.76, 0, 0.24, 1];

export default function Drawer({ open, onClose, title, children }) {
  const lenis = useLenis();
  const panelRef = useRef(null);

  // Lock page scroll, focus the panel, Escape to close, restore focus after
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-bone/10 bg-steel shadow-[-30px_0_80px_-20px_rgb(0_0_0/0.8)] outline-none"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-bone/10 px-5">
              <h2 className="text-kinetic text-2xl text-bone">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-11 w-11 place-items-center"
              >
                <span className="relative block h-5 w-6">
                  <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rotate-45 bg-bone" />
                  <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 -rotate-45 bg-bone" />
                </span>
              </button>
            </header>

            {/* data-lenis-prevent lets this area scroll while Lenis is stopped */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}