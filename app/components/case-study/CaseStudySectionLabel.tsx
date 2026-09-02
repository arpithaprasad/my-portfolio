type CaseStudySectionLabelProps = {
  children: string;
};

export default function CaseStudySectionLabel({
  children,
}: CaseStudySectionLabelProps) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 className="shrink-0 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
        {children}
      </h2>
      <div className="h-px w-full bg-[var(--accent)]" aria-hidden="true" />
    </div>
  );
}
