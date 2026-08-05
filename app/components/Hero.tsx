"use client";

import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import DeskScene from "./desk/DeskScene";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-x-clip px-6 pb-16 pt-10 md:px-12 md:pb-20 md:pt-14"
      style={{
        background:
          "radial-gradient(ellipse at center, #F5F5F0 0%, #E8E8E2 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
        <motion.div
          className="relative lg:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-accent-serif text-xl font-light tracking-tight md:text-2xl">
            {portfolio.hero.intro}
          </p>

          <h1 className="mt-3 max-w-xl text-[2rem] font-medium leading-[1.15] tracking-tight text-[var(--foreground)] md:text-[2.75rem] lg:text-[3.25rem]">
            {portfolio.hero.headline}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)]">
            {portfolio.hero.support}
          </p>

          <a
            href={portfolio.hero.cta.href}
            className="link-underline focus-ring mt-8 inline-flex text-sm text-[var(--foreground)]"
          >
            {portfolio.hero.cta.label}
            <span className="link-arrow" aria-hidden="true">
              ↓
            </span>
          </a>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted-soft)] md:text-sm">
            {portfolio.hero.meta.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[var(--line-strong)]">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative min-w-0 lg:col-span-5 lg:pl-2">
          <div className="hidden lg:block">
            <DeskScene />
          </div>

          <div className="mx-auto max-w-md scale-[0.92] lg:hidden">
            <DeskScene />
          </div>
        </div>
      </div>
    </section>
  );
}
