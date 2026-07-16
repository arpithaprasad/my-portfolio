import { portfolio } from "../data/portfolio";
import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-8 px-6 py-16 md:px-12 md:py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{portfolio.about.title}</SectionLabel>
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--foreground)] md:text-xl">
          {portfolio.about.body}
        </p>
      </div>
    </section>
  );
}
