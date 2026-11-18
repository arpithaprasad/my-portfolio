import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { portfolio } from "../data/portfolio";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const { about } = portfolio;
  return (
    <PageShell room="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {p}
            </p>
          ))}
        </div>
        <dl className="lg:col-span-5">
          {about.facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-4 first:border-t">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{f.label}</dt>
              <dd className="text-right text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageShell>
  );
}
