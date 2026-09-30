"use client";

import { useState } from "react";
import Drawer from "./Drawer";
import StudioImage, { STUDIO_BG } from "./StudioImage";
import { useGarage } from "@/context/GarageContext";
import { formatPrice } from "@/data/gear";

export default function GarageDrawer() {
  const { items, count, subtotal, isOpen, closeGarage, removeItem, updateQty } =
    useGarage();
  const [notice, setNotice] = useState(false);

  return (
    <Drawer open={isOpen} onClose={closeGarage} title={`Garage (${count})`}>
      {items.length === 0 ? (
        <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
          <p className="text-kinetic text-[3.5rem] text-bone/20">Empty</p>
          <p className="mt-3 max-w-[16rem] text-sm text-bone/60">
            Nothing parked here yet. Add some gear to get rolling.
          </p>
          <button
            type="button"
            onClick={closeGarage}
            className="mt-6 inline-flex h-12 -skew-x-12 items-center bg-bone px-6 text-ink transition-colors hover:bg-glow hover:text-bone"
          >
            <span className="text-kinetic skew-x-12 text-xl">Browse gear</span>
          </button>
        </div>
      ) : (
        <div className="flex min-h-full flex-col">
          <ul className="flex-1 divide-y divide-bone/10 px-5">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 py-5">
                <div className={`relative isolate h-20 w-20 shrink-0 overflow-hidden ${STUDIO_BG}`}>
                  <StudioImage
                    src={item.image}
                    alt={item.name}
                    sizes="80px"
                    className="p-2"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-kinetic text-xl text-bone">{item.name}</p>
                      <p className="label-mono mt-1 text-[0.6rem] text-bone/50">
                        Size {item.size}
                      </p>
                    </div>
                    <p className="font-mono text-sm text-bone">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-bone/15">
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="grid h-11 w-11 place-items-center text-lg text-bone hover:bg-bone/10"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-sm text-bone">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="grid h-11 w-11 place-items-center text-lg text-bone hover:bg-bone/10"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="label-mono min-h-11 px-2 text-bone/50 underline-offset-4 hover:text-bone hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 border-t border-bone/10 bg-steel p-5">
            <div className="flex items-center justify-between">
              <span className="label-mono text-bone/60">Subtotal</span>
              <span className="font-mono text-lg text-bone">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-bone/40">Shipping calculated at checkout.</p>
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="mt-4 flex h-14 w-full -skew-x-6 items-center justify-center bg-bone text-ink transition-colors hover:bg-glow hover:text-bone"
            >
              <span className="text-kinetic skew-x-6 text-2xl">Checkout</span>
            </button>
            {notice && (
              <p role="status" className="label-mono mt-3 text-center text-[0.6rem] text-brand-300">
                Concept store — checkout is disabled in this demo
              </p>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}