"use client";

import { motion } from "framer-motion";

const objects = [
  {
    label: "object 1",
    width: 128,
    height: 104,
    top: "8%",
    left: "12%",
    rotate: -7,
  },
  {
    label: "object 2",
    width: 168,
    height: 124,
    top: "32%",
    left: "48%",
    rotate: 5,
  },
  {
    label: "object 3",
    width: 108,
    height: 148,
    top: "58%",
    left: "8%",
    rotate: -4,
  },
  {
    label: "object 4",
    width: 144,
    height: 96,
    top: "18%",
    left: "58%",
    rotate: 9,
  },
];

const details = [
  "MS HCI @ Pratt Institute",
  "Currently open to opportunities",
  "Based in NYC",
];

export default function Hero() {
  return (
    <section className="px-6 pb-10 pt-12 md:px-12 md:pb-12 md:pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[40px] font-light leading-[1.15] tracking-tight md:text-[56px] lg:text-[64px]">
            <span
              className="text-emerald-metallic"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Hi, I&apos;m Arpitha —
            </span>{" "}
            <span className="font-sans text-[#1A1A1A]">
              designing digital products from the grid up, precise, visual, and
              fluent in both design and code.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#888888] md:text-base">
            <a href="#contact" className="underline underline-offset-4">
              Talk to me
            </a>{" "}
            about anything design, vibe-coding, or my go-to coffee order ☕
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#888888] md:text-sm">
            {details.map((detail, index) => (
              <li key={detail} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#CCCCCC]">
                    ·
                  </span>
                )}
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative mx-auto h-[360px] w-full max-w-md lg:mx-0 lg:h-[420px] lg:max-w-none">
          {objects.map((object) => (
            <div
              key={object.label}
              className="absolute flex items-center justify-center rounded-2xl bg-neutral-200/70 text-xs text-neutral-400"
              style={{
                width: object.width,
                height: object.height,
                top: object.top,
                left: object.left,
                transform: `rotate(${object.rotate}deg)`,
              }}
            >
              {object.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
