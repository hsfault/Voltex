"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1];

const STATS = [
  { value: 48, suffix: "", label: "Countries shipped" },
  { value: 120, suffix: "K", label: "Riders suited up" },
  { value: 500, suffix: "+", label: "Crash-test hours per piece" },
  { value: 9, suffix: "", label: "Years of testing" },
];

function Stat({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const line = useMotionValue(0);
  const display = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-US")
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(stat.value);
      line.set(1);
      return;
    }
    const opts = { duration: 1.8, ease: EASE_OUT, delay: index * 0.12 };
    const countAnim = animate(count, stat.value, opts);
    const lineAnim = animate(line, 1, opts);
    return () => {
      countAnim.stop();
      lineAnim.stop();
    };
  }, [inView, reduce, count, line, stat.value, index]);

  return (
    <div
      ref={ref}
      className="relative border-bone/10 px-4 py-10 even:border-l sm:px-6 lg:border-l lg:px-8 lg:py-14 lg:first:border-l-0"
    >
      {/* Glowing line that draws in with the count */}
      <div className="absolute inset-x-0 top-0 h-px bg-bone/10">
        <motion.div
          style={{ scaleX: line }}
          className="h-full origin-left bg-glow shadow-[0_0_10px_var(--color-glow)]"
        />
      </div>

      <p className="label-mono text-bone/40">
        /{String(index + 1).padStart(2, "0")}
      </p>
      <p className="text-kinetic mt-4 whitespace-nowrap pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(3rem,7vw,6.5rem)] text-bone">
        <motion.span>{display}</motion.span>
        <span className="text-glow glow-text">{stat.suffix}</span>
      </p>
      <p className="label-mono mt-3 text-bone/60">{stat.label}</p>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section aria-labelledby="stats-title" className="relative bg-ink">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-10">
        <p id="stats-title" className="label-mono px-4 pb-6 text-bone/50 sm:px-4 lg:px-0">
          VOLTEX by the numbers
        </p>
        <div className="grid grid-cols-2 border-b border-bone/10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}