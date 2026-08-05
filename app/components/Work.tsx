import { portfolio } from "../data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-8 px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="work-heading"
          className="mb-12 text-2xl font-medium tracking-tight md:text-3xl"
        >
          Selected Work
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
