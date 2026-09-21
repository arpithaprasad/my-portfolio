import type { Metadata } from "next";
import CaseStudyTemplate from "../../components/case-study/CaseStudyTemplate";
import { caseStudies } from "../../data/caseStudies";

const study = caseStudies.path;

export const metadata: Metadata = {
  title: `${study.name} — Arpitha Prasad`,
  description: study.description,
};

export default function PathCaseStudyPage() {
  return <CaseStudyTemplate study={study} />;
}
