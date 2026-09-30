type PolaroidProps = {
  caption?: string;
  rotation?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  tint?: string;
  liftOnHover?: boolean;
};

export default function Polaroid({
  caption,
  rotation = -2,
  className = "",
  size = "md",
  tint = "#e6d0d0",
  liftOnHover = true,
}: PolaroidProps) {
  const sizeClass =
    size === "sm" ? "polaroid-sm" : size === "lg" ? "polaroid-lg" : "";

  return (
    <figure
      className={`polaroid ${sizeClass} ${liftOnHover ? "polaroid-lift" : ""} ${className}`}
      style={{ ["--rot" as string]: `${rotation}deg`, ["--tint" as string]: tint }}
    >
      <div className="polaroid-photo">PHOTO</div>
      {caption ? (
        <figcaption className="polaroid-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
