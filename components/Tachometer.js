"use client";

import { motion, useTransform } from "framer-motion";

const C = 60;
const START = -135;
const SWEEP = 270;

const polar = (r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
};

// 25 ticks = 0 to 12k in 500 rpm steps
const TICKS = Array.from({ length: 25 }, (_, i) => {
  const deg = START + (i / 24) * SWEEP;
  const major = i % 2 === 0;
  const [x1, y1] = polar(major ? 39 : 42, deg);
  const [x2, y2] = polar(46, deg);
  return { i, x1, y1, x2, y2, major, redline: i >= 20 };
});

const LABELS = [0, 2, 4, 6, 8, 10, 12].map((v) => {
  const [x, y] = polar(31, START + (v / 12) * SWEEP);
  return { v, x, y };
});

const ARC = "M 26.06 93.94 A 48 48 0 1 1 93.94 93.94";
const REDLINE_ARC = "M 108 60 A 48 48 0 0 1 93.94 93.94";

export default function Tachometer({ progress, className = "" }) {
  const rotate = useTransform(progress, [0, 1], [START, START + SWEEP]);
  const rpm = useTransform(progress, (v) =>
    (Math.round(Math.min(Math.max(v, 0), 1) * 120) * 100).toLocaleString("en-US")
  );

  return (
    <div
      role="img"
      aria-label="Tachometer that revs up as you scroll"
      className={`relative aspect-square rounded-full bg-ink/40 text-bone backdrop-blur-sm ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeOpacity="0.15" />

        {/* Track */}
        <path d={ARC} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" strokeLinecap="round" />

        {/* Live progress */}
        <motion.path
          d={ARC}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        {/* Redline zone */}
        <path d={REDLINE_ARC} fill="none" stroke="var(--color-glow)" strokeWidth="3" strokeLinecap="round" />

        {TICKS.map((t) => (
          <line
            key={t.i}
            x1={t.x1.toFixed(2)}
            y1={t.y1.toFixed(2)}
            x2={t.x2.toFixed(2)}
            y2={t.y2.toFixed(2)}
            stroke={t.redline ? "var(--color-glow)" : "currentColor"}
            strokeOpacity={t.major ? 0.9 : 0.4}
            strokeWidth={t.major ? 1.5 : 1}
          />
        ))}

        {LABELS.map((l) => (
          <text
            key={l.v}
            x={l.x.toFixed(2)}
            y={l.y.toFixed(2)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7"
            fill="currentColor"
            fillOpacity="0.7"
            className="font-mono"
          >
            {l.v}
          </text>
        ))}
      </svg>

      {/* Needle */}
      <motion.div
        style={{ rotate }}
        className="absolute bottom-1/2 left-1/2 -ml-px h-[33%] w-[2px] origin-bottom rounded-full bg-glow shadow-[0_0_10px_var(--color-glow)]"
      />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-glow bg-ink" />

      {/* Readout */}
      <div className="absolute inset-x-0 bottom-[12%] text-center leading-none">
        <motion.span className="block font-mono text-[10px] text-bone sm:text-xs">
          {rpm}
        </motion.span>
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-bone/50 sm:text-[8px]">
          rpm
        </span>
      </div>
    </div>
  );
}