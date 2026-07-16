type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--muted-soft)] ${className}`}
    >
      {children}
    </p>
  );
}
