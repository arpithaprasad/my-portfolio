"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stamp = {
  id: number;
  kind: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
};

const MAX_STAMPS = 8;
const SPAWN_GAP = 96;

function MatchaMark() {
  return (
    <svg viewBox="0 0 160 220" className="h-full w-full">
      <path
        d="M42 36c-4 52-6 108 4 148 6 24 68 24 74 0 10-40 8-96 4-148C122 14 38 14 42 36Z"
        fill="#9BB89A"
      />
      <ellipse cx="80" cy="40" rx="42" ry="16" fill="#E7B7C4" />
      <ellipse cx="80" cy="52" rx="38" ry="10" fill="#F4D5C2" />
      <path
        d="M48 92c10 38 56 40 68 4 2 42-4 84-10 104-6 18-50 18-56 0-6-22-10-70-2-108Z"
        fill="#6F9A78"
      />
    </svg>
  );
}

function MountainMark() {
  return (
    <svg viewBox="0 0 220 180" className="h-full w-full">
      <path d="M18 158 L86 42 L132 102 L168 64 L208 158 Z" fill="#8FAF8F" />
      <path d="M86 42 L104 70 L92 66 L80 78 Z" fill="#E7EEE6" />
      <path d="M168 64 L178 82 L162 80 Z" fill="#E7EEE6" />
      <path d="M8 158c40 16 160 16 204 0v12H8Z" fill="#C8D9C0" />
    </svg>
  );
}

function BowlMark() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <ellipse cx="100" cy="78" rx="86" ry="54" fill="#E4C2A0" />
      <ellipse cx="100" cy="70" rx="62" ry="34" fill="#F6E7D4" />
      <ellipse cx="100" cy="64" rx="44" ry="18" fill="#FAF7F0" />
      <path d="M28 86c18 40 126 40 144 0-8 36-40 54-72 54S36 122 28 86Z" fill="#D2A57A" />
    </svg>
  );
}

function ArchMark() {
  return (
    <svg viewBox="0 0 160 210" className="h-full w-full">
      <path
        d="M22 198 V92 C22 36 138 36 138 92 V198 H108 V100 C108 72 52 72 52 100 V198 Z"
        fill="#A9B8CC"
      />
      <path d="M8 198h144v12H8Z" fill="#C5D0DE" />
    </svg>
  );
}

function SunsetMark() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <circle cx="100" cy="92" r="62" fill="#E8B898" />
      <circle cx="100" cy="92" r="38" fill="#F3D3A8" />
      <path d="M10 128c28-18 54-8 90 2 36 10 70-2 92-16v56H10Z" fill="#C9A48A" />
      <path d="M10 150c40 14 130 10 180-8v30H10Z" fill="#8FAF8F" />
    </svg>
  );
}

function VaseMark() {
  return (
    <svg viewBox="0 0 150 220" className="h-full w-full">
      <path
        d="M56 18h38c4 22-6 34-6 48 0 14 28 38 28 78 0 44-24 62-41 62s-41-18-41-62c0-40 28-64 28-78 0-14-10-26-6-48Z"
        fill="#D9B08C"
      />
      <ellipse cx="75" cy="20" rx="24" ry="10" fill="#EBD3B8" />
      <path d="M54 118c8 28 34 30 42 2-2 36-12 58-21 58s-19-22-21-60Z" fill="#C4926E" />
    </svg>
  );
}

const MARKS = [MatchaMark, MountainMark, BowlMark, ArchMark, SunsetMark, VaseMark];

export default function CursorBloom() {
  const reduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0, armed: false, kind: 0 });
  const [stamps, setStamps] = useState<Stamp[]>([]);

  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const layer = layerRef.current;
      if (!layer) return;
      const rect = layer.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const prev = last.current;
      if (prev.armed && Math.hypot(x - prev.x, y - prev.y) < SPAWN_GAP) return;

      const kind = prev.kind;
      last.current = { x, y, armed: true, kind: kind + 1 };

      const stamp: Stamp = {
        id: kind + 1,
        kind: kind % MARKS.length,
        x: x + (Math.random() - 0.5) * 36,
        y: y + (Math.random() - 0.5) * 36,
        size: 300 + Math.random() * 170,
        rotate: (Math.random() - 0.5) * 46,
      };

      setStamps((list) => [...list, stamp].slice(-MAX_STAMPS));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      <AnimatePresence>
        {stamps.map((stamp) => {
          const Mark = MARKS[stamp.kind];
          return (
            <motion.div
              key={stamp.id}
              className="absolute"
              style={{
                left: stamp.x,
                top: stamp.y,
                width: stamp.size,
                height: stamp.size,
                marginLeft: -stamp.size / 2,
                marginTop: -stamp.size / 2,
                filter: "blur(18px) saturate(1.08)",
              }}
              initial={{ opacity: 0, scale: 0.55, rotate: stamp.rotate - 8 }}
              animate={{ opacity: 0.92, scale: 1, rotate: stamp.rotate }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Mark />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
