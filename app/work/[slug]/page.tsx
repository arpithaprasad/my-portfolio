import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseFigure from "../../components/CaseFigure";
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
      title={cs.title ?? cs.name}
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

      {cs.hero ? (
        <div className="mt-10">
          <CaseFigure figure={cs.hero} color={cs.color} preload />
        </div>
      ) : (
        <div
          className="mt-10 grid aspect-[16/8] place-items-center rounded-lg text-sm text-[var(--muted)]"
          style={{ background: `color-mix(in srgb, ${cs.color} 14%, #f4efe8)` }}
        >
          Hero image coming soon
        </div>
      )}

      {cs.tldr && (
        <dl
          className="mt-12 grid grid-cols-1 gap-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:grid-cols-3 md:p-8"
          aria-label="Summary"
        >
          {cs.tldr.map((t) => (
            <div key={t.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: cs.color }}>
                {t.label}
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed">{t.text}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-16 space-y-20">
        {cs.sections.map((s, i) => {
          const paragraphs = s.body === undefined ? [] : Array.isArray(s.body) ? s.body : [s.body];
          return (
            <section key={s.heading} aria-labelledby={`s-${i}`}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10">
                <h2 id={`s-${i}`} className="md:col-span-4">
                  <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: cs.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif mt-2 block text-2xl font-medium tracking-tight md:text-3xl">{s.heading}</span>
                </h2>
                <div className="max-w-2xl space-y-5 md:col-span-8">
                  {paragraphs.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
                      {p}
                    </p>
                  ))}
                  {s.points && (
                    <ul className="space-y-3">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-base leading-relaxed md:text-[17px]">
                          <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cs.color }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.findings && (
                    <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                      {s.findings.map((f, n) => (
                        <li key={f.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-5">
                          <span className="font-mono text-sm" style={{ color: cs.color }}>
                            {String(n + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                            <p className="mt-1 text-base leading-relaxed text-[var(--muted)]">{f.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                  {s.quote && (
                    <figure className="border-l-2 pl-5" style={{ borderColor: cs.color }}>
                      <blockquote className="font-serif text-2xl italic leading-snug">“{s.quote.text}”</blockquote>
                      <figcaption className="mt-2 text-sm text-[var(--muted)]">{s.quote.cite}</figcaption>
                    </figure>
                  )}
                </div>
              </div>
              {s.figures && (
                <div className="mt-10 space-y-10">
                  {s.figures.map((f) => (
                    <CaseFigure key={f.src} figure={f} color={cs.color} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
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
