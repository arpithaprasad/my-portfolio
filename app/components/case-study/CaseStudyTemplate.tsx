"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  caseStudySections,
  type CaseStudyData,
  type CaseStudySectionId,
} from "../../data/caseStudies";
import CaseStudySectionLabel from "./CaseStudySectionLabel";
import PlaceholderImage from "./PlaceholderImage";

type CaseStudyTemplateProps = {
  study: CaseStudyData;
};

function SectionNavButton({
  label,
  active,
  onClick,
  variant = "sidebar",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "sidebar" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`focus-ring shrink-0 rounded-full px-4 py-2 text-[12px] font-medium transition-colors ${
          active
            ? "bg-[#1A1A1A] text-white"
            : "bg-[#1A1A1A]/[0.05] text-[#1A1A1A]/55"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring relative w-full py-1.5 pl-4 text-left text-[13px] transition-colors ${
        active
          ? "font-semibold text-[#1A1A1A]"
          : "font-medium text-[#1A1A1A]/40 hover:text-[#1A1A1A]/65"
      }`}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-[#3D7A74]"
          aria-hidden
        />
      )}
      {label}
    </button>
  );
}

function MetadataRow({
  label,
  children,
  isLast = false,
}: {
  label: string;
  children: ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 py-2.5 ${
        isLast ? "" : "border-b border-[#1A1A1A]/[0.06]"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/40">
        {label}
      </span>
      <div className="flex flex-wrap justify-end gap-1.5">{children}</div>
    </div>
  );
}

function MetadataPanel({ study }: { study: CaseStudyData }) {
  return (
    <div className="border-t border-[#1A1A1A]/10">
      <MetadataRow label="Contributions">
        {study.contributions.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#3D7A74]/25 bg-[#3D7A74]/[0.07] px-2.5 py-0.5 text-[10px] font-medium text-[#3D7A74]"
          >
            {tag}
          </span>
        ))}
      </MetadataRow>
      <MetadataRow label="Timeline">
        <span className="text-right text-[12px] font-medium text-[#1A1A1A]/70">
          {study.timeline}
        </span>
      </MetadataRow>
      <MetadataRow label="Role" isLast>
        <span className="text-right text-[12px] font-medium text-[#1A1A1A]/70">
          {study.role}
        </span>
      </MetadataRow>
    </div>
  );
}

