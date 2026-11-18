"use client";

import { portfolio } from "../data/portfolio";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-transparent px-6 py-6 md:px-12">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="focus-ring shrink-0 text-sm font-medium tracking-tight text-[var(--foreground)] sm:text-base"
        >
          Arpitha Prasad
        </a>
        <ul className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {portfolio.nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link focus-ring text-[13px] font-light text-[var(--foreground)] sm:text-sm"
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
