"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// done = splash finished, page entrance animations can play
const IntroContext = createContext({ done: true, finish: () => {} });

const FAILSAFE_MS = 4000;

export function IntroProvider({ children }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  // Safety net: never leave the page hidden if the splash fails to finish
  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[IntroProvider] Splash never called finish() — is <Splash /> inside <Providers> in app/layout.js?"
        );
      }
      setDone(true);
    }, FAILSAFE_MS);
    return () => clearTimeout(timer);
  }, [done]);

  const value = useMemo(() => ({ done, finish }), [done, finish]);

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);