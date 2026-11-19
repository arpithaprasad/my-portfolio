import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseFigure from "../../components/CaseFigure";
import CaseNav from "../../components/CaseNav";
import Footer from "../../components/Footer";
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

const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/*
 * A case study: a sticky sidebar (title, summary, section links) beside the
 * story. The page is washed in the project's own colour, not the Work room's.
 */
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const nav = cs.sections.map((s) => ({ id: sectionId(s.heading), label: s.heading }));
  const title = cs.title ?? cs.name;

  const back = (
    <Link href="/work" className="focus-ring text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
      ← All work
    </Link>
  );
  const kicker = (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
      {cs.name} · {cs.sheet}
    </p>
  );
  const tags = (
    <ul className="flex flex-wrap gap-2">
      {cs.tags.map((t) => (
        <li
          key={t}
          className="rounded-full border px-3 py-1 text-[11px] font-medium"
          style={{ borderColor: `color-mix(in srgb, ${cs.color} 45%, transparent)`, color: "var(--foreground)" }}
        >
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="-mt-20 bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${cs.color} 18%, var(--background)) 0, var(--background) 760px)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12 lg:grid lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-x-16 lg:pt-20">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 flex max-h-[calc(100svh-5rem)] flex-col gap-5 overflow-y-auto py-10">
            {back}
            {kicker}
            <h1 className="font-serif text-[2.1rem] font-medium leading-[1.08] tracking-tight">{title}</h1>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{cs.description}</p>
            {tags}
            <div className="mt-4 border-t border-[var(--border)] pt-5">
              <CaseNav items={nav} color={cs.color} variant="sidebar" />
            </div>
          </div>
        </aside>

        <div className="min-w-0 pb-24 lg:pt-10">
          {/* Mobile header */}
          <header className="space-y-4 lg:hidden">
            {back}
            {kicker}
            <h1 className="font-serif text-[2.4rem] font-medium leading-[1.05] tracking-tight">{title}</h1>
            <p className="text-base leading-relaxed text-[var(--muted)]">{cs.description}</p>
            {tags}
          </header>
          <div className="sticky top-20 z-10 -mx-6 mt-6 bg-[var(--background)]/90 px-6 py-3 backdrop-blur lg:hidden">
            <CaseNav items={nav} color={cs.color} variant="chips" />
          </div>

          {cs.hero ? (
            <div className="mt-6 lg:mt-0">
              <CaseFigure figure={cs.hero} color={cs.color} preload sizes="(min-width: 1280px) 860px, 100vw" />
            </div>
          ) : (
            <div
              className="mt-6 grid aspect-[16/9] place-items-center rounded-lg text-sm text-[var(--muted)] lg:mt-0"
              style={{ background: `color-mix(in srgb, ${cs.color} 14%, var(--background))` }}
            >
              Hero image coming soon
            </div>
          )}

          {/* Title block */}
          <dl className="mt-8 grid grid-cols-2 border-y border-[var(--border)] md:grid-cols-4">
            {cs.meta.map((m) => (
              <div key={m.label} className="py-4 pr-4 md:border-[var(--border)] md:pl-4 md:first:pl-0 md:[&:not(:last-child)]:border-r">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{m.label}</dt>
                <dd className="mt-1 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>

          {cs.tldr && (
            <dl
              className="mt-10 grid grid-cols-1 gap-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:grid-cols-3 md:p-8"
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
              const id = sectionId(s.heading);
              const paragraphs = s.body === undefined ? [] : Array.isArray(s.body) ? s.body : [s.body];
              return (
                <section key={id} id={id} aria-labelledby={`${id}-h`} className="scroll-mt-40 lg:scroll-mt-24">
                  <h2 id={`${id}-h`}>
                    <span className="font-mono text-[11px] tracking-[0.18em]" style={{ color: cs.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif mt-2 block text-3xl font-medium tracking-tight md:text-[2.25rem]">{s.heading}</span>
                  </h2>
                  <div className="mt-6 max-w-[68ch] space-y-5">
                    {paragraphs.map((p) => (
                      <p key={p} className="text-base leading-relaxed text-[var(--muted)] md:text-[17px]">
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
                  {s.figures && (
                    <div className="mt-10 space-y-10">
                      {s.figures.map((f) => (
                        <CaseFigure key={f.src} figure={f} color={cs.color} sizes="(min-width: 1280px) 860px, 100vw" />
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
