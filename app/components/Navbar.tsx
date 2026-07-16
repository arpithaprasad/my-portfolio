import { portfolio } from "../data/portfolio";

export default function Navbar() {
  return (
    <header className="px-6 py-7 md:px-12">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="focus-ring text-sm font-medium tracking-tight text-[var(--foreground)] md:text-base"
        >
          Arpitha Prasad
        </a>
        <ul className="flex items-center gap-6 md:gap-8">
          {portfolio.nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="link-underline focus-ring text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
