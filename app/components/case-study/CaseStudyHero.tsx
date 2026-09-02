"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyData } from "../../data/caseStudies";
import PlaceholderImage from "./PlaceholderImage";

type CaseStudyHeroProps = Pick<
  CaseStudyData,
  "label" | "name" | "description" | "role" | "year" | "duration"
>;

const metadata = [
  { label: "Role", valueKey: "role" as const },
  { label: "Year", valueKey: "year" as const },
  { label: "Duration", valueKey: "duration" as const },
];

export default function CaseStudyHero({
  label,
  name,
  description,
  role,
  year,
  duration,
}: CaseStudyHeroProps) {
  const reduceMotion = useReducedMotion();
  const values = { role, year, duration };

  return (
    <motion.header
      className="mb-24 md:mb-28"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
        {label}
      </p>

      <h1 className="font-serif mt-5 text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] md:text-[4rem]">
        {name}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-[var(--muted)] md:text-xl">
        {description}
      </p>

      <dl className="mt-8 flex flex-wrap items-stretch divide-x divide-[var(--border)] border-y border-[var(--border)] py-4">
        {metadata.map((item) => (
          <div key={item.label} className="min-w-[33%] flex-1 px-4 first:pl-0 last:pr-0">
            <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm text-[var(--foreground)]">
              {values[item.valueKey]}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <PlaceholderImage
          label="Hero image coming soon"
          heightClass="h-[480px]"
        />
      </div>
    </motion.header>
  );
}
