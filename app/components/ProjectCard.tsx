import type { Project } from "../data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="project-card group relative flex h-full flex-col overflow-hidden border border-[var(--line-strong)] bg-[var(--surface)] transition-colors duration-200"
      style={{ ["--project-accent" as string]: `var(${project.accentVar})` }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--project-accent)] transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
        aria-hidden="true"
      />

      <div
        className="relative h-40 border-b border-[var(--line)] bg-[var(--surface-soft)]"
        aria-hidden="true"
      >
        <div className="absolute inset-6 border border-dashed border-[var(--line-strong)] opacity-70" />
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-[11px]">
          <div>
            <dt className="uppercase tracking-[0.16em] text-[var(--muted-soft)]">Focus</dt>
            <dd className="mt-1 text-sm text-[var(--muted)]">{project.focus}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-[var(--muted-soft)]">Role</dt>
            <dd className="mt-1 text-sm text-[var(--muted)]">{project.role}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-[var(--muted-soft)]">Year</dt>
            <dd className="mt-1 text-sm text-[var(--muted)]">{project.year}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-[var(--line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-soft)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={project.href}
          className="link-underline focus-ring mt-auto pt-8 text-sm text-[var(--foreground)]"
        >
          View case study
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}
