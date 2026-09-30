"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const EASE_OUT = [0.16, 1, 0.3, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CHECKER_STYLE = {
  backgroundImage:
    "conic-gradient(var(--color-ink) 25%, var(--color-bone) 0 50%, var(--color-ink) 0 75%, var(--color-bone) 0)",
  backgroundSize: "16px 16px",
};

function CheckeredFlag() {
  const cols = 8;
  const rows = 5;

  return (
    <div aria-hidden="true" className="grid w-40 grid-cols-8 sm:w-48">
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const dark = (r + c) % 2 === 0;
        return (
          <motion.span
            key={i}
            className={`aspect-square ${dark ? "bg-ink" : "bg-bone"}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -3, 0] }}
            transition={{
              scale: { duration: 0.3, ease: EASE_OUT, delay: (r + c) * 0.04 },
              opacity: { duration: 0.2, delay: (r + c) * 0.04 },
              y: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6 + c * 0.08,
              },
            }}
          />
        );
      })}
    </div>
  );
}

export default function PitLaneCTA() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | sending | done

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // Demo only: no real signup, just simulate a short request
    setTimeout(() => setStatus("done"), 900);
  };

  const reset = () => {
    setEmail("");
    setStatus("idle");
  };

  return (
    <section
      id="pit-lane"
      aria-labelledby="pit-lane-title"
      className="relative overflow-hidden bg-brand-500"
    >
      {/* Checkered racing strip */}
      <div aria-hidden="true" className="h-4 w-full" style={CHECKER_STYLE} />

      <div aria-hidden="true" className="speed-streaks pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] top-1/2 aspect-square h-[140%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(122_176_255/0.45),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 lg:px-10 lg:py-28">
        {/* Heading */}
        <div>
          <SectionHeading
            id="pit-lane-title"
            eyebrow="Newsletter"
            eyebrowClassName="text-bone/80"
            lines={[{ text: "Join the" }, { text: "Pit Lane", outline: true }]}
          />
          <p className="mt-6 max-w-md text-bone/85">
            First look at new drops, crew ride reports and the occasional
            members-only sale. One email a month, tops.
          </p>
        </div>

        {/* Form / success */}
        <div className="lg:pb-4">
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <CheckeredFlag />
                <p className="text-kinetic mt-6 text-[length:clamp(2.5rem,6vw,4rem)] text-bone">
                  You&apos;re on the grid.
                </p>
                <p className="mt-3 max-w-sm text-bone/85">
                  Watch your inbox. The next drop lands with you first.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="label-mono mt-6 min-h-11 text-bone/80 underline underline-offset-4 hover:text-bone focus-visible:outline-bone"
                >
                  Use another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <label htmlFor={`${id}-email`} className="label-mono text-bone/80">
                  Email address
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id={`${id}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@ridemail.com"
                    aria-invalid={status === "error"}
                    aria-describedby={`${id}-msg`}
                    className="h-14 min-w-0 flex-1 border-2 border-bone/40 bg-ink/20 px-4 font-mono text-bone outline-none transition-colors placeholder:text-bone/40 focus:border-bone"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-14 -skew-x-12 bg-bone px-8 text-ink transition-colors hover:bg-ink hover:text-bone focus-visible:outline-bone disabled:opacity-70"
                  >
                    <span className="text-kinetic inline-block skew-x-12 text-2xl">
                      {status === "sending" ? "Sending…" : "Join →"}
                    </span>
                  </button>
                </div>
                <p
                  id={`${id}-msg`}
                  aria-live="polite"
                  className={`label-mono mt-3 min-h-5 ${
                    status === "error" ? "text-ink" : "text-bone/60"
                  }`}
                >
                  {status === "error"
                    ? "That email doesn't look right. Check it and try again."
                    : "No spam. Unsubscribe anytime."}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}