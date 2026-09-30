"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CREW } from "@/data/crew";

const CHAMFER =
  "[clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,0_100%)]";

// Desktop fan positions: stacked by default, spread apart when the deck is hovered
const FAN = [
  "lg:-translate-x-[14%] lg:-rotate-8 lg:group-hover/deck:-translate-x-[104%] lg:group-hover/deck:-rotate-3",
  "lg:z-10 lg:group-hover/deck:-translate-y-[3%]",
  "lg:translate-x-[14%] lg:rotate-8 lg:group-hover/deck:translate-x-[104%] lg:group-hover/deck:rotate-3",
];

function CrewCard({ rider, fanClass }) {
  const [error, setError] = useState(false);

  return (
    <article
      className={`group/card relative aspect-[3/4] w-[72vw] shrink-0 snap-center overflow-hidden bg-brand-900 transition-[translate,rotate] duration-700 ease-out-expo sm:w-[44vw] lg:absolute lg:left-1/2 lg:top-0 lg:-ml-[9.5rem] lg:w-[19rem] lg:hover:z-20 ${CHAMFER} ${fanClass}`}
    >
      {error ? (
        <div aria-hidden="true" className="speed-streaks absolute inset-0" />
      ) : (
        <Image
          src={rider.image}
          alt={`${rider.name}, VOLTEX ${rider.discipline.toLowerCase()} rider`}
          fill
          sizes="(min-width: 1024px) 304px, (min-width: 640px) 44vw, 72vw"
          onError={() => setError(true)}
          className="object-cover grayscale transition duration-700 ease-out-expo group-hover/card:scale-105 group-hover/card:grayscale-0"
        />
      )}

      {/* Readability gradient + blue tint on hover */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand-500 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover/card:opacity-60"
      />

      {/* Race number */}
      <span
        aria-hidden="true"
        className="text-kinetic text-outline absolute left-4 top-3 text-[5rem] opacity-80 [--outline-color:var(--color-bone)]"
      >
        {rider.number}
      </span>

      {/* Details */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="label-mono inline-block bg-glow px-2 py-1 text-[0.6rem] text-bone">
          {rider.discipline}
        </span>
        <h3 className="text-kinetic mt-3 text-[2.25rem] text-bone">{rider.name}</h3>
        <p className="label-mono mt-2 text-bone/60">{rider.base}</p>
      </div>
    </article>
  );
}

export default function CrewDeck() {
  const riders = CREW.slice(0, 3);

  return (
    <section
      id="crew"
      aria-labelledby="crew-title"
      className="relative overflow-x-clip bg-ink px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="crew-title"
            eyebrow="Sponsored riders"
            lines={[{ text: "Meet" }, { text: "The Crew", outline: true }]}
          />
          <div className="max-w-sm">
            <p className="text-bone/70">
              Three riders, three disciplines, one kit. They break our gear so
              you don&apos;t have to.
            </p>
            <Link
              href="/crew"
              className="group mt-6 inline-flex h-12 -skew-x-12 items-center border-2 border-bone px-6 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              <span className="text-kinetic flex skew-x-12 items-center gap-2 text-xl">
                Meet the Crew
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Deck: swipe strip on mobile, fanned stack on desktop */}
        <div className="group/deck -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:relative lg:mx-auto lg:mt-16 lg:block lg:h-[27rem] lg:max-w-4xl lg:overflow-visible lg:px-0 lg:pb-0">
          {riders.map((rider, i) => (
            <CrewCard key={rider.id} rider={rider} fanClass={FAN[i]} />
          ))}
        </div>

        <p className="label-mono mt-6 hidden text-center text-bone/40 lg:block">
          Hover the deck to fan it out
        </p>
        <p className="label-mono mt-2 text-center text-bone/40 lg:hidden">
          Swipe →
        </p>
      </div>
    </section>
  );
}