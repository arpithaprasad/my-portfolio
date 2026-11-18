"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import hotspots from "../../public/model/hotspots.json";
import { portfolio } from "../data/portfolio";

/*
 * Homepage site model.
 * Images + click areas come from `model/export_web_layers.py` — after editing the
 * Blender file, re-run that script and this component picks up the new files.
 */

type Spot = { polygon: number[][]; focus: number[] };
const spots = hotspots.buildings as Record<string, Spot>;
const { siteModel } = portfolio;
const buildings = siteModel.buildings;
const ratio = `${hotspots.width} / ${hotspots.height}`;
const STORAGE_KEY = "ap-lights-on";
// Cache-buster: changes on every Blender export, so visitors always get the new renders.
const v = `?v=${hotspots.version}`;

// Rooms you've already stepped into stay lit (visited links, in architecture).
// Tiny localStorage-backed store; falls back to memory if storage is blocked.
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
const parseLights = (raw: string): string[] => {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((k) => typeof k === "string" && k in spots) : [];
  } catch {
    return [];
  }
};

export default function SiteModelHero() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [entering, setEntering] = useState<string | null>(null);
  const raw = useSyncExternalStore(subscribe, readLights, () => "[]");
  const visited = useMemo(() => parseLights(raw), [raw]);

  const remember = (key: string) => {
    if (!visited.includes(key)) writeLights([...visited, key]);
  };
  const lightsOff = () => writeLights([]);

  const goTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", href);
  };

  const enter = (key: string, href: string) => {
    if (entering) return;
    remember(key);
    if (reduceMotion) {
      goTo(href);
      return;
    }
    setEntering(key);
  };

  const active = buildings.find((b) => b.key === (entering ?? hovered));
  const focus = entering ? spots[entering].focus : [0.5, 0.5];

  return (
    <section
      className="relative overflow-x-clip bg-[linear-gradient(180deg,#efe4d8_0%,#f3ebe2_65%,var(--background)_100%)] -mt-20 px-6 pb-16 pt-24 md:px-12 md:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-12 lg:gap-4">
        {/* Copy */}
        <motion.div
          className="relative z-10 lg:col-span-4"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a6a50]">
            {siteModel.kicker}
          </p>
          <h1
            id="hero-heading"
            className="font-serif mt-5 text-[2.6rem] font-medium leading-[1.04] tracking-tight text-[var(--foreground)] md:text-[3.6rem]"
          >
            {siteModel.headline[0]}
            <br />
            {siteModel.headline[1]}{" "}
            <em className="text-[#b5603a]">{siteModel.headline[2]}</em>
          </h1>

          <div className="mt-6 flex items-center gap-2.5">
            <span className="availability-dot" aria-hidden="true" />
            <p className="text-sm text-[var(--muted)]">
              Currently open to{" "}
              <span className="font-semibold text-[var(--foreground)]">Full-time roles</span>
            </p>
          </div>

          <p className="mt-6 max-w-sm text-base leading-relaxed text-[#6f655d]">
            {portfolio.hero.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#work"
              className="focus-ring rounded-full border border-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[#f3ebe2]"
            >
              Explore my work ↗
            </a>
            <a href="#contact" className="focus-ring text-sm text-[var(--muted)]">
              Get in touch →
            </a>
          </div>
        </motion.div>

        {/* Model */}
        <div className="relative -mx-6 md:mx-0 lg:col-span-8 lg:-mr-16 xl:-mr-28">
          <div className="relative w-full" style={{ aspectRatio: ratio }}>
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%` }}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={
                entering
                  ? { scale: 3.4, opacity: [1, 1, 0], y: 0 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={
                entering
                  ? { duration: 1.05, ease: [0.65, 0, 0.35, 1], opacity: { times: [0, 0.7, 1], duration: 1.05 } }
                  : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => {
                if (!entering) return;
                const b = buildings.find((x) => x.key === entering);
                if (b) goTo(b.href);
                // reset after the scroll has moved the model out of view
                window.setTimeout(() => setEntering(null), 450);
              }}
            >
              <Image
                src={`/model/base.webp${v}`}
                alt="A clay architectural site model with four small buildings labelled Work, About, Play and Contact, at dusk."
                fill
                preload
                unoptimized
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="pointer-events-none select-none object-contain"
              />
              {buildings.map((b) => {
                const lit = hovered === b.key || entering === b.key || visited.includes(b.key);
                return (
                  <Image
                    key={b.key}
                    src={`/model/light-${b.key}.webp${v}`}
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

              {/* Click areas, generated from the Blender camera */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                role="group"
                aria-label="Site model navigation"
              >
                {buildings.map((b) => (
                  <a
                    key={b.key}
                    href={b.href}
                    aria-label={`${b.number} ${b.label}: ${b.caption}`}
                    className="model-hotspot"
                    onMouseEnter={() => setHovered(b.key)}
                    onMouseLeave={() => setHovered((h) => (h === b.key ? null : h))}
                    onFocus={() => setHovered(b.key)}
                    onBlur={() => setHovered((h) => (h === b.key ? null : h))}
                    onClick={(e) => {
                      e.preventDefault();
                      enter(b.key, b.href);
                    }}
                  >
                    <polygon points={spots[b.key].polygon.map((p) => p.join(",")).join(" ")} />
                  </a>
                ))}
              </svg>
            </motion.div>
          </div>

          {/* Caption: what's lit right now */}
          <div className="mt-2 flex min-h-6 px-6 md:px-0 flex-wrap items-baseline justify-center gap-x-3 text-center text-sm" aria-live="polite">
            {active ? (
              <p className="text-[var(--foreground)]">
                <span className="font-mono text-xs tracking-wider text-[#8a6a50]">{active.number}</span>{" "}
                <span className="font-medium">{active.label}</span>
                <span className="text-[var(--muted)]"> · {active.caption} →</span>
              </p>
            ) : (
              <p className="text-[var(--muted)]">
                <span className="pointer-coarse:hidden">{siteModel.hint}</span>
                <span className="hidden pointer-coarse:inline">{siteModel.hintTouch}</span>
              </p>
            )}
            {visited.length > 0 && !active && (
              <button
                type="button"
                onClick={lightsOff}
                className="focus-ring text-xs text-[#8a6a50] underline underline-offset-4"
              >
                Lights off
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
