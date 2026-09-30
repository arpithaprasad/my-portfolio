import { portfolio } from "../data/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2
          id="contact-heading"
          className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)] md:text-5xl"
        >
          {portfolio.contact.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-[var(--muted)] md:text-lg">
          {portfolio.contact.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href={`mailto:${portfolio.contact.email}`}
            className="focus-ring text-base text-[var(--accent)] underline underline-offset-4"
          >
            {portfolio.contact.email}
          </a>
          <a
            href={portfolio.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-base text-[var(--accent)]"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}
