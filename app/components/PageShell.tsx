import type { CSSProperties, ReactNode } from "react";
import { rooms, type RoomKey } from "../data/portfolio";
import Footer from "./Footer";
import KeyPlan from "./KeyPlan";

/*
 * Every inner page is a "room" in the site model: a header tinted with that
 * building's colour, the key plan showing where you are, then the content.
 */
export default function PageShell({
  room,
  kicker,
  title,
  intro,
  children,
}: {
  room: RoomKey;
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const r = rooms[room];
  return (
    <div style={{ "--room": r.color, "--room-ink": r.ink, "--room-tint": r.tint } as CSSProperties}>
      <header className="-mt-20 bg-[linear-gradient(180deg,var(--room-tint)_0%,var(--background)_100%)] px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--room-ink)]">
              {kicker ?? `${r.number} · ${r.label}`}
            </p>
            <h1 className="font-serif mt-4 text-[2.6rem] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] md:text-[3.75rem]">
              {title ?? r.title}
            </h1>
            {(intro ?? r.intro) && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">{intro ?? r.intro}</p>
            )}
          </div>
          <KeyPlan current={room} className="shrink-0 self-end md:self-auto" />
        </div>
      </header>
      <main className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
