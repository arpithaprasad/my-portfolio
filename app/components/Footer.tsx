import { portfolio } from "../data/portfolio";
import SectionLabel from "./SectionLabel";

export default function Footer() {
  const { footer } = portfolio;

  return (
    <footer
      id="contact"
      className="scroll-mt-8 border-t border-[var(--line)] px-6 py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Contact</SectionLabel>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--foreground)] md:text-xl">
          {footer.sentence}
        </p>

        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <li>
            <a
              href={`mailto:${footer.email}`}
              className="link-underline focus-ring text-[var(--foreground)]"
            >
              {footer.email}
            </a>
          </li>
          <li>
            <a
              href={footer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline focus-ring text-[var(--muted)]"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={footer.resume}
              className="link-underline focus-ring text-[var(--muted)]"
            >
              Resume
            </a>
          </li>
        </ul>

        <p className="font-serif mt-14 text-sm italic text-[var(--muted-soft)]">
          {footer.signature}
        </p>
      </div>
    </footer>
  );
}
