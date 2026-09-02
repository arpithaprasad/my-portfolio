import type { Metadata } from "next";
import CaseStudyTemplate from "../../components/case-study/CaseStudyTemplate";
import { caseStudies } from "../../data/caseStudies";

const study = caseStudies["pottery-town"];

export const metadata: Metadata = {
  title: `${study.name} — Arpitha Prasad`,
  description: study.description,
};

export default function PotteryTownCaseStudyPage() {
  return <CaseStudyTemplate study={study} />;
}
