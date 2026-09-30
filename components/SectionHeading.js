"use client";

import { motion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
};

const line = {
  hidden: { y: "110%", skewY: 6 },
  shown: { y: "0%", skewY: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export default function SectionHeading({
  id,
  eyebrow,
  lines,
  className = "",
  eyebrowClassName = "text-glow",
}) {
  return (
    <div className={className}>
      <motion.p
        className={`label-mono ${eyebrowClassName}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        id={id}
        variants={container}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
        className="text-kinetic mt-4 text-[length:clamp(3.5rem,11vw,9rem)] text-bone"
      >
        {lines.map((item, i) => (
          <span key={i} className="block overflow-hidden pb-[0.04em] pr-[0.1em] pt-[0.08em]">
            <motion.span
              variants={line}
              className={`block ${item.outline ? "text-outline" : ""}`}
            >
              {item.text}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </div>
  );
}