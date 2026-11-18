"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageRooms, portfolio, RESUME_URL, rooms } from "../data/portfolio";
import { markReturnFrom } from "../lib/return";

export default function Navbar() {
  const pathname = usePathname();
  const current = pageRooms.find((k) => pathname === rooms[k].href || pathname.startsWith(rooms[k].href + "/"));

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center px-6 md:px-12">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4" aria-label="Primary">
        <Link
          href="/"
          onClick={() => current && markReturnFrom(current)}
          className="focus-ring shrink-0 text-sm font-medium tracking-tight text-[var(--foreground)] sm:text-base"
        >
          {portfolio.name}
        </Link>
        <ul className="flex items-center gap-4 sm:gap-7 md:gap-9">
          {pageRooms.map((key) => {
            const active = key === current;
            return (
              <li key={key}>
                <Link
                  href={rooms[key].href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link focus-ring text-[13px] sm:text-sm ${active ? "is-active font-medium" : "font-light"} text-[var(--foreground)]`}
                >
                  {rooms[key].label}
                </Link>
              </li>
            );
          })}
          {RESUME_URL && (
            <li className="hidden sm:block">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link focus-ring text-[13px] font-light text-[var(--foreground)] sm:text-sm"
              >
                Resume ↗
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
