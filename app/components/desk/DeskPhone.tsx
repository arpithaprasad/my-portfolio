"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeskLabel from "./DeskLabel";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const artists = [
  { rank: "01", name: "South Arcade" },
  { rank: "02", name: "Bring Me The Horizon" },
  { rank: "03", name: "Jenevieve" },
  { rank: "04", name: "Rihanna" },
];

const screenVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export default function DeskPhone() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[54%] top-[26%] z-30 w-[18%] max-w-[78px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, rotate: 8 },
        hover: { y: -6, rotate: 4 },
      }}
      transition={spring}
      aria-hidden="true"
    >
      <DeskLabel
        text="current rotation"
        arrow="w"
        className="absolute -right-[118%] top-[18%] z-30 w-28"
      />

      <div className="absolute bottom-0 left-1/2 z-0 w-[90%] -translate-x-1/2">
        <div className="mx-auto h-3 w-full rounded-sm bg-[#d8d0c4] shadow-[0_4px_16px_rgba(0,0,0,0.08)]" />
        <div
          className="mx-auto -mt-0.5 h-8 w-[55%] origin-bottom bg-[#cfc6b8]"
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            transform: "perspective(200px) rotateX(55deg)",
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto origin-bottom overflow-hidden rounded-[10px] border-[2.5px] border-[#1a1a1a] bg-[#121212] shadow-[0_4px_16px_rgba(0,0,0,0.08)] aspect-[9/19]"
        style={{
          transform: "perspective(400px) rotateX(8deg)",
          width: "86%",
        }}
      >
        <div className="absolute left-1/2 top-1 z-20 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#2a2a2a]" />
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        <motion.div
          className="absolute inset-0 flex flex-col bg-[#1A1A1A] px-1.5 pb-2 pt-3.5"
          variants={screenVariants}
          transition={spring}
        >
          <p className="text-[5px] font-semibold uppercase tracking-[0.14em] text-[#1DB954]">
            Your top artists
          </p>
          <ul className="mt-1.5 space-y-[3px]">
            {artists.map((artist) => (
              <li key={artist.rank} className="flex items-baseline gap-1">
                <span className="text-[5.5px] font-semibold text-[#1DB954]">
                  {artist.rank}
                </span>
                <span className="truncate text-[6px] font-medium text-white">
                  {artist.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
