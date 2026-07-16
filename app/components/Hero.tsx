"use client";

import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import AnnotationNote from "./AnnotationNote";
import ArtifactCard from "./ArtifactCard";

const mobileLayout = [
  { top: "2%", left: "2%" },
  { top: "8%", left: "48%" },
  { top: "52%", left: "6%" },
  { top: "58%", left: "52%" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mobileArtifacts = portfolio.artifacts.filter((a) => a.mobile);

  return (
    <section className="relative overflow-x-clip px-6 pb-16 pt-10 md:px-12 md:pb-20 md:pt-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="relative lg:col-span-6"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            {portfolio.hero.markers.map((marker) => (
              <span
                key={marker}
                className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted-soft)]"
              >
                {marker}
              </span>
            ))}
          </div>

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

          <AnnotationNote className="mt-10 hidden md:block lg:mt-14">
            {portfolio.hero.annotation}
          </AnnotationNote>
        </motion.div>

        <div className="relative min-w-0 lg:col-span-6">
          <div
            className="relative mx-auto hidden aspect-[5/4] w-full max-w-xl lg:block"
            aria-label="Design process artifacts"
          >
            {portfolio.artifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>

          <div
            className="relative mx-auto aspect-[4/3] w-full max-w-md lg:hidden"
            aria-label="Design process artifacts"
          >
            {mobileArtifacts.map((artifact, index) => (
              <ArtifactCard
                key={artifact.id}
                artifact={{
                  ...artifact,
                  top: mobileLayout[index]?.top ?? artifact.top,
                  left: mobileLayout[index]?.left ?? artifact.left,
                  rotate: Math.max(-4, Math.min(4, artifact.rotate)),
                }}
              />
            ))}
          </div>

          <AnnotationNote className="mt-8 md:hidden">
            {portfolio.hero.annotation}
          </AnnotationNote>
        </div>
      </div>
    </section>
  );
}
