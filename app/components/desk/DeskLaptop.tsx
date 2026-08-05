"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeskLabel from "./DeskLabel";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const apps = [
  { letter: "F", color: "#F24E1E" },
  { letter: "P", color: "#E60023" },
  { letter: "B", color: "#EA7600" },
];

const dockVariants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0 },
};

export default function DeskLaptop() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[8%] top-[8%] z-20 w-[48%] max-w-[230px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, rotate: -5 },
        hover: { y: -6, rotate: -3 },
      }}
      transition={spring}
      aria-hidden="true"
      style={{ perspective: 600 }}
    >
      <DeskLabel
        text="where the magic happens"
        arrow="se"
        className="absolute -left-1 -top-8 z-30"
      />

      {/* Lid — angled back */}
      <div
        className="origin-bottom rounded-t-[7px] bg-[#3A3A3A] p-[5px] pb-[3px] shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
        style={{
          transform: "rotateX(-28deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative mx-auto aspect-[16/10] w-[88%] overflow-hidden rounded-[3px] bg-[#E8E8E8]">
          <div className="absolute inset-0 bg-[#E8E8E8]" />
          <motion.div
            className="absolute inset-x-0 bottom-0 flex justify-center pb-1.5"
            variants={dockVariants}
            transition={spring}
          >
            <div className="flex items-center gap-1.5 rounded-full bg-black/25 px-1.5 py-1">
              {apps.map((app) => (
                <span
                  key={app.letter}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white"
                  style={{ backgroundColor: app.color }}
                >
                  {app.letter}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Camera bezel dot */}
        <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-[#555]" />
      </div>

      {/* Hinge */}
      <div className="relative z-10 mx-auto -mt-px h-[5px] w-[96%] rounded-sm bg-[#2a2a2a] shadow-inner">
        <div className="absolute inset-x-[8%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#1f1f1f]" />
        <div className="absolute left-[18%] top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-[#555]" />
        <div className="absolute right-[18%] top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-[#555]" />
      </div>

      {/* Keyboard deck */}
      <div className="relative w-[104%] -translate-x-[2%] rounded-b-[8px] bg-[#3A3A3A] px-2 pb-2 pt-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.28)]">
        {/* Key grid suggestion */}
        <div className="grid grid-cols-10 gap-[2px] opacity-70">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="h-[3.5px] rounded-[1px] bg-[#2a2a2a]"
            />
          ))}
        </div>
        <div className="mx-auto mt-1 h-[4px] w-[42%] rounded-[1px] bg-[#2a2a2a]" />
        {/* Trackpad */}
        <div className="mx-auto mt-1.5 h-5 w-[38%] rounded-[3px] border border-[#2a2a2a] bg-[#333]" />
      </div>
    </motion.div>
  );
}
