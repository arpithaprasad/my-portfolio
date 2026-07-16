type AnnotationNoteProps = {
  children: React.ReactNode;
  marker?: string;
  className?: string;
};

export default function AnnotationNote({
  children,
  marker = "FIELD NOTE",
  className = "",
}: AnnotationNoteProps) {
  return (
    <aside
      className={`max-w-[14rem] border-l border-[var(--line-strong)] pl-4 ${className}`}
      aria-label="Margin note"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted-soft)]">
        {marker}
      </p>
      <p className="font-serif mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--muted)] italic">
        {children}
      </p>
    </aside>
  );
}