export default function CaseStudyTemplate({ study }: CaseStudyTemplateProps) {
  const [activeSection, setActiveSection] =
    useState<CaseStudySectionId>("overview");

  const scrollToSection = useCallback((id: CaseStudySectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    caseStudySections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const navButtons = (variant: "sidebar" | "mobile") =>
    caseStudySections.map(({ id, label }) => (
      <SectionNavButton
        key={id}
        label={label}
        active={activeSection === id}
        onClick={() => scrollToSection(id)}
        variant={variant}
      />
    ));

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-[1680px] px-[clamp(1.5rem,6vw,5rem)]">
        <div className="lg:grid lg:grid-cols-[minmax(280px,32%)_minmax(0,1fr)] lg:gap-x-[clamp(2.5rem,4vw,4.5rem)]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-dvh lg:flex-col lg:overflow-hidden lg:py-8">
            <Link
              href="/#work"
              className="focus-ring mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#1A1A1A]/45 transition-colors hover:text-[#1A1A1A]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </Link>

            <h1 className="font-serif text-[clamp(1.6rem,2.4vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A]">
              {study.name}
            </h1>
            <p className="mt-3 text-[13px] leading-[1.55] text-[#1A1A1A]/55">
              {study.description}
            </p>

            <div className="mt-5">
              <MetadataPanel study={study} />
            </div>

            <nav className="mt-auto shrink-0 space-y-0 pt-6" aria-label="Case study sections">
              {navButtons("sidebar")}
            </nav>
          </aside>

          {/* Right column */}
          <div className="min-w-0">
            {/* Mobile header */}
            <div className="pt-8 lg:hidden">
              <Link
                href="/#work"
                className="focus-ring mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#1A1A1A]/45 transition-colors hover:text-[#1A1A1A]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </Link>
              <h1 className="font-serif text-[clamp(1.75rem,6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1A1A1A]">
                {study.name}
              </h1>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#1A1A1A]/55">
                {study.description}
              </p>
              <div className="mt-6">
                <MetadataPanel study={study} />
              </div>
            </div>

            <header className="mt-8 lg:mt-10">
              <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]">
                {study.hero.title}
              </h2>
              <div className="mt-8">
                <PlaceholderImage
                  label={study.hero.imageLabel}
                  heightClass="h-[280px] sm:h-[340px] lg:h-[420px]"
                  backgroundClass="bg-[#F0F0F0]"
                />
              </div>
            </header>

            <nav
              className="scrollbar-none -mx-[clamp(1.5rem,6vw,5rem)] mt-4 flex gap-2 overflow-x-auto px-[clamp(1.5rem,6vw,5rem)] pb-4 lg:hidden"
              aria-label="Case study sections"
            >
              {navButtons("mobile")}
            </nav>

            <main className="pt-10 lg:pt-12">
              {/* OVERVIEW */}
              <section
                id="overview"
                className="scroll-mt-28 mb-20 lg:scroll-mt-10"
                aria-labelledby="overview-heading"
              >
                <CaseStudySectionLabel>Overview</CaseStudySectionLabel>
                <h2
                  id="overview-heading"
                  className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
                >
                  Overview
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      The Problem
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                      {study.overview.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      My Role
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                      {study.overview.myRole}
                    </p>
                  </div>
                </div>

                <div className="mt-10 border-t border-[#1A1A1A]/[0.06] pt-10">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    The Goal
                  </h3>
                  <p className="mt-3 text-[15px] font-semibold leading-[1.75] text-[#1A1A1A]">
                    {study.overview.goal}
                  </p>
                </div>
              </section>

              {/* PROBLEM */}
              <section
                id="problem"
                className="scroll-mt-28 mb-20 lg:scroll-mt-10"
                aria-labelledby="problem-heading"
              >
                <CaseStudySectionLabel>Problem</CaseStudySectionLabel>
                <h2
                  id="problem-heading"
                  className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
                >
                  Problem
                </h2>
                <p className="mt-5 max-w-[65ch] text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                  {study.problem.body}
                </p>
                <div className="mt-8">
                  <PlaceholderImage
                    label={study.problem.imageLabel}
                    heightClass="h-[260px] sm:h-[300px] lg:h-[360px]"
                    backgroundClass="bg-[#F0F0F0]"
                  />
                </div>
              </section>

              {/* PROCESS */}
              <section
                id="process"
                className="scroll-mt-28 mb-20 lg:scroll-mt-10"
                aria-labelledby="process-heading"
              >
                <CaseStudySectionLabel>Process</CaseStudySectionLabel>
                <h2
                  id="process-heading"
                  className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
                >
                  Process
                </h2>

                <ol className="mt-8 space-y-16">
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
                          <p className="mt-3 text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                            {step.body}
                          </p>
                          <div className="mt-8">
                            <PlaceholderImage
                              label={step.imageLabel}
                              heightClass="h-[260px] sm:h-[300px] lg:h-[360px]"
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
              <section
                id="solution"
                className="scroll-mt-28 mb-20 lg:scroll-mt-10"
                aria-labelledby="solution-heading"
              >
                <CaseStudySectionLabel>Solution</CaseStudySectionLabel>
                <h2
                  id="solution-heading"
                  className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
                >
                  Solution
                </h2>
                <p className="mt-5 max-w-[65ch] text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                  {study.solution.intro}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {study.solution.sideImageLabels.map((label) => (
                    <PlaceholderImage
                      key={label}
                      label={label}
                      heightClass="h-[260px] sm:h-[300px]"
                      backgroundClass="bg-[#F0F0F0]"
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <PlaceholderImage
                    label={study.solution.fullWidthImageLabel}
                    heightClass="h-[260px] sm:h-[300px] lg:h-[360px]"
                    backgroundClass="bg-[#F0F0F0]"
                  />
                </div>
              </section>

              {/* OUTCOME */}
              <section
                id="outcome"
                className="scroll-mt-28 lg:scroll-mt-10"
                aria-labelledby="outcome-heading"
              >
                <CaseStudySectionLabel>Outcome</CaseStudySectionLabel>
                <h2
                  id="outcome-heading"
                  className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A]"
                >
                  Outcome
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {study.outcome.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-[#1A1A1A]/10 bg-[var(--surface)] px-5 py-6 text-center"
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

                <p className="mt-10 max-w-[65ch] text-[15px] leading-[1.75] text-[#1A1A1A]/75">
                  {study.outcome.learnings}
                </p>

                <div className="mt-16 border-t border-[#1A1A1A]/[0.06] pt-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/35">
                    Next project
                  </p>
                  <Link
                    href={study.nextProject.href}
                    className="focus-ring mt-3 inline-flex items-center gap-2 font-serif text-xl font-semibold text-[#1A1A1A] transition-colors hover:text-[#3D7A74]"
                  >
                    {study.nextProject.name}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
