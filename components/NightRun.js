"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import SectionHeading from "./SectionHeading";
import StudioImage, { STUDIO_BG } from "./StudioImage";
import { useLenis } from "./LenisProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useGarage } from "@/context/GarageContext";
import { CHAPTERS } from "@/data/nightRun";
import { GEAR, formatPrice } from "@/data/gear";

const PANELS = CHAPTERS.length + 1; // intro + chapters
const CHAMFER =
  "[clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,0_100%)]";

function ChapterBackground({ chapter }) {
  const [error, setError] = useState(false);
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${chapter.fallback}`}>
      {!error && (
        <Image
          src={chapter.image}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          onError={() => setError(true)}
          className="object-cover opacity-55"
        />
      )}
      {/* Single gradient overlay (tint baked in, no blend modes) */}
      <div className="absolute inset-0 bg-linear-to-t from-ink via-brand-900/75 to-brand-900/20 lg:bg-linear-to-r lg:from-ink lg:via-brand-900/70 lg:to-transparent" />
    </div>
  );
}

function IntroPanel({ horizontal }) {
  return (
    <article
      className={`bg-hero relative flex shrink-0 items-center overflow-hidden [--spot-x:25%] [--spot-y:50%] ${
        horizontal ? "h-svh w-screen" : "min-h-[70svh] w-full"
      }`}
    >
      <div aria-hidden="true" className="speed-streaks absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Night Run"
          lines={[{ text: "Three roads." }, { text: "One kit.", outline: true }]}
        />
        <p className="mt-6 max-w-md text-bone/75">
          From stoplights to switchbacks to the start line. Follow one ride
          after dark and see what the gear is really for.
        </p>
      </div>
    </article>
  );
}

function ChapterPanel({ chapter, horizontal }) {
  const { addItem } = useGarage();
  const product = GEAR.find((g) => g.id === chapter.gearId);
  const size = product.sizes[Math.floor(product.sizes.length / 2)];

  return (
    <article
      aria-labelledby={`chapter-${chapter.id}`}
      className={`relative flex shrink-0 overflow-hidden ${
        horizontal ? "h-svh w-screen items-center" : "min-h-svh w-full items-end"
      }`}
    >
      <ChapterBackground chapter={chapter} />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-0">
        {/* Story */}
        <div>
          <p className="label-mono text-glow">
            Chapter {chapter.number} / 0{CHAPTERS.length} — {chapter.time}
          </p>
          <span
            aria-hidden="true"
            className="text-kinetic text-outline mt-4 block pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(4.5rem,min(14vw,17svh),11rem)] [--outline-color:var(--color-glow)]"
          >
            {chapter.number}
          </span>
          <h3
            id={`chapter-${chapter.id}`}
            className="text-kinetic -mt-2 pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(4rem,min(12vw,16svh),10rem)] text-bone"
          >
            {chapter.title}
          </h3>
          <p className="mt-6 max-w-md text-bone/75">{chapter.copy}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chapter.conditions.map((c) => (
              <li key={c} className="label-mono border border-bone/20 px-3 py-2 text-bone/70">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Featured gear (solid background, no backdrop blur) */}
        <div className="w-full max-w-sm justify-self-start lg:justify-self-end">
          <p className="label-mono mb-3 text-bone/50">Ride it in</p>
          <div className={`bg-steel ${CHAMFER}`}>
            <div className={`relative isolate aspect-[4/3] overflow-hidden ${STUDIO_BG}`}>
              <StudioImage
                src={product.image}
                alt={product.name}
                sizes="(min-width: 1024px) 384px, 90vw"
                fallbackLabel={product.category}
                loading="eager"
                className="p-6"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="label-mono text-[0.6rem] text-bone/50">{product.category}</p>
                <p className="text-kinetic mt-1 text-2xl text-bone">{product.name}</p>
                <p className="mt-1 font-mono text-sm text-bone/80">
                  {formatPrice(product.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem(product, size)}
                aria-label={`Add ${product.name}, size ${size}, to garage`}
                className="h-11 shrink-0 -skew-x-12 bg-bone px-4 text-ink transition-colors hover:bg-glow hover:text-bone"
              >
                <span className="text-kinetic inline-block skew-x-12 text-lg">Add +</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NightRun() {
  const sectionRef = useRef(null);
  const lenis = useLenis();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const horizontal = isDesktop && !reduce;

  // 0 → 1 across the pinned section, fed straight from Lenis in the same frame
  const progress = useMotionValue(0);
  const x = useTransform(progress, [0, 1], ["0vw", `-${(PANELS - 1) * 100}vw`]);

  useEffect(() => {
    if (!horizontal) return;
    const el = sectionRef.current;
    if (!el) return;

    let start = 0;
    let distance = 1;

    const measure = () => {
      start = el.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, el.offsetHeight - window.innerHeight);
    };
    const update = (scroll) => {
      progress.set(Math.min(1, Math.max(0, (scroll - start) / distance)));
    };
    const remeasure = () => {
      measure();
      update(lenis ? lenis.scroll : window.scrollY);
    };

    remeasure();

    // Re-measure when anything above changes height (images loading, resize)
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("resize", remeasure);

    let unsubscribe;
    if (lenis) {
      unsubscribe = lenis.on("scroll", (l) => update(l.scroll));
    } else {
      const onScroll = () => update(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      unsubscribe = () => window.removeEventListener("scroll", onScroll);
    }

    return () => {
      unsubscribe?.();
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [horizontal, lenis, progress]);

  return (
    <section
      ref={sectionRef}
      id="night-run"
      aria-label="Night Run"
      className="relative bg-ink"
      style={horizontal ? { height: `${PANELS * 100}svh` } : undefined}
    >
      <div className={horizontal ? "sticky top-0 h-svh overflow-hidden" : ""}>
        <motion.div
          style={{ x: horizontal ? x : 0 }}
          className={
            horizontal
              ? "flex h-full w-max will-change-transform [backface-visibility:hidden]"
              : "flex flex-col"
          }
        >
          <IntroPanel horizontal={horizontal} />
          {CHAPTERS.map((chapter) => (
            <ChapterPanel key={chapter.id} chapter={chapter} horizontal={horizontal} />
          ))}
        </motion.div>

        {/* Progress bar + scroll hint (outside the moving track) */}
        {horizontal && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-10 pb-8">
            <div className="mx-auto flex max-w-7xl items-center gap-4">
              <span className="label-mono text-bone/50">Night Run</span>
              <div className="h-[2px] flex-1 bg-bone/15">
                <motion.div
                  style={{ scaleX: progress }}
                  className="h-full origin-left bg-glow will-change-transform"
                />
              </div>
              <span className="label-mono flex items-center gap-2 text-bone/50">
                Scroll
                <motion.span
                  aria-hidden="true"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}