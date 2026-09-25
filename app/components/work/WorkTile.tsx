import Link from "next/link";
import type { Project } from "../../data/portfolio";
import ProjectPreview from "./ProjectPreview";

const heightClass = {
  tall: "h-[420px]",
  mid: "h-[340px]",
  wide: "h-[248px]",
};

type WorkTileProps = {
  project: Project;
  onTooltip: (tooltip: { x: number; y: number; project: Project } | null) => void;
};

export default function WorkTile({ project, onTooltip }: WorkTileProps) {
  return (
    <div className="work-tile">
      <Link
        href={project.href}
        className="focus-ring work-tile-button"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          onTooltip({ x: event.clientX, y: event.clientY, project });
        }}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          onTooltip({ x: event.clientX, y: event.clientY, project });
        }}
        onPointerLeave={() => onTooltip(null)}
        aria-label={`Open ${project.name} case study`}
      >
        <div className={`relative w-full overflow-hidden ${heightClass[project.aspect]}`}>
          <ProjectPreview project={project} variant={project.slides[0].variant} />
        </div>
      </Link>
    </div>
  );
}
