"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeskLabel from "./DeskLabel";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const tipVariants = {
  rest: { opacity: 0, y: 6, scale: 0.96 },
  hover: { opacity: 1, y: 0, scale: 1 },
};

export default function DeskMatcha() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[5%] top-[52%] z-[25] w-[17%] max-w-[70px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, rotate: -3 },
        hover: { y: -6, rotate: -1 },
      }}
      transition={spring}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-16 left-1/2 z-30 w-40 -translate-x-1/2 rounded-xl bg-white px-2.5 py-2 text-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        variants={tipVariants}
        transition={spring}
      >
        <p className="text-[10px] leading-snug text-[#1a1a1a]">
          iced strawberry matcha, oat milk, less ice, 50% sugar ✨
        </p>
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
      </motion.div>

      {/* Straw */}
      <div className="absolute left-[48%] top-[-10%] z-10 h-[22%] w-[5px] -translate-x-1/2 -rotate-8 rounded-full bg-[#f0b8c4]" />

      {/* Glass */}
      <svg viewBox="0 0 60 90" className="relative z-0 h-auto w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)]">
        <defs>
          <linearGradient id="matchaOmbre" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7c4d0" />
            <stop offset="45%" stopColor="#e8d5c0" />
            <stop offset="100%" stopColor="#C8D9C0" />
          </linearGradient>
        </defs>
        {/* Glass outline */}
        <path
          d="M14 8 L18 82 Q30 88 42 82 L46 8 Z"
          fill="url(#matchaOmbre)"
          stroke="#c5c5c0"
          strokeWidth="1.2"
        />
        {/* Ice cubes hint */}
        <rect x="22" y="18" width="8" height="7" rx="1" fill="white" opacity="0.35" transform="rotate(-8 26 21)" />
        <rect x="30" y="28" width="7" height="6" rx="1" fill="white" opacity="0.28" transform="rotate(10 33 31)" />
        {/* Glass rim highlight */}
        <ellipse cx="30" cy="8" rx="16" ry="3" fill="#f5f5f0" stroke="#c5c5c0" strokeWidth="1" />
      </svg>

      <DeskLabel
        text="daily ritual"
        arrow="ne"
        className="absolute -bottom-7 left-[-10%] z-30"
      />
    </motion.div>
  );
}
