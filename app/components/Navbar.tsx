"use client";

import { portfolio } from "../data/portfolio";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/85 px-6 py-5 backdrop-blur-md md:px-12">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="focus-ring text-base font-medium tracking-tight text-[var(--foreground)]"
        >
          Arpitha Prasad
        </a>
        <ul className="flex items-center gap-7 md:gap-9">
          {portfolio.nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link focus-ring text-sm font-light text-[var(--foreground)]"
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
