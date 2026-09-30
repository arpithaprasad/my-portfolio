import { portfolio } from "../data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <h2
            id="work-heading"
            className="shrink-0 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            SELECTED WORK
          </h2>
          <div className="h-px w-full bg-[var(--accent)]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
