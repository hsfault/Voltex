"use client";

import { useState } from "react";
import Drawer from "./Drawer";
import StudioImage, { STUDIO_BG } from "./StudioImage";
import { useGarage } from "@/context/GarageContext";
import { formatPrice } from "@/data/gear";

function QuickViewBody({ product, onDone }) {
  const { addItem } = useGarage();
  const [size, setSize] = useState(
    product.sizes[Math.floor(product.sizes.length / 2)]
  );

  return (
    <div className="flex min-h-full flex-col">
      {/* Studio image */}
      <div className={`relative isolate aspect-square shrink-0 overflow-hidden ${STUDIO_BG}`}>
        <div
          aria-hidden="true"
          className="absolute bottom-[12%] left-1/2 h-[5%] w-[50%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md"
        />
        <StudioImage
          src={product.image}
          alt={product.name}
          sizes="(min-width: 640px) 448px, 100vw"
          fallbackLabel={product.category}
          className="p-[12%]"
        />
        {product.tag && (
          <span className="label-mono absolute left-4 top-4 bg-ink px-2 py-1 text-[0.6rem] text-bone">
            {product.tag}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 p-5 sm:p-6">
        <p className="label-mono text-glow">{product.category}</p>
        <h3 className="text-kinetic mt-2 text-[2.75rem] text-bone">
          {product.name}
        </h3>
        <p className="mt-2 font-mono text-lg text-bone">
          {formatPrice(product.price)}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-bone/70">
          {product.description}
        </p>

        <fieldset className="mt-6">
          <legend className="label-mono text-bone/50">Size</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSize(s)}
                  className={`h-11 min-w-11 -skew-x-12 border px-3 transition-colors ${
                    active
                      ? "border-glow bg-glow text-bone"
                      : "border-bone/20 text-bone/80 hover:border-bone/60"
                  }`}
                >
                  <span className="inline-block skew-x-12 font-mono text-sm">{s}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <ul className="mt-6 space-y-2 border-t border-bone/10 pt-5">
          {product.specs.map((spec) => (
            <li key={spec} className="flex items-center gap-3 text-sm text-bone/80">
              <span aria-hidden="true" className="h-[2px] w-4 shrink-0 bg-glow" />
              {spec}
            </li>
          ))}
        </ul>
      </div>

      {/* Sticky add button */}
      <div className="sticky bottom-0 border-t border-bone/10 bg-steel p-4 sm:p-5">
        <button
          type="button"
          onClick={() => {
            addItem(product, size);
            onDone();
          }}
          className="flex h-14 w-full -skew-x-6 items-center justify-center bg-bone text-ink transition-colors hover:bg-glow hover:text-bone"
        >
          <span className="text-kinetic skew-x-6 text-2xl">
            Add to Garage — {formatPrice(product.price)}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function QuickViewDrawer({ product, onClose }) {
  // Keep the last product so the drawer can animate out with its content
  const [shown, setShown] = useState(product);
  if (product && product !== shown) setShown(product);

  return (
    <Drawer open={Boolean(product)} onClose={onClose} title="Quick view">
      {shown && (
        <QuickViewBody key={shown.id} product={shown} onDone={onClose} />
      )}
    </Drawer>
  );
}