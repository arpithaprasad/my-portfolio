"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function CursorBloom() {
  const reduceMotion = useReducedMotion();
  const nodeRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, visible: false, angle: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const node = nodeRef.current;
    if (!node) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const next = pos.current;
      next.tx = event.clientX;
      next.ty = event.clientY;
      if (!next.visible) {
        next.x = event.clientX;
        next.y = event.clientY;
      }
      next.visible = true;
    };

    const onLeave = () => {
      pos.current.visible = false;
    };

    const tick = () => {
      const next = pos.current;
      next.x += (next.tx - next.x) * 0.18;
      next.y += (next.ty - next.y) * 0.18;
      next.angle += 0.6;
      node.style.opacity = next.visible ? "1" : "0";
      node.style.transform = `translate3d(${next.x}px, ${next.y}px, 0) translate(-50%, -50%) rotate(${next.angle}deg)`;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={nodeRef}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden opacity-0 will-change-transform transition-opacity duration-200 md:block"
      aria-hidden="true"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="2.2" fill="#3d7a74" />
        <ellipse cx="14" cy="6.2" rx="3.4" ry="5.2" fill="#3d7a74" opacity="0.88" />
        <ellipse cx="14" cy="21.8" rx="3.4" ry="5.2" fill="#3d7a74" opacity="0.88" />
        <ellipse cx="6.2" cy="14" rx="5.2" ry="3.4" fill="#5b908b" opacity="0.9" />
        <ellipse cx="21.8" cy="14" rx="5.2" ry="3.4" fill="#5b908b" opacity="0.9" />
        <ellipse
          cx="8.4"
          cy="8.4"
          rx="3.1"
          ry="4.6"
          fill="#c8d9c0"
          opacity="0.95"
          transform="rotate(-45 8.4 8.4)"
        />
        <ellipse
          cx="19.6"
          cy="8.4"
          rx="3.1"
          ry="4.6"
          fill="#c8d9c0"
          opacity="0.95"
          transform="rotate(45 19.6 8.4)"
        />
      </svg>
    </div>
  );
}
