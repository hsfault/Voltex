"use client";

import { useState } from "react";
import Image from "next/image";

// Light studio backdrop. Put this on the parent together with "relative isolate"
export const STUDIO_BG =
  "bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#e6ebf2_55%,#cdd5e0_100%)]";

// mix-blend-multiply makes white photo backgrounds vanish into the backdrop
export default function StudioImage({
  src,
  alt,
  sizes,
  className = "",
  fallbackLabel = "",
  loading,
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-kinetic text-[length:clamp(1.5rem,5vw,3rem)] text-ink/15">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={loading}
      onError={() => setError(true)}
      className={`object-contain mix-blend-multiply ${className}`}
    />
  );
}