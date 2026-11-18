import { portfolio } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <p>Designed and built by {portfolio.name} · {new Date().getFullYear()}</p>
        <p className="font-mono uppercase tracking-[0.16em]">Studio AP · 1:200</p>
      </div>
    </footer>
  );
}
