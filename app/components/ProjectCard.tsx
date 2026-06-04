"use client";

import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  tag: string;
  description: string;
  year: string;
  tabColor: string;
};

const spring = { type: "spring" as const, stiffness: 400, damping: 28 };

const cardVariants = {
  rest: {},
  hover: {},
};

export default function ProjectCard({
  title,
  tag,
  description,
  year,
  tabColor,
}: ProjectCardProps) {
  return (
    <motion.article
      className="relative cursor-pointer pt-3"
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
    >
      <motion.div
        className="absolute left-8 top-0 z-10 h-7 w-28 rounded-t-lg"
        style={{ backgroundColor: tabColor }}
        variants={{
          rest: { y: 0 },
          hover: { y: -8 },
        }}
        transition={spring}
      />

      <motion.div
        className="relative min-h-[320px] overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02 },
        }}
        transition={spring}
      >
        <div className="h-1.5" style={{ backgroundColor: tabColor }} />

        <div className="flex min-h-[calc(320px-6px)] flex-col px-8 pb-6 pt-8">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ color: tabColor }}
          >
            {tag}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {description}
          </p>

          <motion.div
            className="overflow-hidden"
            variants={{
              rest: { opacity: 0, height: 0, marginTop: 0 },
              hover: { opacity: 1, height: 148, marginTop: 24 },
            }}
            transition={spring}
          >
            <div className="flex h-32 items-center justify-center rounded-xl border border-neutral-200/60 bg-neutral-50 text-sm text-neutral-400">
              Preview
            </div>
          </motion.div>

          <span className="mt-auto pt-6 text-xs text-neutral-400">{year}</span>
        </div>
      </motion.div>
    </motion.article>
  );
}
