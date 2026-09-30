"use client";

import StudioImage, { STUDIO_BG } from "./StudioImage";
import { useGarage } from "@/context/GarageContext";
import { formatPrice } from "@/data/gear";

const CHAMFER =
  "[clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,0_100%)]";
const FLOOD_BG =
  "bg-[radial-gradient(circle_at_50%_42%,#5b95ff_0%,#1e4fe0_50%,#0f2c96_100%)]";

export default function GearTile({ product, index, onQuickView }) {
  const { addItem } = useGarage();
  const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className={`group relative flex h-full flex-col bg-tile ${CHAMFER}`}>
      {/* Studio panel */}
      <div className={`relative isolate aspect-square overflow-hidden ${STUDIO_BG}`}>
        {/* Blue flood from the bottom */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${FLOOD_BG} transition-[clip-path] duration-700 ease-out-expo [clip-path:inset(100%_0_0_0)] group-focus-within:[clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]`}
        />

        {/* Giant outlined index rising in behind the product */}
        <span
          aria-hidden="true"
          className="text-kinetic text-outline pointer-events-none absolute -bottom-[0.1em] right-[0.05em] translate-y-6 text-[length:clamp(5rem,12vw,9rem)] opacity-0 transition duration-700 ease-out-expo [--outline-color:rgb(238_242_247/0.6)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          {num}
        </span>

        {/* Floor shadow */}
        <div
          aria-hidden="true"
          className="absolute bottom-[13%] left-1/2 h-[5%] w-[55%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-md transition-all duration-500 group-hover:w-[42%] group-hover:bg-ink/45"
        />

        {/* Product */}
        <StudioImage
          src={product.image}
          alt={product.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          fallbackLabel={product.category}
          className="p-[12%] transition duration-700 ease-out-expo group-hover:-translate-y-[5%] group-hover:-rotate-3 group-hover:scale-[1.08]"
        />

        {/* Tag + small index */}
        {product.tag && (
          <span className="label-mono absolute left-3 top-3 bg-ink px-2 py-1 text-[0.6rem] text-bone sm:left-4 sm:top-4">
            {product.tag}
          </span>
        )}
        <span className="label-mono absolute right-7 top-3 text-ink/40 transition-colors duration-500 group-hover:text-bone/80 sm:top-4">
          {num}
        </span>

        {/* Hover hint (desktop) */}
        <span className="label-mono absolute bottom-3 left-1/2 hidden -translate-x-1/2 translate-y-2 text-bone opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
          Quick view
        </span>
      </div>

      {/* Info band */}
      <div className="relative flex flex-1 items-end justify-between gap-2 p-3 sm:p-4">
        <div className="min-w-0">
          <p className="label-mono text-[0.6rem] text-bone/50">{product.category}</p>
          <h3 className="text-kinetic mt-1 text-[length:clamp(1.15rem,2.2vw,1.6rem)] text-bone transition-colors duration-300 group-hover:text-glow">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-sm text-bone/80">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, defaultSize)}
          aria-label={`Add ${product.name}, size ${defaultSize}, to garage`}
          className="relative z-20 grid h-11 w-11 shrink-0 -skew-x-12 place-items-center bg-bone text-ink transition duration-300 hover:bg-glow hover:text-bone lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          <span className="skew-x-12 text-xl font-bold leading-none">+</span>
        </button>

        {/* Glowing line drawing across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-glow shadow-[0_0_12px_var(--color-glow)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
        />
      </div>

      {/* Whole card opens quick view */}
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`Quick view: ${product.name}`}
        className="absolute inset-0 z-10"
      />
    </article>
  );
}