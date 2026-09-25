"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 320, damping: 24 };

const likes = [
  {
    id: "matcha",
    label: "Daily ritual",
    hint: "Iced strawberry matcha — oat milk, less ice, 50% sugar.",
    tone: "bg-[#efe6d6]",
  },
  {
    id: "laptop",
    label: "Making things",
    hint: "Where design turns into something I can ship.",
    tone: "bg-[#eceff4]",
  },
  {
    id: "phone",
    label: "Current rotation",
    hint: "South Arcade, BMTH, Jenevieve, Rihanna.",
    tone: "bg-[#e8edf4]",
  },
  {
    id: "hike",
    label: "Peak therapy",
    hint: "I collect mountains and trek them.",
    tone: "bg-[#e7eee6]",
  },
  {
    id: "food",
    label: "Love language",
    hint: "Ramen, curd rice, masala dosa, arrabbiata, falafel.",
    tone: "bg-[#f3ebe1]",
  },
  {
    id: "photos",
    label: "Wandering",
    hint: "Sunsets, buildings, walks, and peaks on film.",
    tone: "bg-[#efe8dc]",
  },
] as const;

function LikeTile({
  label,
  hint,
  tone,
  children,
}: {
  label: string;
  hint: string;
  tone: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative"
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      variants={{
        rest: { y: 0 },
        hover: { y: -4 },
      }}
      transition={spring}
    >
      <div
        className={`relative flex h-[132px] items-end justify-center overflow-hidden px-3 pb-3 pt-5 sm:h-[148px] ${tone}`}
      >
        {children}
      </div>
      <p className="type-label mt-2 text-[var(--muted)]">{label}</p>
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%+4px)] z-20 w-[min(190px,70vw)] -translate-x-1/2 rounded-[10px] bg-[var(--background)]/95 px-2.5 py-2 opacity-0 shadow-[0_8px_24px_rgba(26,26,26,0.08)] ring-1 ring-black/5 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="text-[11px] leading-snug text-[var(--foreground)]">{hint}</p>
      </div>
    </motion.div>
  );
}

function MatchaGraphic() {
  return (
    <svg viewBox="0 0 60 90" className="h-[88%] w-auto">
      <defs>
        <linearGradient id="likeMatcha" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7c4d0" />
          <stop offset="45%" stopColor="#e8d5c0" />
          <stop offset="100%" stopColor="#C8D9C0" />
        </linearGradient>
      </defs>
      <path
        d="M14 8 L18 82 Q30 88 42 82 L46 8 Z"
        fill="url(#likeMatcha)"
        stroke="#c5c5c0"
        strokeWidth="1.2"
      />
      <ellipse cx="30" cy="8" rx="16" ry="3" fill="#f5f5f0" stroke="#c5c5c0" strokeWidth="1" />
    </svg>
  );
}

function LaptopGraphic() {
  return (
    <div className="w-[78%]">
      <div className="rounded-t-[6px] bg-[#3A3A3A] p-[4px] pb-[2px]">
        <div className="aspect-[16/10] rounded-[3px] bg-[#dfe3ea]" />
      </div>
      <div className="mx-auto h-[4px] w-[96%] rounded-sm bg-[#2a2a2a]" />
      <div className="rounded-b-[6px] bg-[#3A3A3A] px-1.5 pb-1.5 pt-1">
        <div className="h-[10px] rounded-[2px] bg-[#2a2a2a]" />
      </div>
    </div>
  );
}

function PhoneGraphic() {
  return (
    <div className="aspect-[9/19] h-[92%] overflow-hidden rounded-[10px] border-[2px] border-[#1a1a1a] bg-[#121212]">
      <div className="mx-auto mt-1 h-[3px] w-5 rounded-full bg-[#2a2a2a]" />
      <div className="mt-2 px-1.5">
        <p className="text-[5px] font-semibold uppercase tracking-[0.12em] text-[#1DB954]">
          Top artists
        </p>
        <p className="mt-1 truncate text-[6px] text-white">South Arcade</p>
        <p className="truncate text-[6px] text-white/70">BMTH</p>
        <p className="truncate text-[6px] text-white/70">Jenevieve</p>
      </div>
    </div>
  );
}

function MountainGraphic() {
  return (
    <svg viewBox="0 0 120 95" className="h-[86%] w-auto" fill="none">
      <path
        d="M14 80 C10 68, 16 54, 24 44 C30 34, 36 24, 44 20 C50 14, 56 16, 60 22 C64 12, 74 8, 82 16 C90 10, 102 18, 106 32 C114 46, 116 62, 110 76 C106 86, 92 90, 74 88 C56 92, 34 92, 22 86 C16 84, 14 82, 14 80 Z"
        fill="#8FAF8F"
        stroke="#6e8f6e"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M44 48 L50 54 M50 48 L44 54 M66 46 L72 52 M72 46 L66 52" stroke="#3a4f3a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M52 60 Q60 66 70 58" stroke="#3a4f3a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlateGraphic() {
  return (
    <svg viewBox="0 0 100 100" className="h-[78%] w-auto">
      <circle cx="50" cy="50" r="46" fill="#E8D5B0" stroke="#ddd6c8" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="34" fill="#f0e4c8" />
      <circle cx="50" cy="50" r="28" fill="#FAF7F0" />
    </svg>
  );
}

function PolaroidGraphic() {
  return (
    <div className="relative h-[86%] w-[70%]">
      <div className="absolute left-[8%] top-[10%] w-[70%] rotate-[-8deg] bg-white p-1 pb-4 shadow-sm">
        <div className="aspect-square bg-[#e8b898]" />
      </div>
      <div className="absolute right-[4%] top-[18%] w-[70%] rotate-[7deg] bg-white p-1 pb-4 shadow-md">
        <div className="aspect-square bg-[#a8b8c8]" />
      </div>
    </div>
  );
}

const graphics: Record<(typeof likes)[number]["id"], ReactNode> = {
  matcha: <MatchaGraphic />,
  laptop: <LaptopGraphic />,
  phone: <PhoneGraphic />,
  hike: <MountainGraphic />,
  food: <PlateGraphic />,
  photos: <PolaroidGraphic />,
};

export default function DeskScene() {
  return (
    <div className="w-full">
      <p className="type-label mb-3 text-[var(--accent)]">Things I like</p>
      <div className="grid grid-cols-2 gap-2 pb-12 sm:grid-cols-3">
        {likes.map((item) => (
          <LikeTile key={item.id} label={item.label} hint={item.hint} tone={item.tone}>
            {graphics[item.id]}
          </LikeTile>
        ))}
      </div>
    </div>
  );
}
