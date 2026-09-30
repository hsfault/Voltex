"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

const EASE_OUT = [0.16, 1, 0.3, 1];
const MASK =
  "radial-gradient(ellipse 72% 72% at 50% 50%, #000 50%, transparent 100%)";

function HeroImage({ image, play }) {
  const [error, setError] = useState(false);
  if (error) return null;

  const hidden = { opacity: 0, scale: 1.08, filter: "blur(12px)" };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <div className="relative">
      {/* Blue glow behind the image */}
      <div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgb(47_134_255/0.35),transparent_70%)] blur-2xl"
      />
      <motion.div
        className="relative aspect-[4/3] w-full"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        initial={hidden}
        animate={play ? shown : hidden}
        transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.25 }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          onError={() => setError(true)}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export default function PageHero({ crumb, eyebrow, lines, description, image }) {
  const { done: play } = useIntro();

  return (
    <section className="bg-hero relative overflow-hidden px-4 pb-14 pt-32 [--spot-x:78%] [--spot-y:35%] sm:px-6 lg:px-10 lg:pb-20 lg:pt-36">
      <div aria-hidden="true" className="speed-streaks pointer-events-none absolute inset-0" />

      <div
        className={`relative mx-auto max-w-7xl ${
          image ? "grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12" : ""
        }`}
      >
        {/* Text */}
        <div>
          <nav aria-label="Breadcrumb" className="label-mono flex items-center gap-2 text-bone/50">
            <Link href="/" className="flex min-h-11 items-center hover:text-bone">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-brand-300">
              {crumb}
            </span>
          </nav>

          <motion.p
            className="label-mono mt-4 text-glow"
            initial={{ opacity: 0, y: 10 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {eyebrow}
          </motion.p>

          <h1
            className={`text-kinetic mt-4 text-bone ${
              image
                ? "text-[length:clamp(4rem,11vw,9.5rem)]"
                : "text-[length:clamp(4rem,14vw,12rem)]"
            }`}
          >
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.04em] pr-[0.1em] pt-[0.08em]">
                <motion.span
                  className={`block ${line.outline ? "text-outline" : ""}`}
                  initial={{ y: "110%", skewY: 6 }}
                  animate={play ? { y: "0%", skewY: 0 } : { y: "110%", skewY: 6 }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 + i * 0.1 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          {description && (
            <motion.p
              className="mt-8 max-w-md text-bone/75"
              initial={{ opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Image */}
        {image && <HeroImage image={image} play={play} />}
      </div>
    </section>
  );
}