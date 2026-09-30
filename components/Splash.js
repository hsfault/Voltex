"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { useLenis } from "./LenisProvider";

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_WIPE = [0.76, 0, 0.24, 1];
const EASE_SCAN = [0.65, 0, 0.35, 1];
const LIGHTS = 5;
const IS_DEV = process.env.NODE_ENV !== "production";

const WORDMARK =
  "text-kinetic select-none pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(4.5rem,18vw,12rem)]";

// OUTRO (unchanged): each layer slides off to the left with a slant
const layer = (delay) => ({
  visible: { x: "0%", skewX: 0 },
  exit: {
    x: "-130%",
    skewX: -14,
    transition: { duration: 0.75, ease: EASE_WIPE, delay },
  },
});

const wrapper = {
  visible: { opacity: 1 },
  exit: { opacity: 1, transition: { when: "afterChildren", duration: 0.01 } },
};

export default function Splash() {
  const { done, finish } = useIntro();
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const [lit, setLit] = useState(0);
  const [launched, setLaunched] = useState(false);

  // Launch sequence timeline
  useEffect(() => {
    if (IS_DEV) console.info("[Splash] mounted, launch sequence started");

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    if (reduce) {
      at(150, () => setLit(LIGHTS));
      at(600, () => {
        setLit(0);
        setLaunched(true);
      });
      at(800, finish);
    } else {
      for (let i = 1; i <= LIGHTS; i++) {
        at(750 + (i - 1) * 190, () => setLit(i));
      }
      at(1800, () => {
        setLit(0);
        setLaunched(true);
      });
      at(2050, () => {
        if (IS_DEV) console.info("[Splash] finished, revealing page");
        finish();
      });
    }

    return () => timers.forEach(clearTimeout);
  }, [finish, reduce]);

  // Lock scrolling while the splash is up
  useEffect(() => {
    if (done) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [done, lenis]);

  const status = launched
    ? "Go"
    : lit === 0
    ? "Ignition"
    : `Engine start — ${lit}/${LIGHTS}`;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          role="status"
          aria-label="Loading VOLTEX Moto Co."
          variants={wrapper}
          initial="visible"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Back panels revealed during the sweep (outro) */}
          <motion.div variants={layer(0.24)} className="absolute inset-0 bg-bone" />
          <motion.div variants={layer(0.12)} className="absolute inset-0 bg-glow" />

          {/* Main splash panel */}
          <motion.div
            variants={layer(0)}
            className="speed-streaks absolute inset-0 bg-brand-900"
          >
            {/* Corners */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
              <div className="flex items-center gap-2 text-bone/70">
                <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="h-5 w-5 -skew-x-12">
                  <path d="M2 5h7.5l6.5 15 6.5-15H30L19.5 27h-7z" />
                </svg>
                <span className="label-mono">Moto Co.</span>
              </div>
              <span className="label-mono text-bone/50">Season 01</span>
            </div>

            {/* Centre */}
            <div className="flex h-full flex-col items-center justify-center px-4">
              {/* Wordmark: ghost outline + scan-line fill, lurches on launch */}
              <motion.div
                className="relative"
                animate={
                  launched
                    ? { x: "5%", skewX: -10 }
                    : { x: "0%", skewX: 0 }
                }
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <p
                  aria-hidden="true"
                  className={`${WORDMARK} text-outline opacity-25 [--outline-color:var(--color-brand-300)]`}
                >
                  Voltex
                </p>

                <motion.p
                  aria-hidden="true"
                  className={`${WORDMARK} absolute inset-0 text-bone`}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.9, ease: EASE_SCAN, delay: 0.25 }}
                >
                  Voltex
                </motion.p>

                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-[6%] -top-[6%] w-[3px] bg-glow shadow-[0_0_24px_6px_var(--color-glow)]"
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{
                    left: { duration: 0.9, ease: EASE_SCAN, delay: 0.25 },
                    opacity: { duration: 0.9, times: [0, 0.1, 0.85, 1], delay: 0.25 },
                  }}
                />
              </motion.div>

              {/* LED start strips */}
              <div aria-hidden="true" className="mt-10 flex items-center gap-3 sm:gap-4">
                {Array.from({ length: LIGHTS }, (_, i) => {
                  const on = i < lit;
                  return (
                    <span
                      key={i}
                      className={`h-2.5 w-8 -skew-x-12 border transition-all duration-150 sm:h-3 sm:w-12 ${
                        on
                          ? "border-glow bg-glow shadow-[0_0_18px_4px_var(--color-glow)]"
                          : "border-bone/25 bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Status line */}
              <div className="mt-5 h-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={launched ? "go" : "ready"}
                    className={`label-mono ${launched ? "text-glow glow-text" : "text-bone/60"}`}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.2 }}
                  >
                    {status}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}