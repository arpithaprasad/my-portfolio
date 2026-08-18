"use client";

type DeskLabelProps = {
  text: string;
  className?: string;
  arrow?: "ne" | "nw" | "se" | "sw" | "e" | "w";
};

const arrows: Record<NonNullable<DeskLabelProps["arrow"]>, string> = {
  ne: "M4 28 C12 28, 22 26, 30 10 C32 6, 34 4, 38 2 M32 2 L38 2 L36 8",
  nw: "M38 28 C30 28, 20 26, 12 10 C10 6, 8 4, 4 2 M10 2 L4 2 L6 8",
  se: "M4 4 C12 4, 22 8, 30 22 C32 26, 34 30, 38 34 M32 34 L38 34 L36 28",
  sw: "M38 4 C30 4, 20 8, 12 22 C10 26, 8 30, 4 34 M10 34 L4 34 L6 28",
  e: "M2 12 C14 10, 26 12, 36 12 M30 6 L38 12 L30 18",
  w: "M38 12 C26 10, 14 12, 4 12 M10 6 L2 12 L10 18",
};

export default function DeskLabel({
  text,
  className = "",
  arrow = "ne",
}: DeskLabelProps) {
  return (
    <div
      className={`pointer-events-none flex items-center gap-1 text-[13px] leading-tight text-[var(--accent)] opacity-70 transition-opacity duration-200 group-hover:opacity-100 ${className}`}
      style={{ fontFamily: "var(--font-hand), Caveat, cursive" }}
    >
      <svg
        viewBox="0 0 42 36"
        className="h-7 w-8 shrink-0 overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={arrows[arrow]}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="max-w-[7.5rem]">{text}</span>
    </div>
  );
}
