import { portfolio } from "../data/portfolio";
import SectionLabel from "./SectionLabel";

export default function FieldNotes() {
  return (
    <section
      id="field-notes"
      className="scroll-mt-8 border-t border-[var(--line)] px-6 py-16 md:px-12 md:py-20"
      aria-labelledby="field-notes-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Playground</SectionLabel>
        <h2
          id="field-notes-heading"
          className="mt-3 text-xl font-medium tracking-tight md:text-2xl"
        >
          Field notes &amp; experiments
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[var(--muted)]">
          Lighter explorations — less finished, still formative.
        </p>

        <ul className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {portfolio.fieldNotes.map((note, index) => (
            <li
              key={note.id}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 md:gap-8"
            >
              <span className="font-serif text-sm text-[var(--muted-soft)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-medium tracking-tight text-[var(--foreground)]">
                  {note.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{note.description}</p>
              </div>
              <span className="text-xs text-[var(--muted-soft)]">{note.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
