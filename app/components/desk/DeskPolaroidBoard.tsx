"use client";

import { motion, useReducedMotion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const polaroids = [
  {
    label: "sunset",
    rest: { top: "10%", left: "8%", rotate: -9 },
    hover: { top: "4%", left: "2%", rotate: -14 },
    color: "#e8b898",
  },
  {
    label: "architecture",
    rest: { top: "12%", left: "48%", rotate: 6 },
    hover: { top: "6%", left: "54%", rotate: 12 },
    color: "#c5c8ce",
  },
  {
    label: "wandering",
    rest: { top: "46%", left: "14%", rotate: -4 },
    hover: { top: "50%", left: "4%", rotate: -10 },
    color: "#b7c9b0",
  },
  {
    label: "peaks",
    rest: { top: "48%", left: "50%", rotate: 8 },
    hover: { top: "52%", left: "56%", rotate: 14 },
    color: "#a8b8c8",
  },
];

export default function DeskPolaroidBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[62%] top-[0%] z-10 w-[36%] max-w-[170px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, scale: 1, rotate: 5 },
        hover: { y: -4, scale: 1.05, rotate: 2 },
      }}
      transition={spring}
      aria-hidden="true"
    >
      <div
        className="relative aspect-[5/4] w-full overflow-hidden rounded-[3px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: "#C4956A" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(80,45,20,0.3) 0.7px, transparent 0.7px)",
            backgroundSize: "5px 5px",
          }}
        />

        {polaroids.map((shot) => (
          <motion.div
            key={shot.label}
            className="absolute w-[42%] bg-white p-[4%] pb-[12%] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            variants={{
              rest: {
                top: shot.rest.top,
                left: shot.rest.left,
                rotate: shot.rest.rotate,
              },
              hover: {
                top: shot.hover.top,
                left: shot.hover.left,
                rotate: shot.hover.rotate,
              },
            }}
            transition={spring}
          >
            <svg
              viewBox="0 0 12 12"
              className="absolute left-1/2 top-[-5px] z-10 h-3 w-3 -translate-x-1/2"
            >
              <circle cx="6" cy="5" r="3.2" fill="#8B2E2E" />
              <circle cx="5" cy="4" r="1" fill="#c45a5a" opacity="0.7" />
            </svg>
            <div
              className="aspect-square w-full"
              style={{ backgroundColor: shot.color }}
            />
            <p
              className="mt-0.5 text-center text-[9px] leading-none text-[#3a3a3a]"
              style={{ fontFamily: "var(--font-hand), Caveat, cursive" }}
            >
              {shot.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
