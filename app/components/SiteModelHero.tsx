"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { portfolio, roomOrder, rooms, type RoomKey } from "../data/portfolio";
import { model, modelSrc } from "../lib/model";
import { takeReturnFrom } from "../lib/return";

/*
 * Homepage site model ("lights on").
 * Images + click areas come from model/export_web_layers.py — after editing the
 * Blender file, re-run that script and this picks up the new files.
 */

const { hero } = portfolio;
const ratio = `${model.width} / ${model.height}`;
const PUSH_SCALE = 3.4;

// ---- visited rooms stay lit (localStorage, memory fallback) -------------
const STORAGE_KEY = "ap-lights-on";
let memory = "[]";
const listeners = new Set<() => void>();
const readLights = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return memory;
  }
};
const writeLights = (keys: string[]) => {
  memory = JSON.stringify(keys);
  try {
    localStorage.setItem(STORAGE_KEY, memory);
  } catch {}
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const parseLights = (raw: string): RoomKey[] => {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((k): k is RoomKey => typeof k === "string" && k in model.spots) : [];
  } catch {
    return [];
  }
};

// Zoom origin = the building's window, as 0–1 of the image.
const origin = (key: RoomKey) => {
  const [x, y] = model.spots[key].focus;
  return { originX: x, originY: y };
};

export default function SiteModelHero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [hovered, setHovered] = useState<RoomKey | null>(null);
  const [entering, setEntering] = useState<RoomKey | null>(null);
  const busy = useRef(false);
  const raw = useSyncExternalStore(subscribe, readLights, () => "[]");
  const visited = useMemo(() => parseLights(raw), [raw]);

  // Arrival: either pull back out of the room you came from, or a gentle rise.
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const from = takeReturnFrom() as RoomKey | null;
    if (reduceMotion) {
      animate(el, { opacity: 1 }, { duration: 0 });
      return;
    }
    if (from && from in model.spots) {
      animate(el, origin(from), { duration: 0 });
      animate(el, { scale: [PUSH_SCALE, 1], opacity: [0, 1, 1] }, { duration: 1.0, ease: [0.22, 1, 0.36, 1] });
    } else {
      animate(el, { y: [24, 0], opacity: [0, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    }
  }, [animate, reduceMotion, scope]);

  const remember = (key: RoomKey) => {
    if (!visited.includes(key)) writeLights([...visited, key]);
  };

  const enter = async (key: RoomKey) => {
    if (busy.current) return;
    const room = rooms[key];
    remember(key);

    if (key === "resume") {
      if (room.href) window.open(room.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (reduceMotion || !scope.current) {
      router.push(room.href);
      return;
    }
    busy.current = true;
    setEntering(key);
    router.prefetch(room.href);
    await animate(scope.current, origin(key), { duration: 0 });
    await animate(
      scope.current,
      { scale: [1, PUSH_SCALE], opacity: [1, 1, 0] },
      { duration: 1.0, ease: [0.65, 0, 0.35, 1] }
    );
    router.push(room.href);
  };

  const activeKey = entering ?? hovered;
  const active = activeKey ? rooms[activeKey] : null;

  return (
    <main
      className="relative -mt-20 overflow-hidden px-6 pt-24 md:px-12"
      style={{ background: `linear-gradient(180deg, ${model.ground[0]} 0%, ${model.ground[1]} 70%, var(--background) 100%)` }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] w-full max-w-6xl grid-cols-1 content-center items-center gap-6 pb-10 lg:grid-cols-12 lg:gap-4">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-4">
          <h1
            id="hero-heading"
            className="font-serif text-[2.6rem] font-medium leading-[1.04] tracking-tight text-[var(--foreground)] md:text-[3.6rem]"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]} <em className="text-[var(--rose)]">{hero.headline[2]}</em>
          </h1>

          <div className="mt-6 flex items-center gap-2.5">
            <span className="availability-dot" aria-hidden="true" />
            <p className="text-sm text-[var(--muted)]">
              Currently open to <span className="font-semibold text-[var(--foreground)]">Full-time roles</span>
            </p>
          </div>

          <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--muted)]">{hero.bio}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button
              type="button"
              onClick={() => enter("work")}
              className="focus-ring rounded-full border border-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            >
              Explore my work ↗
            </button>
            <button type="button" onClick={() => enter("contact")} className="focus-ring text-sm text-[var(--muted)]">
              Get in touch →
            </button>
          </div>
        </div>

        {/* Model */}
        <div className="relative -mx-6 md:mx-0 lg:col-span-8 lg:-mr-16 xl:-mr-28">
          <div className="relative w-full" style={{ aspectRatio: ratio }}>
            <div ref={scope} className="model-stage absolute inset-0 opacity-0 will-change-transform">
              <Image
                src={modelSrc("base.webp")}
                alt="A clay architectural site model at dusk with five small buildings: Work, About, Play, Contact and a Resume pavilion."
                fill
                preload
                unoptimized
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="pointer-events-none select-none object-contain"
              />
              {roomOrder.map((key) => {
                const lit = activeKey === key || visited.includes(key);
                return (
                  <Image
                    key={key}
                    src={modelSrc(`light-${key}.webp`)}
                    alt=""
                    aria-hidden
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="pointer-events-none select-none object-contain transition-opacity duration-500 ease-out"
                    style={{ opacity: lit ? 1 : 0 }}
                  />
                );
              })}

              {/* Click areas, traced from the Blender camera */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                role="group"
                aria-label="Site model navigation"
              >
                {roomOrder.map((key) => {
                  const r = rooms[key];
                  const external = key === "resume";
                  return (
                    <a
                      key={key}
                      href={r.href || undefined}
                      target={external && r.href ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      tabIndex={0}
                      role="link"
                      aria-label={`${r.number} ${r.label}: ${r.caption}`}
                      className="model-hotspot"
                      onMouseEnter={() => {
                        setHovered(key);
                        if (!external) router.prefetch(r.href);
                      }}
                      onMouseLeave={() => setHovered((h) => (h === key ? null : h))}
                      onFocus={() => setHovered(key)}
                      onBlur={() => setHovered((h) => (h === key ? null : h))}
                      onClick={(e) => {
                        e.preventDefault();
                        enter(key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          enter(key);
                        }
                      }}
                    >
                      <polygon points={model.spots[key].polygon.map((p) => p.join(",")).join(" ")} />
                    </a>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Caption: what's lit right now */}
          <div
            className="mt-2 flex min-h-6 flex-wrap items-baseline justify-center gap-x-3 px-6 text-center text-sm md:px-0"
            aria-live="polite"
          >
            {active ? (
              <p className="text-[var(--foreground)]">
                <span className="font-mono text-xs tracking-wider text-[#8a3b3f]">{active.number}</span>{" "}
                <span className="font-medium">{active.label}</span>
                <span className="text-[var(--muted)]"> · {active.caption}</span>
              </p>
            ) : (
              <p className="text-[var(--muted)]">
                <span className="pointer-coarse:hidden">{hero.hint}</span>
                <span className="hidden pointer-coarse:inline">{hero.hintTouch}</span>
              </p>
            )}
            {visited.length > 0 && !active && (
              <button
                type="button"
                onClick={() => writeLights([])}
                className="focus-ring text-xs text-[#8a3b3f] underline underline-offset-4"
              >
                Lights off
              </button>
            )}
          </div>
        </div>
      </div>
      <noscript>
        <style>{`.model-stage { opacity: 1 !important; }`}</style>
      </noscript>
    </main>
  );
}
