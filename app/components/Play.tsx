import { portfolio } from "../data/portfolio";

export default function Play() {
  return (
    <section
      id="play"
      className="scroll-mt-24 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="play-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <h2
            id="play-heading"
            className="shrink-0 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            PLAY
          </h2>
          <div className="h-px w-full bg-[var(--accent)]" aria-hidden="true" />
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {portfolio.play.map((item, i) => (
            <li key={item.id} className="flex gap-5 border-b border-[var(--border)] pb-8">
              <span className="pt-1 font-mono text-xs text-[var(--muted)]">
                P-{String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.tags.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
