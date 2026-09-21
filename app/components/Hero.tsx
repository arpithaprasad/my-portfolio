"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";
import DeskScene from "./desk/DeskScene";

const words = portfolio.hero.rotatingWords;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center overflow-x-clip px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]"
            {...fadeUp(0)}
          >
            {portfolio.hero.label}
          </motion.p>

          <motion.h1
            className="font-serif mt-4 text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] md:text-[4.5rem] lg:text-[5rem]"
            {...fadeUp(0.1)}
          >
            {portfolio.hero.name}
          </motion.h1>

          <motion.div
            className="relative mt-2 h-[1.15em] overflow-hidden text-[2.75rem] leading-[1.15] md:text-[4.5rem] lg:text-[5rem]"
            aria-live="polite"
            {...fadeUp(0.2)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                className="font-serif absolute inset-x-0 top-0 block italic text-[var(--accent)]"
                initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <span className="font-serif invisible italic" aria-hidden="true">
              matcha drinker
            </span>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-2.5"
            {...fadeUp(0.28)}
          >
            <span className="availability-dot" aria-hidden="true" />
            <p className="text-sm text-[var(--muted)]">
              Currently open to{" "}
              <span className="font-semibold text-[var(--foreground)]">
                Full-time roles
              </span>
            </p>
            <span className="sr-only">Available</span>
          </motion.div>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
            {...fadeUp(0.35)}
          >
            {portfolio.hero.bio}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
            {...fadeUp(0.45)}
          >
            <a
              href="#work"
              className="focus-ring text-sm font-medium text-[var(--accent)] underline underline-offset-4"
            >
              View Work ↓
            </a>
            <a
              href="#contact"
              className="focus-ring text-sm text-[var(--muted)]"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative min-w-0 lg:col-span-6"
          {...fadeUp(0.3)}
        >
          <DeskScene />
        </motion.div>
      </div>
    </section>
  );
}
