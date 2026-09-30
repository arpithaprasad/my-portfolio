"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeskLabel from "./DeskLabel";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const dishes = [
  { emoji: "🍜", name: "Veg ramen" },
  { emoji: "🍚", name: "Curd rice + potato curry" },
  { emoji: "🫓", name: "Masala dosa" },
  { emoji: "🍝", name: "Spaghetti arrabbiata" },
  { emoji: "🧆", name: "Falafel + baba ganoush" },
];

const cardVariants = {
  rest: { opacity: 0, y: 8, scale: 0.94, pointerEvents: "none" as const },
  hover: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const },
};

export default function DeskFoodPlate() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group absolute left-[26%] top-[66%] z-40 w-[24%] max-w-[110px] cursor-default"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0, rotate: -3 },
        hover: { y: -6, rotate: 0 },
      }}
      transition={spring}
      aria-hidden="true"
    >
      <motion.div
        className="absolute bottom-[105%] left-1/2 z-50 w-48 -translate-x-1/2 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        variants={cardVariants}
        transition={spring}
      >
        <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Favorites
        </p>
        <ul className="space-y-1.5">
          {dishes.map((dish) => (
            <li
              key={dish.name}
              className="flex items-center gap-2 text-[11px] leading-snug text-[var(--foreground)]"
            >
              <span className="text-sm">{dish.emoji}</span>
              <span>{dish.name}</span>
            </li>
          ))}
        </ul>
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[var(--border)] bg-white" />
      </motion.div>

      <svg
        viewBox="0 0 100 100"
        className="h-auto w-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="#E8D5B0"
          stroke="#ddd6c8"
          strokeWidth="1.5"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="#f0e4c8"
          stroke="#ebe4d6"
          strokeWidth="1"
        />
        <circle cx="50" cy="50" r="28" fill="#FAF7F0" />
      </svg>

      <DeskLabel
        text="my love language"
        arrow="ne"
        className="absolute -bottom-7 left-[8%] z-30"
      />
    </motion.div>
  );
}
