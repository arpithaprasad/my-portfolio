import type { Project } from "../../data/portfolio";
import FirstSparkPreview from "./FirstSparkPreview";
import PathPreview from "./PathPreview";
import PotteryTownPreview from "./PotteryTownPreview";

export default function ProjectPreview({
  project,
  variant,
}: {
  project: Project;
  variant: string;
}) {
  switch (project.id) {
    case "firstspark":
      return <FirstSparkPreview variant={variant} />;
    case "path":
      return <PathPreview variant={variant} />;
    case "pottery-town":
      return <PotteryTownPreview variant={variant} />;
    default:
      return null;
  }
}
