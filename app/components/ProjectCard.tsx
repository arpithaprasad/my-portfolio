"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type ProjectCardProps = {
  name: string;
  description: string;
  tags: readonly string[];
  href: string;
};

export default function ProjectCard({
  name,
  description,
  tags,
  href,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--accent)]"
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, boxShadow: "0 12px 32px rgba(26,26,26,0.08)" }
      }
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="flex h-60 items-center justify-center bg-[#E8E8E8]">
        <p className="text-sm text-[var(--muted)]">Project preview coming soon</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[22px] font-semibold tracking-tight text-[var(--foreground)]">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--accent)] px-3 py-0.5 text-[11px] text-[var(--accent)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="focus-ring mt-auto inline-flex items-center pt-6 text-sm text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-1"
        >
          View case study →
        </Link>
      </div>
    </motion.article>
  );
}
