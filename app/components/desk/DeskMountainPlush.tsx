"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeskLabel from "./DeskLabel";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const tipVariants = {
  rest: { opacity: 0, y: 6, scale: 0.96 },
  hover: { opacity: 1, y: 0, scale: 1 },
};

export default function DeskMountainPlush() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[70%] top-[58%] z-20 w-[26%] max-w-[115px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, rotate: -5 },
        hover: { y: -6, rotate: -2 },
      }}
      transition={spring}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-11 left-1/2 z-30 w-36 -translate-x-1/2 rounded-xl bg-white px-2.5 py-2 text-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        variants={tipVariants}
        transition={spring}
      >
        <p className="text-[10px] leading-snug text-[#1a1a1a]">
          I collect mountains 🏔️
        </p>
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
      </motion.div>

      <svg
        viewBox="0 0 120 95"
        className="h-auto w-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
        fill="none"
      >
        <path
          d="M14 80
             C10 68, 16 54, 24 44
             C30 34, 36 24, 44 20
             C50 14, 56 16, 60 22
             C64 12, 74 8, 82 16
             C90 10, 102 18, 106 32
             C114 46, 116 62, 110 76
             C106 86, 92 90, 74 88
             C56 92, 34 92, 22 86
             C16 84, 14 82, 14 80 Z"
          fill="#8FAF8F"
          stroke="#6e8f6e"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Stitch path */}
        <path
          d="M28 74 Q50 62 60 46 Q74 34 92 40"
          stroke="#6e8f6e"
          strokeWidth="1.3"
          strokeDasharray="2.5 3"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* X eyes */}
        <path d="M44 48 L50 54 M50 48 L44 54" stroke="#3a4f3a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M66 46 L72 52 M72 46 L66 52" stroke="#3a4f3a" strokeWidth="1.8" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="38" cy="58" rx="4" ry="2.2" fill="#c9a8a8" opacity="0.55" />
        <ellipse cx="80" cy="56" rx="4" ry="2.2" fill="#c9a8a8" opacity="0.55" />
        {/* Smile */}
        <path d="M52 60 Q60 66 70 58" stroke="#3a4f3a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Snow tip */}
        <path
          d="M56 20 C58 15, 66 14, 70 20 C66 24, 60 24, 56 20 Z"
          fill="#eef4ee"
          opacity="0.9"
        />
      </svg>

      <DeskLabel
        text="peak therapy"
        arrow="nw"
        className="absolute -bottom-6 right-[-8%] z-30"
      />
    </motion.div>
  );
}
