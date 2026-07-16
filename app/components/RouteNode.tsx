type RouteNodeProps = {
  coordinate: string;
  title: string;
  description: string;
  isLast?: boolean;
};

export default function RouteNode({
  coordinate,
  title,
  description,
  isLast = false,
}: RouteNodeProps) {
  return (
    <li className="relative flex gap-5 md:gap-6">
      <div className="flex flex-col items-center">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[10px] font-medium tracking-wider text-[var(--muted)]"
          aria-hidden="true"
        >
          {coordinate}
        </span>
        {!isLast && (
          <span
            className="mt-2 w-px flex-1 bg-[var(--line-strong)]"
            aria-hidden="true"
          />
        )}
      </div>
      <div className={isLast ? "pb-0" : "pb-8 md:pb-10"}>
        <h3 className="text-base font-medium tracking-tight text-[var(--foreground)] md:text-lg">
          {title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      </div>
    </li>
  );
}
