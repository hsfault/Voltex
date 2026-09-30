import Link from "next/link";

export default function Logo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="VOLTEX Moto Co. home"
      className="flex h-11 items-center gap-2 text-bone"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 -skew-x-12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2 5h7.5l6.5 15 6.5-15H30L19.5 27h-7z" />
      </svg>
      <span className="text-kinetic text-3xl leading-none">Voltex</span>
      <span className="label-mono hidden text-[10px] opacity-70 sm:block">
        Moto Co.
      </span>
    </Link>
  );
}