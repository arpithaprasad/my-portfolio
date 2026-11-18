"use client";

import Link from "next/link";
import { roomOrder, rooms, type RoomKey } from "../data/portfolio";
import { model } from "../lib/model";
import { markReturnFrom } from "../lib/return";

/*
 * Key plan — the little site plan architects put in a drawing's corner to show
 * where you are. Footprints come from the Blender export; the current building
 * is filled in its colour. Clicking it pulls you back out to the full model.
 */
export default function KeyPlan({ current, className = "" }: { current: RoomKey; className?: string }) {
  const w = 100 * model.plinthAspect;
  const h = 100;
  const pad = 6;
  const pts = (poly: number[][]) => poly.map(([x, y]) => `${pad + x * (w - 2 * pad)},${pad + y * (h - 2 * pad)}`).join(" ");

  return (
    <Link
      href="/"
      onClick={() => markReturnFrom(current)}
      className={`focus-ring group inline-flex flex-col items-start gap-2 ${className}`}
      aria-label={`Key plan: you're in ${rooms[current].label}. Back to the site model.`}
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="w-24 overflow-visible md:w-44" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width={w - 2}
          height={h - 2}
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-[var(--foreground)]/40 transition-colors group-hover:text-[var(--foreground)]/70"
        />
        {roomOrder.map((key) => {
          const spot = model.spots[key];
          if (!spot?.plan?.length) return null;
          const isHere = key === current;
          return (
            <polygon
              key={key}
              points={pts(spot.plan)}
              fill={isHere ? rooms[key].color : "transparent"}
              stroke={isHere ? rooms[key].color : "currentColor"}
              strokeWidth="0.8"
              className="text-[var(--foreground)]/45"
            />
          );
        })}
        {/* north arrow */}
        <g transform={`translate(${w - 9} ${h - 16})`} className="text-[var(--foreground)]/50">
          <path d="M0 -6 L2.6 3.5 L0 2 L-2.6 3.5 Z" fill="currentColor" />
        </g>
      </svg>
      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]">
        <span className="hidden md:inline">Key plan · back to model ↖</span>
        <span className="md:hidden">Back to model ↖</span>
      </span>
    </Link>
  );
}
