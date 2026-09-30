import { portfolio } from "../data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2
            id="about-heading"
            className="font-serif text-3xl font-medium tracking-tight text-[var(--foreground)] md:text-4xl"
          >
            {portfolio.about.heading}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-5">
            {portfolio.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--foreground)]">
            {portfolio.about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
