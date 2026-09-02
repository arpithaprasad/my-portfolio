type PlaceholderImageProps = {
  label: string;
  heightClass: string;
  backgroundClass?: string;
};

export default function PlaceholderImage({
  label,
  heightClass,
  backgroundClass = "bg-[#E8E8E8]",
}: PlaceholderImageProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${heightClass} ${backgroundClass}`}
      role="img"
      aria-label={label}
    >
      <p className="px-4 text-center text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}
