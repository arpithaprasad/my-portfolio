"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";

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
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-3xl text-center">
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]"
          {...fadeUp(0)}
        >
          {portfolio.hero.label}
        </motion.p>

        <motion.h1
          className="font-serif mt-6 text-[2.6rem] font-medium leading-[1.08] tracking-tight text-[var(--foreground)] md:text-[4.25rem]"
          {...fadeUp(0.08)}
        >
          Hi, I&apos;m {portfolio.hero.name.split(" ")[0]}
        </motion.h1>

        <motion.div
          className="relative mx-auto mt-3 h-[1.2em] overflow-hidden text-[1.65rem] leading-[1.2] md:text-[2.35rem]"
          aria-live="polite"
          {...fadeUp(0.16)}
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

        <motion.p
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
          {...fadeUp(0.24)}
        >
          {portfolio.hero.bio}
        </motion.p>

        <motion.div
          className="mt-6 flex items-center justify-center gap-2.5"
          {...fadeUp(0.32)}
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

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          {...fadeUp(0.4)}
        >
          <a
            href="#work"
            className="focus-ring text-sm font-medium text-[var(--foreground)]"
          >
            Dive into my work ↓↓↓
          </a>
          <a
            href="#contact"
            className="focus-ring text-sm text-[var(--muted)]"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
