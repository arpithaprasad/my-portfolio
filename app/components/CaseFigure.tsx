import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Figure } from "../data/portfolio";

// True when the exported image is in public/. Pages are static, so this runs at build time.
export function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/*
 * A Figma export on a soft plate in the project's colour. Until the file is in
 * public/, a plate of the same size says which image goes there.
 */
export default function CaseFigure({
  figure,
  color,
  preload = false,
  sizes = "(min-width: 1200px) 1152px, 100vw",
}: {
  figure: Figure;
  color: string;
  preload?: boolean;
  sizes?: string;
}) {
  const ready = hasImage(figure.src);
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          aspectRatio: `${figure.w} / ${figure.h}`,
          background: `color-mix(in srgb, ${color} 12%, var(--background))`,
        }}
      >
        {ready ? (
          <Image src={figure.src} alt={figure.alt} fill sizes={sizes} preload={preload} className="object-contain" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Image to add · {figure.src}</span>
              <span className="mt-2 block">{figure.alt}</span>
            </p>
          </div>
        )}
      </div>
      {figure.caption && <figcaption className="mt-3 text-sm text-[var(--muted)]">{figure.caption}</figcaption>}
    </figure>
  );
}
