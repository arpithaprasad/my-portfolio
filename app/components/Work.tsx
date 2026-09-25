import { portfolio } from "../data/portfolio";
import WorkGallery from "./work/WorkGallery";

export default function Work() {
  return (
    <section
      id="work"
      className="relative z-10 scroll-mt-24 bg-[var(--background)] px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <h2 id="work-heading" className="type-label shrink-0 text-[var(--accent)]">
            Selected work
          </h2>
          <div className="h-px w-full bg-[var(--border)]" aria-hidden="true" />
        </div>

        <WorkGallery projects={portfolio.projects} />
      </div>
    </section>
  );
}
