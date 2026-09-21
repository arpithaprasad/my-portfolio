"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { Project } from "../../data/portfolio";
import CaseStudyFilmstrip from "./CaseStudyFilmstrip";
import WorkTile from "./WorkTile";

type TooltipState = {
  x: number;
  y: number;
  project: Project;
};

export default function WorkGallery({ projects }: { projects: readonly Project[] }) {
  const tooltipId = useId();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeId, setActiveId] = useState<Project["id"] | null>(null);
  const [hintHidden, setHintHidden] = useState(false);

  const activeProject = projects.find((project) => project.id === activeId) ?? null;

  const openProject = useCallback((id: Project["id"]) => {
    setActiveId(id);
    setTooltip(null);
    setHintHidden(true);
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeProject]);

  const tooltipX = tooltip
    ? Math.min(tooltip.x + 18, typeof window !== "undefined" ? window.innerWidth - 260 : tooltip.x)
    : 0;
  const tooltipY = tooltip ? tooltip.y + 16 : 0;

  return (
    <>
      <div className="work-masonry">
        {projects.map((project) => (
          <WorkTile
            key={project.id}
            project={project}
            onOpen={() => openProject(project.id)}
            onTooltip={setTooltip}
          />
        ))}
      </div>

      <p
        className={`work-hint-pill ${hintHidden ? "work-hint-pill-hidden" : ""}`}
        aria-hidden="true"
      >
        Tap a project to open
      </p>

      {tooltip && !activeProject ? (
        <div
          id={tooltipId}
          className="work-tooltip"
          style={{ left: tooltipX, top: tooltipY }}
          role="tooltip"
        >
          <p className="type-label text-[var(--foreground)]">{tooltip.project.name}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
            {tooltip.project.tooltip}
          </p>
        </div>
      ) : null}

      {activeProject ? (
        <CaseStudyFilmstrip
          project={activeProject}
          onClose={() => setActiveId(null)}
        />
      ) : null}
    </>
  );
}
