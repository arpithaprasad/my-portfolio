import Link from "next/link";
import type { CaseStudyData } from "../../data/caseStudies";
import CaseStudyBackNav from "./CaseStudyBackNav";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudySectionLabel from "./CaseStudySectionLabel";
import PlaceholderImage from "./PlaceholderImage";

type CaseStudyTemplateProps = {
  study: CaseStudyData;
};

export default function CaseStudyTemplate({ study }: CaseStudyTemplateProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <CaseStudyBackNav />

          <article className="mx-auto max-w-[760px] px-6">
            <CaseStudyHero
              label={study.label}
              name={study.name}
              description={study.description}
              role={study.role}
              year={study.year}
              duration={study.duration}
            />

            {/* OVERVIEW */}
            <section className="mb-24 md:mb-28" aria-labelledby="overview-heading">
              <CaseStudySectionLabel>Overview</CaseStudySectionLabel>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
                <div>
                  <h3
                    id="overview-heading"
                    className="text-lg font-semibold text-[var(--foreground)]"
                  >
                    The Problem
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                    {study.overview.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    My Role
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--muted)]">
                    {study.overview.roleBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 border-t border-[var(--border)] pt-10">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  The Goal
                </h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--foreground)]">
                  {study.overview.goal}
                </p>
              </div>
            </section>

            {/* PROCESS */}
            <section className="mb-24 md:mb-28" aria-labelledby="process-heading">
              <CaseStudySectionLabel>Process</CaseStudySectionLabel>
              <h2 id="process-heading" className="sr-only">
                Process
              </h2>

              <ol className="space-y-16 md:space-y-20">
                {study.process.map((step) => (
                  <li key={step.number}>
                    <div className="flex gap-6 md:gap-8">
                      <span
                        className="font-serif shrink-0 text-5xl leading-none text-[#E8E8E8] md:text-6xl"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                          {step.body}
                        </p>
                        <div className="mt-8">
                          <PlaceholderImage
                            label={step.imageLabel}
                            heightClass="h-[360px]"
                            backgroundClass="bg-[#F0F0F0]"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* SOLUTION */}
            <section className="mb-24 md:mb-28" aria-labelledby="solution-heading">
              <CaseStudySectionLabel>Solution</CaseStudySectionLabel>
              <h2 id="solution-heading" className="sr-only">
                Solution
              </h2>

              <p className="text-base leading-relaxed text-[var(--muted)]">
                {study.solution.intro}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                {study.solution.sideImageLabels.map((label) => (
                  <PlaceholderImage
                    key={label}
                    label={label}
                    heightClass="h-[300px]"
                    backgroundClass="bg-[#F0F0F0]"
                  />
                ))}
              </div>

              <div className="mt-4">
                <PlaceholderImage
                  label={study.solution.fullWidthImageLabel}
                  heightClass="h-[400px]"
                  backgroundClass="bg-[#F0F0F0]"
                />
              </div>
            </section>

            {/* OUTCOME */}
            <section className="mb-24 md:mb-28" aria-labelledby="outcome-heading">
              <CaseStudySectionLabel>Outcome</CaseStudySectionLabel>
              <h2 id="outcome-heading" className="sr-only">
                Outcome
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {study.outcome.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-center"
                  >
                    <p className="font-serif text-3xl font-medium text-[var(--accent)] md:text-4xl">
                      {stat.metric}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-base leading-relaxed text-[var(--muted)]">
                {study.outcome.learnings}
              </p>
            </section>
          </article>

          {/* NEXT PROJECT — full width */}
          <section className="border-t border-[var(--border)] px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[760px]">
              <p className="text-sm text-[var(--muted)]">Next project</p>
              <Link
                href={study.nextProject.href}
                className="focus-ring font-serif group mt-3 inline-flex items-center gap-2 text-3xl font-medium tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)] md:text-4xl"
              >
                {study.nextProject.name}
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
