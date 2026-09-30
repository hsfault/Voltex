import Link from "next/link";

export const metadata = { title: "Wrong turn" };

export default function NotFound() {
  return (
    <section className="bg-hero relative flex min-h-svh items-center overflow-hidden px-4 py-32 [--spot-x:70%] [--spot-y:40%] sm:px-6 lg:px-10">
      <div aria-hidden="true" className="speed-streaks pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="label-mono text-glow">Error 404</p>
        <p
          aria-hidden="true"
          className="text-kinetic text-outline mt-4 pb-[0.04em] pr-[0.1em] pt-[0.08em] text-[length:clamp(7rem,30vw,22rem)] [--outline-color:var(--color-brand-300)]"
        >
          404
        </p>
        <h1 className="text-kinetic -mt-4 text-[length:clamp(3.5rem,10vw,8rem)] text-bone">
          Wrong turn
        </h1>
        <p className="mt-6 max-w-md text-bone/75">
          This road doesn&apos;t exist, or it got closed for resurfacing. Head
          back to the start line.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 -skew-x-12 items-center bg-bone px-6 text-ink transition-colors hover:bg-glow hover:text-bone"
          >
            <span className="text-kinetic skew-x-12 text-xl">Back home</span>
          </Link>
          <Link
            href="/gear"
            className="inline-flex h-12 -skew-x-12 items-center border-2 border-bone px-6 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="text-kinetic skew-x-12 text-xl">Browse gear</span>
          </Link>
        </div>
      </div>
    </section>
  );
}