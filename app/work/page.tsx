import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { hasImage } from "../components/CaseFigure";
import PageShell from "../components/PageShell";
import { caseStudies } from "../data/portfolio";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <PageShell room="work">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {caseStudies.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/work/${cs.slug}`}
              className="focus-ring group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--card)] hover:shadow-[0_14px_36px_rgba(26,26,26,0.08)] motion-reduce:hover:translate-y-0"
              style={{ "--card": cs.color } as React.CSSProperties}
            >
              <div
                className="relative flex aspect-[16/10] items-end p-5"
                style={{ background: `color-mix(in srgb, ${cs.color} 16%, #f4efe8)` }}
              >
                {cs.hero && hasImage(cs.hero.src) ? (
                  <Image
                    src={cs.hero.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-sm text-[var(--muted)]">
                    Project image coming soon
                  </span>
                )}
                <span className="relative font-mono text-[11px] tracking-[0.18em] text-[var(--card)]">{cs.sheet}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-[22px] font-semibold tracking-tight">{cs.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{cs.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.tags.map((t) => (
                    <li key={t} className="rounded-full border border-[var(--card)] px-3 py-0.5 text-[11px] text-[var(--card)]">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-6 text-sm text-[var(--card)] transition-transform duration-200 group-hover:translate-x-1">
                  View case study →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
