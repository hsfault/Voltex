"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import StudioImage, { STUDIO_BG } from "./StudioImage";
import { CREW } from "@/data/crew";
import { GEAR, formatPrice } from "@/data/gear";

const EASE_OUT = [0.16, 1, 0.3, 1];
const CHAMFER =
  "[clip-path:polygon(0_0,calc(100%_-_24px)_0,100%_24px,100%_100%,0_100%)]";
const CHECKER_STYLE = {
  backgroundImage:
    "conic-gradient(var(--color-ink) 25%, var(--color-bone) 0 50%, var(--color-ink) 0 75%, var(--color-bone) 0)",
  backgroundSize: "16px 16px",
};

// The whole row triggers; children animate through variants
const row = { hidden: {}, shown: {} };
const curtain = {
  hidden: { scaleY: 1 },
  shown: { scaleY: 0, transition: { duration: 1.1, ease: EASE_OUT } },
};
const photo = {
  hidden: { scale: 1.15 },
  shown: { scale: 1, transition: { duration: 1.4, ease: EASE_OUT } },
};
const textIn = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.15 } },
};

function Portrait({ rider }) {
  const [error, setError] = useState(false);
  const initials = rider.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className={`relative aspect-[3/4] overflow-hidden bg-brand-900 ${CHAMFER}`}>
      <motion.div variants={photo} className="absolute inset-0">
        {error ? (
          <div className="speed-streaks absolute inset-0 grid place-items-center">
            <span
              aria-hidden="true"
              className="text-kinetic text-outline text-[length:clamp(6rem,16vw,11rem)] opacity-40 [--outline-color:var(--color-brand-300)]"
            >
              {initials}
            </span>
          </div>
        ) : (
          <Image
            src={rider.image}
            alt={`${rider.name}, VOLTEX ${rider.discipline.toLowerCase()} rider`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            onError={() => setError(true)}
            className="object-cover"
          />
        )}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-transparent" />
      <span
        aria-hidden="true"
        className="text-kinetic text-outline absolute left-5 top-4 text-[length:clamp(5rem,12vw,8rem)] [--outline-color:var(--color-bone)]"
      >
        {rider.number}
      </span>
      <span className="label-mono absolute bottom-5 left-5 bg-glow px-2 py-1 text-[0.6rem] text-bone">
        {rider.discipline}
      </span>

      {/* Curtain that slides up to reveal the portrait */}
      <motion.div
        aria-hidden="true"
        variants={curtain}
        className="absolute inset-0 origin-top bg-ink"
      />
    </div>
  );
}

function RiderRow({ rider, index }) {
  const flip = index % 2 === 1;
  const kit = rider.kit.map((id) => GEAR.find((g) => g.id === id)).filter(Boolean);
  const stats = [
    ["Seasons", rider.seasons],
    ["Per year", rider.distance],
    ["Home road", rider.homeRoad],
  ];

  return (
    <motion.article
      aria-labelledby={`rider-${rider.id}`}
      variants={row}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-10 border-t border-bone/10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
    >
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <Portrait rider={rider} />
      </div>

      <motion.div
        variants={textIn}
        className={`lg:col-span-7 lg:self-center ${flip ? "lg:order-1" : ""}`}
      >
        <p className="label-mono text-glow">
          #{rider.number} — {rider.discipline}
        </p>
        <h2
          id={`rider-${rider.id}`}
          className="text-kinetic mt-3 pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(3.5rem,9vw,7.5rem)] text-bone"
        >
          {rider.name}
        </h2>
        <p className="label-mono mt-3 text-bone/50">{rider.base}</p>

        <blockquote className="mt-8 border-l-2 border-glow pl-5 text-lg italic text-bone/85">
          &ldquo;{rider.quote}&rdquo;
        </blockquote>
        <p className="mt-6 max-w-xl text-bone/70">{rider.bio}</p>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-bone/10 py-5">
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt className="label-mono text-bone/40">{label}</dt>
              <dd className="text-kinetic mt-2 text-[length:clamp(1.25rem,3vw,1.75rem)] text-bone">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="label-mono mt-8 text-bone/50">Signature kit</p>
        <ul className="mt-4 grid grid-cols-3 gap-3">
          {kit.map((item) => (
            <li key={item.id}>
              <Link href={`/gear?category=${item.category}`} className="group block">
                <div className={`relative isolate aspect-square overflow-hidden ${STUDIO_BG}`}>
                  <StudioImage
                    src={item.image}
                    alt={item.name}
                    sizes="(min-width: 1024px) 180px, 30vw"
                    fallbackLabel={item.category}
                    className="p-3 transition duration-500 ease-out-expo group-hover:scale-110"
                  />
                </div>
                <p className="text-kinetic mt-2 text-lg text-bone transition-colors group-hover:text-glow">
                  {item.name}
                </p>
                <p className="font-mono text-xs text-bone/60">{formatPrice(item.price)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}

export default function CrewRoster() {
  return (
    <>
      <section aria-label="Crew roster" className="bg-ink px-4 pb-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {CREW.map((rider, i) => (
            <RiderRow key={rider.id} rider={rider} index={i} />
          ))}
        </div>
      </section>

      {/* Apply CTA */}
      <section aria-labelledby="apply-title" className="relative overflow-hidden bg-brand-500">
        <div aria-hidden="true" className="h-4 w-full" style={CHECKER_STYLE} />
        <div aria-hidden="true" className="speed-streaks pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-28">
          <SectionHeading
            id="apply-title"
            eyebrow="Crew applications"
            eyebrowClassName="text-bone/80"
            lines={[{ text: "Ride for" }, { text: "Season 02", outline: true }]}
          />
          <div className="max-w-sm">
            <p className="text-bone/85">
              Applications for Season 02 are open. Tell us what you ride,
              where you ride it and why your gear should wear out first.
            </p>
            <Link
              href="/contact?topic=crew"
              className="group mt-6 inline-flex h-12 -skew-x-12 items-center bg-bone px-6 text-ink transition-colors hover:bg-ink hover:text-bone focus-visible:outline-bone"
            >
              <span className="text-kinetic flex skew-x-12 items-center gap-2 text-xl">
                Apply now
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}