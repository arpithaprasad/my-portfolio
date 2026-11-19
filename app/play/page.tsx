import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { portfolio } from "../data/portfolio";

export const metadata: Metadata = { title: "Play" };

export default function PlayPage() {
  return (
    <PageShell room="play">
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {portfolio.play.map((item, i) => (
          <li key={item.id} className="flex gap-5 border-b border-[var(--border)] pb-8">
            <span className="pt-1 font-mono text-xs text-[var(--room-ink)]">P-{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{item.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[var(--room-ink)]">{item.tags.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
