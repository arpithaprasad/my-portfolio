import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import { caseStudies } from "../../data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs ? { title: cs.name, description: cs.description } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageShell
      room="work"
      kicker={`01 · Work · ${cs.sheet}`}
      title={cs.name}
      intro={cs.description}
    >
      <Link href="/work" className="focus-ring text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
        ← All work
      </Link>

      {/* Title block, drawing-sheet style */}
      <dl className="mt-8 grid grid-cols-2 border-y border-[var(--border)] md:grid-cols-4">
        {cs.meta.map((m) => (
          <div key={m.label} className="border-[var(--border)] py-4 pr-4 [&:not(:last-child)]:md:border-r md:pl-4 md:first:pl-0">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{m.label}</dt>
            <dd className="mt-1 text-sm">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-10 grid aspect-[16/8] place-items-center rounded-lg text-sm text-[var(--muted)]"
        style={{ background: `color-mix(in srgb, ${cs.color} 14%, #f4efe8)` }}
      >
        Hero image coming soon
      </div>

      <div className="mt-16 space-y-14">
        {cs.sections.map((s, i) => (
          <section key={s.heading} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10">
            <h2 className="md:col-span-4">
              <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: cs.color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif mt-2 block text-2xl font-medium tracking-tight md:text-3xl">{s.heading}</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:col-span-8 md:text-lg">{s.body}</p>
          </section>
        ))}
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="focus-ring group mt-24 flex items-center justify-between border-t border-[var(--border)] pt-8"
      >
        <span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Next · {next.sheet}</span>
          <span className="font-serif mt-1 block text-2xl font-medium md:text-3xl">{next.name}</span>
        </span>
        <span className="text-2xl transition-transform group-hover:translate-x-1" style={{ color: next.color }}>
          →
        </span>
      </Link>
    </PageShell>
  );
}
