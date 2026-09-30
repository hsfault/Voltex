"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const SPECS = [
  "CE Level 2 Armor",
  "3-Layer Shell",
  "Abrasion Tested",
  "Vented Chassis",
  "Reflective Piping",
  "Season 01",
];

const COPIES = 4;

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function TickerRow({ baseVelocity, textClass }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0 flex-nowrap">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {SPECS.map((spec) => (
              <span
                key={spec}
                className={`flex items-center gap-6 px-6 ${textClass}`}
              >
                {spec}
                <span
                  aria-hidden="true"
                  className="inline-block h-[0.7em] w-[0.3em] -skew-x-12 bg-current opacity-60"
                />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SpecTicker() {
  return (
    <section
      aria-label="Gear specifications"
      className="relative z-10 -mt-12 overflow-x-clip py-10 sm:-mt-16"
    >
      {/* Back strip */}
      <div className="-mx-[5vw] rotate-2 bg-steel py-3">
        <TickerRow baseVelocity={1} textClass="label-mono text-bone/60" />
      </div>

      {/* Front strip */}
      <div className="-mx-[5vw] -mt-8 -rotate-2 bg-brand-500 py-4 shadow-[0_20px_60px_-10px_rgb(30_79_224/0.6)]">
        <TickerRow
          baseVelocity={-1.2}
          textClass="text-kinetic text-[2rem] text-bone sm:text-[2.5rem]"
        />
      </div>
    </section>
  );
}