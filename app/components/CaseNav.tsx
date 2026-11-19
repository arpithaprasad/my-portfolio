"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/*
 * Section links for a case study. The sidebar version marks the section in
 * view with a bar in the project's colour; the mobile version is a row of chips.
 */
export default function CaseNav({
  items,
  color,
  variant,
}: {
  items: Item[];
  color: string;
  variant: "sidebar" | "chips";
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (variant === "chips") {
    return (
      <nav aria-label="Case study sections" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={on ? "location" : undefined}
              className="focus-ring shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
              style={
                on
                  ? { background: color, borderColor: color, color: "#fff" }
                  : { borderColor: "var(--border)", color: "var(--muted)", background: "var(--surface)" }
              }
            >
              {it.label}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Case study sections">
      <ul className="space-y-0.5">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`focus-ring relative block py-1.5 pl-4 text-sm transition-colors [@media(max-height:760px)]:py-1 [@media(max-height:760px)]:text-[13px] ${
                  on ? "font-semibold text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full transition-opacity"
                  style={{ background: color, opacity: on ? 1 : 0 }}
                />
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
