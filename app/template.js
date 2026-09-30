"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

const EASE_WIPE = [0.76, 0, 0.24, 1];

// template.js remounts on every navigation, so this plays on each page change.
// On the very first load the splash is still running, so the wipe is skipped.
export default function Template({ children }) {
  const { done } = useIntro();
  const [wipe] = useState(done);

  return (
    <>
      {wipe && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-glow"
            initial={{ x: "0%", skewX: 0 }}
            animate={{ x: "-130%", skewX: -14 }}
            transition={{ duration: 0.7, ease: EASE_WIPE, delay: 0.12 }}
          />
          <motion.div
            className="speed-streaks absolute inset-0 bg-brand-900"
            initial={{ x: "0%", skewX: 0 }}
            animate={{ x: "-130%", skewX: -14 }}
            transition={{ duration: 0.7, ease: EASE_WIPE }}
          />
        </div>
      )}
      {children}
    </>
  );
}