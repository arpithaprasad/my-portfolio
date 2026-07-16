import { portfolio } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-8 px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Selected journeys</SectionLabel>
            <h2
              id="work-heading"
              className="mt-3 text-2xl font-medium tracking-tight md:text-3xl"
            >
              Documented expeditions
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Case studies framed as field entries — each one a path through a
            complex system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
