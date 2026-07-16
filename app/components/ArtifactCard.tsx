"use client";

import type { Artifact } from "../data/portfolio";

type ArtifactCardProps = {
  artifact: Artifact;
  className?: string;
};

function ArtifactVisual({ kind }: { kind: Artifact["kind"] }) {
  switch (kind) {
    case "journey-map":
      return (
        <svg viewBox="0 0 120 56" className="mt-3 h-12 w-full" aria-hidden="true">
          <path
            d="M8 40 C28 40, 36 16, 56 16 S84 44, 112 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-[var(--muted-soft)]"
          />
          <circle cx="8" cy="40" r="3" className="fill-[var(--foreground)]" />
          <circle cx="56" cy="16" r="3" className="fill-[var(--accent)]" />
          <circle cx="112" cy="28" r="3" className="fill-[var(--muted)]" />
        </svg>
      );
    case "wireframe":
      return (
        <div
          className="mx-auto mt-3 w-14 rounded-md border border-[var(--line-strong)] bg-[var(--surface-soft)] p-1.5"
          aria-hidden="true"
        >
          <div className="h-2 rounded-sm bg-[var(--line-strong)]" />
          <div className="mt-1.5 space-y-1">
            <div className="h-1.5 rounded-sm bg-[var(--line)]" />
            <div className="h-1.5 w-3/4 rounded-sm bg-[var(--line)]" />
            <div className="mt-2 h-8 rounded-sm border border-dashed border-[var(--line-strong)]" />
          </div>
        </div>
      );
    case "compass":
      return (
        <svg viewBox="0 0 64 64" className="mx-auto mt-2 h-12 w-12" aria-hidden="true">
          <circle
            cx="32"
            cy="32"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-[var(--muted-soft)]"
          />
          <path d="M32 14 L36 32 L32 50 L28 32 Z" className="fill-[var(--foreground)]" />
          <circle cx="32" cy="32" r="2.5" className="fill-[var(--accent)]" />
        </svg>
      );
    case "nodes":
      return (
        <svg viewBox="0 0 100 48" className="mt-3 h-10 w-full" aria-hidden="true">
          <line
            x1="16"
            y1="24"
            x2="50"
            y2="12"
            stroke="currentColor"
            className="text-[var(--line-strong)]"
          />
          <line
            x1="50"
            y1="12"
            x2="84"
            y2="28"
            stroke="currentColor"
            className="text-[var(--line-strong)]"
          />
          <line
            x1="16"
            y1="24"
            x2="84"
            y2="28"
            stroke="currentColor"
            className="text-[var(--line-strong)]"
          />
          <circle cx="16" cy="24" r="4" className="fill-[var(--foreground)]" />
          <circle cx="50" cy="12" r="4" className="fill-[var(--accent)]" />
          <circle cx="84" cy="28" r="4" className="fill-[var(--muted)]" />
        </svg>
      );
    case "plan":
      return (
        <svg viewBox="0 0 100 56" className="mt-2 h-12 w-full" aria-hidden="true">
          <rect
            x="10"
            y="8"
            width="80"
            height="40"
            fill="none"
            stroke="currentColor"
            className="text-[var(--muted-soft)]"
          />
          <line
            x1="10"
            y1="28"
            x2="90"
            y2="28"
            stroke="currentColor"
            className="text-[var(--line-strong)]"
          />
          <line
            x1="40"
            y1="8"
            x2="40"
            y2="48"
            stroke="currentColor"
            className="text-[var(--line-strong)]"
          />
          <rect
            x="48"
            y="14"
            width="18"
            height="10"
            fill="none"
            stroke="currentColor"
            className="text-[var(--muted)]"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function ArtifactCard({ artifact, className = "" }: ArtifactCardProps) {
  const isSticky = artifact.kind === "sticky-note";
  const isQuote = artifact.kind === "quote";
  const isStatus = artifact.kind === "status";

  return (
    <div
      className={`absolute w-[8.75rem] sm:w-[9.75rem] ${className}`}
      style={{
        top: artifact.top,
        left: artifact.left,
        zIndex: artifact.zIndex,
      }}
    >
      <article
        tabIndex={0}
        aria-label={artifact.label}
        className="artifact-card group w-full overflow-hidden rounded-md border border-[var(--line-strong)] bg-[var(--surface)] p-3 text-left shadow-[0_1px_0_rgba(26,26,26,0.04)] focus-ring"
        style={{ ["--rot" as string]: `${artifact.rotate}deg` }}
      >
        {(isSticky || isQuote || isStatus) && (
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--muted-soft)]">
            {isSticky ? "Note" : isQuote ? "Research" : "Status"}
          </p>
        )}

        {isSticky ? (
          <div className="mt-1 rounded-sm bg-[#f1eee6] px-2 py-3">
            <p className="font-serif text-[13px] leading-snug text-[var(--foreground)]">
              {artifact.title}
            </p>
          </div>
        ) : isQuote ? (
          <p className="font-serif mt-1.5 text-[13px] leading-snug text-[var(--foreground)]">
            “{artifact.title}”
          </p>
        ) : isStatus ? (
          <>
            <p className="mt-1.5 text-sm font-medium tracking-tight">{artifact.title}</p>
            {artifact.body && (
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                {artifact.body}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-soft)]">
              {artifact.title}
            </p>
            <ArtifactVisual kind={artifact.kind} />
          </>
        )}

        {artifact.annotation && (
          <p className="mt-2 max-h-0 overflow-hidden text-[10px] tracking-wide text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:max-h-8 group-focus-visible:opacity-100">
            → {artifact.annotation}
          </p>
        )}
      </article>
    </div>
  );
}
