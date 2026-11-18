import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { portfolio, RESUME_URL } from "../data/portfolio";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { contact } = portfolio;
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: "arpitha-prasad19", href: contact.linkedin, external: true },
    ...(RESUME_URL ? [{ label: "Resume", value: "Google Drive", href: RESUME_URL, external: true }] : []),
  ];
  return (
    <PageShell room="contact">
      <ul className="max-w-2xl">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="focus-ring group flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-6 first:border-t"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{l.label}</span>
              <span className="font-serif text-xl text-[var(--foreground)] transition-colors group-hover:text-[var(--room)] md:text-2xl">
                {l.value} {l.external ? "↗" : "→"}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
