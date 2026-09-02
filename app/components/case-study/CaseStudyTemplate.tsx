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
        className={`focus-ring shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${
          active
            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
            : "border-[var(--border)] text-[var(--muted)]"
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
      className={`focus-ring w-full border-l-2 py-2 pl-3 text-left text-sm transition-colors ${
        active
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {label}
    </button>
  );
}

function MetadataRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--border)] py-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
      <div className="mt-2">{children}</div>
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
      {/* Mobile header + horizontal nav */}
      <div className="border-b border-[var(--border)] lg:hidden">
        <div className="px-6 py-5">
          <Link
            href="/#work"
            className="focus-ring text-sm text-[var(--accent)]"
          >
            ← Back
          </Link>
          <h1 className="font-serif mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {study.name}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {study.description}
          </p>
        </div>
        <nav
          className="flex gap-2 overflow-x-auto px-6 pb-4"
          aria-label="Case study sections"
        >
          {navButtons("mobile")}
        </nav>
      </div>

      <div className="flex min-h-screen">
        {/* Left sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-[var(--border)] px-8 py-10 lg:flex">
          <Link
            href="/#work"
            className="focus-ring text-sm text-[var(--accent)]"
          >
            ← Back
          </Link>

          <h1 className="font-serif mt-6 text-[2rem] font-bold leading-tight tracking-tight text-[var(--foreground)]">
            {study.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {study.description}
          </p>

          <div className="my-6 border-t border-[var(--border)]" />

          <MetadataRow label="Contributions">
            <ul className="flex flex-wrap gap-2">
              {study.contributions.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--accent)] px-2.5 py-0.5 text-[11px] text-[var(--accent)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </MetadataRow>

          <MetadataRow label="Timeline">
            <p className="text-sm text-[var(--muted)]">{study.timeline}</p>
          </MetadataRow>

          <MetadataRow label="Role">
            <p className="text-sm text-[var(--muted)]">{study.role}</p>
          </MetadataRow>

          <div className="my-6 border-t border-[var(--border)]" />

          <nav className="space-y-1" aria-label="Case study sections">
            {navButtons("sidebar")}
          </nav>
        </aside>

        {/* Right content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[760px] px-6 py-10 lg:px-12 lg:py-[60px]">
            {/* OVERVIEW */}
            <section
              id="overview"
              className="scroll-mt-24 mb-20 lg:scroll-mt-10"
              aria-labelledby="overview-heading"
            >
              <CaseStudySectionLabel>Overview</CaseStudySectionLabel>
              <h2
                id="overview-heading"
                className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)]"
              >
                Overview
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    The Problem
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                    {study.overview.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    My Role
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                    {study.overview.myRole}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-[var(--border)] pt-10">
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  The Goal
                </h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--foreground)]">
                  {study.overview.goal}
                </p>
              </div>
            </section>

            {/* PROBLEM */}
            <section
              id="problem"
              className="scroll-mt-24 mb-20 lg:scroll-mt-10"
              aria-labelledby="problem-heading"
            >
              <CaseStudySectionLabel>Problem</CaseStudySectionLabel>
              <h2
                id="problem-heading"
                className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)]"
              >
                Problem
              </h2>
              <p className="mt-8 text-base leading-relaxed text-[var(--muted)]">
                {study.problem.body}
              </p>
              <div className="mt-10">
                <PlaceholderImage
                  label={study.problem.imageLabel}
                  heightClass="h-[400px]"
                  backgroundClass="bg-[#F0F0F0]"
                />
              </div>
            </section>

            {/* PROCESS */}
            <section
              id="process"
              className="scroll-mt-24 mb-20 lg:scroll-mt-10"
              aria-labelledby="process-heading"
            >
              <CaseStudySectionLabel>Process</CaseStudySectionLabel>
              <h2
                id="process-heading"
                className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)]"
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
            <section
              id="solution"
              className="scroll-mt-24 mb-20 lg:scroll-mt-10"
              aria-labelledby="solution-heading"
            >
              <CaseStudySectionLabel>Solution</CaseStudySectionLabel>
              <h2
                id="solution-heading"
                className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)]"
              >
                Solution
              </h2>
              <p className="mt-8 text-base leading-relaxed text-[var(--muted)]">
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
            <section
              id="outcome"
              className="scroll-mt-24 lg:scroll-mt-10"
              aria-labelledby="outcome-heading"
            >
              <CaseStudySectionLabel>Outcome</CaseStudySectionLabel>
              <h2
                id="outcome-heading"
                className="font-serif text-4xl font-medium tracking-tight text-[var(--foreground)]"
              >
                Outcome
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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

              <div className="mt-16 border-t border-[var(--border)] pt-10">
                <Link
                  href={study.nextProject.href}
                  className="focus-ring font-serif group inline-flex items-center gap-2 text-3xl font-medium tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)] md:text-4xl"
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
        </main>
      </div>
    </div>
  );
}
