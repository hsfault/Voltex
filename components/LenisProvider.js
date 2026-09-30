"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import "lenis/dist/lenis.css";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Create Lenis once (skipped entirely for reduced-motion users)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    setLenis(instance);

    // Drive Lenis from Framer Motion's frame loop so scrolling and
    // scroll-linked animations always update in the same frame
    const update = ({ timestamp }) => instance.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Jump to top on route change
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}