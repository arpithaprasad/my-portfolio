"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { RANGOLI_VIEWBOX, rangoliDots, rangoliGlyph, rangoliPaths } from "./rangoli-data";

const EASE = [0.22, 1, 0.36, 1] as const;
// How far from the centre a path starts, so curls begin once the vine reaches them.
const startDist = (d: string) => Math.abs(parseFloat(d.slice(1)) - 600);

/*
 * The footer's rangoli: the ಅ draws first, the vines draw outward to both ends,
 * each curl follows as the line reaches it, and the apricot dots land last.
 * With reduced motion it is simply there.
 */
export default function RangoliBorder({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const show = reduce || inView;
  const t = (dist: number) => 0.5 + (dist / 600) * 1.4; // seconds after the ಅ starts

  return (
    <svg
      ref={ref}
      viewBox={RANGOLI_VIEWBOX}
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={rangoliGlyph.transform}>
        <motion.path
          d={rangoliGlyph.d}
          stroke="var(--background)"
          strokeWidth={rangoliGlyph.w}
          initial={reduce ? false : { pathLength: 0 }}
          animate={show ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </g>
      {rangoliPaths.map((p, i) => {
        const vine = i % 4 === 0; // each side: the vine first, then its three curls
        const dist = startDist(p.d);
        return (
          <motion.path
            key={i}
            d={p.d}
            stroke="#e8c7c0"
            strokeWidth={p.w}
            initial={reduce ? false : { pathLength: 0 }}
            animate={show ? { pathLength: 1 } : undefined}
            transition={{
              duration: vine ? 1.9 : 0.6,
              delay: vine ? 0.5 : t(dist),
              ease: vine ? [0.45, 0, 0.25, 1] : EASE,
            }}
          />
        );
      })}
      {rangoliDots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="var(--apricot)"
          initial={reduce ? false : { opacity: 0, scale: 0.2 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.4, delay: t(d.dist) + 0.35, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
