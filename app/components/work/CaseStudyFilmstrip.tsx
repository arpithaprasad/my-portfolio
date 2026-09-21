"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/portfolio";
import ProjectPreview from "./ProjectPreview";

export default function CaseStudyFilmstrip({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wheelLock = useRef(false);

  const last = project.slides.length - 1;
  const go = (next: number) => {
    setIndex(Math.min(last, Math.max(0, next)));
  };

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setIndex((current) => Math.min(last, current + 1));
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => Math.max(0, current - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last, onClose]);

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 20 && Math.abs(event.deltaX) < 20) return;
    if (wheelLock.current) return;
    wheelLock.current = true;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    setIndex((current) => Math.min(last, Math.max(0, current + (delta > 0 ? 1 : -1))));
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 420);
  };

  return (
    <div
      className="filmstrip"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="filmstrip-top">
        <div className="filmstrip-top-left">
          <button
            ref={closeRef}
            type="button"
            className="type-label filmstrip-back focus-ring"
            onClick={onClose}
          >
            ← Back
          </button>
          <span className="type-label hidden text-[var(--muted)] sm:inline">
            Selected work
          </span>
        </div>
        <h3 id="case-study-title" className="filmstrip-title">
          {project.name}
        </h3>
        <p className="type-label filmstrip-tags">
          {project.tags.join(" · ")}
        </p>
      </div>

      <div className="filmstrip-carousel" onWheel={onWheel}>
        <div
          className="filmstrip-track"
          style={{ ["--filmstrip-index" as string]: String(index) }}
        >
          {project.slides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                className={`filmstrip-slide ${active ? "is-active" : "is-inactive"}`}
                onClick={() => go(slideIndex)}
                aria-label={`${project.name} slide ${slideIndex + 1}`}
                aria-current={active ? "true" : undefined}
              >
                <div className="filmstrip-media">
                  <ProjectPreview project={project} variant={slide.variant} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="filmstrip-fade-left" />
        <div className="filmstrip-fade-right" />
      </div>

      <div className="filmstrip-caption">
        <p>{project.slides[index].caption}</p>
      </div>

      <div className="filmstrip-nav">
        <button
          type="button"
          className="filmstrip-arrow focus-ring"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          type="button"
          className="filmstrip-arrow focus-ring"
          onClick={() => go(index + 1)}
          disabled={index === project.slides.length - 1}
          aria-label="Next slide"
        >
          →
        </button>
        <span className="type-label text-[var(--muted)]">
          {index + 1} / {project.slides.length}
        </span>
      </div>
    </div>
  );
}
