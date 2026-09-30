"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Tachometer from "./Tachometer";
import { useIntro } from "@/context/IntroContext";

const EASE_OUT = [0.16, 1, 0.3, 1];

const BIKE_HIDDEN = { opacity: 0, x: "25%", filter: "blur(14px)" };
const BIKE_SHOWN = { opacity: 1, x: "0%", filter: "blur(0px)" };

// One big word: scroll moves the outer layer, the inner span does the entrance
function KineticLine({ children, x, delay, play, className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ x }}
      className={`relative ${className}`}
    >
      <div className="overflow-hidden pb-[0.04em] pr-[0.1em] pt-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: play ? "0%" : "110%" }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay }}
        >
          {children}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { done: play } = useIntro();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const still = ["0%", "0%"];
  const leanX = useTransform(scrollYProgress, [0, 1], reduce ? still : ["0%", "-30%"]);
  const intoX = useTransform(scrollYProgress, [0, 1], reduce ? still : ["0%", "24%"]);
  const itX = useTransform(scrollYProgress, [0, 1], reduce ? still : ["0%", "-18%"]);

  const bikeX = useTransform(scrollYProgress, [0, 1], reduce ? still : ["0%", "-10%"]);
  const bikeRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -8]);
  const bikeScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12]);

  const copyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-label="VOLTEX Season 01"
      className="relative h-[200svh]"
    >
      <div className="bg-hero sticky top-0 h-svh overflow-hidden [--spot-x:50%] [--spot-y:64%] lg:[--spot-x:62%] lg:[--spot-y:55%]">
        {/* Speed streak texture */}
        <div
          aria-hidden="true"
          className="speed-streaks pointer-events-none absolute inset-0"
        />

        {/* Kinetic words */}
        <h1 className="text-kinetic absolute inset-x-0 top-[12%] px-4 text-[length:clamp(4.5rem,min(20vw,20svh),15rem)] text-bone sm:px-6 lg:top-[13%] lg:px-10">
          <span className="sr-only">Lean into it</span>
          <KineticLine x={leanX} play={play} delay={0.2} className="z-10">
            Lean
          </KineticLine>
          <KineticLine x={intoX} play={play} delay={0.32} className="z-30 pl-[8vw]">
            <span className="text-outline">Into</span>
          </KineticLine>
          <KineticLine x={itX} play={play} delay={0.44} className="z-10 pl-[3vw]">
            <span className="glow-text">It</span>
          </KineticLine>
        </h1>

        {/* Bike: width capped by viewport height so it always fits */}
        <div className="absolute bottom-[17%] left-1/2 z-20 w-[min(96vw,calc((100svh_-_14rem)*1.094))] -translate-x-1/2 sm:bottom-[14%] sm:w-[min(72vw,calc((100svh_-_14rem)*1.094))] lg:bottom-[8%] lg:left-auto lg:right-[12vw] lg:w-[min(52vw,calc((100svh_-_12rem)*1.094))] lg:translate-x-0">
          <motion.div
            style={{
              x: bikeX,
              rotate: bikeRotate,
              scale: bikeScale,
              originX: 0.2,
              originY: 0.9,
            }}
          >
            <motion.div
              initial={BIKE_HIDDEN}
              animate={play ? BIKE_SHOWN : BIKE_HIDDEN}
              transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.3 }}
              className="relative"
            >
              {/* Ground shadow */}
              <div
                aria-hidden="true"
                className="absolute bottom-[2%] left-[8%] right-[6%] h-[9%] rounded-[50%] bg-black/70 blur-2xl"
              />

              <Image
                src="/images/bike.png"
                alt="Matte black sport motorcycle with glowing blue LED headlights"
                width={1312}
                height={1199}
                priority
                draggable={false}
                sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 96vw"
                className="relative h-auto w-full select-none"
              />

              {/* Headlight glow */}
              <div
                aria-hidden="true"
                className="animate-headlight pointer-events-none absolute left-[79%] top-[32%] h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(47_134_255/0.9)_0%,rgb(47_134_255/0.3)_40%,transparent_70%)] mix-blend-screen blur-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar: copy + CTA left, tachometer right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
          className="absolute inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 px-4 pb-6 sm:px-6 lg:px-10 lg:pb-10"
        >
          <motion.div style={{ opacity: copyOpacity }} className="max-w-xs">
            <p className="label-mono text-brand-300">Season 01 — Now shipping</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-bone/75 sm:block">
              Armor built for the street, the canyon and the track. Tested hard
              so you can ride harder.
            </p>
            <Link
              href="/gear"
              className="group mt-4 inline-flex h-12 -skew-x-12 items-center bg-bone px-6 text-ink transition-colors duration-200 hover:bg-glow hover:text-bone"
            >
              <span className="text-kinetic flex skew-x-12 items-center gap-2 text-[1.35rem]">
                Gear Up
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </motion.div>

          <Tachometer
            progress={scrollYProgress}
            className="w-20 shrink-0 sm:w-28 lg:w-36"
          />
        </motion.div>
      </div>
    </section>
  );
}