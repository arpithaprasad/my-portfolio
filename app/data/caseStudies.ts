export type CaseStudyStat = {
  metric: string;
  label: string;
};

export type CaseStudyProcessStep = {
  number: string;
  title: string;
  body: string;
  imageLabel: string;
};

export type CaseStudySectionId =
  | "overview"
  | "problem"
  | "process"
  | "solution"
  | "outcome";

export const caseStudySections: readonly {
  id: CaseStudySectionId;
  label: string;
}[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export type CaseStudyData = {
  slug: string;
  name: string;
  description: string;
  contributions: readonly string[];
  timeline: string;
  role: string;
  nextProject: {
    name: string;
    href: string;
  };
  hero: {
    title: string;
    imageLabel: string;
  };
  overview: {
    problem: string;
    myRole: string;
    goal: string;
  };
  problem: {
    body: string;
    imageLabel: string;
  };
  process: readonly CaseStudyProcessStep[];
  solution: {
    intro: string;
    sideImageLabels: readonly [string, string];
    fullWidthImageLabel: string;
  };
  outcome: {
    stats: readonly CaseStudyStat[];
    learnings: string;
  };
};

// PLACEHOLDER: shared copy reused across case studies until final content is written.
const placeholderOverview = {
  problem:
    "PLACEHOLDER: 2–3 sentences describing the core user problem — who was struggling, in what context, and why existing solutions fell short.",
  myRole:
    "PLACEHOLDER: 2–3 sentences summarizing your responsibilities on this project — research, design, prototyping, and collaboration.",
  goal: "PLACEHOLDER: One bold sentence stating the north-star goal for this project.",
} as const;

const placeholderProblem = {
  body: "PLACEHOLDER: A fuller paragraph expanding on the problem space — user pain points, systemic barriers, and the opportunity for design intervention.",
  imageLabel: "PLACEHOLDER: Problem framing diagram or research artifact",
} as const;

const placeholderProcess: readonly CaseStudyProcessStep[] = [
  {
    number: "01",
    title: "PLACEHOLDER: Discover",
    body: "PLACEHOLDER: 2–3 sentences on research methods, key insights, and how they reframed the problem.",
    imageLabel: "PLACEHOLDER: Research synthesis or affinity map",
  },
  {
    number: "02",
    title: "PLACEHOLDER: Define",
    body: "PLACEHOLDER: 2–3 sentences on how insights became principles, flows, or design requirements.",
    imageLabel: "PLACEHOLDER: User journey or IA diagram",
  },
  {
    number: "03",
    title: "PLACEHOLDER: Design",
    body: "PLACEHOLDER: 2–3 sentences on iteration, testing, and how the solution took shape.",
    imageLabel: "PLACEHOLDER: Wireframes or mid-fidelity screens",
  },
];

const placeholderSolution = {
  intro:
    "PLACEHOLDER: Intro paragraph summarizing the final solution — what shipped, how it works, and what makes it distinct.",
  sideImageLabels: [
    "PLACEHOLDER: Key screen — primary flow",
    "PLACEHOLDER: Key screen — supporting detail",
  ],
  fullWidthImageLabel: "PLACEHOLDER: Full solution overview or hero screen",
} as const;

const placeholderOutcome = {
  stats: [
    { metric: "↑ 40%", label: "PLACEHOLDER: Primary metric" },
    { metric: "3.2×", label: "PLACEHOLDER: Secondary metric" },
    { metric: "92%", label: "PLACEHOLDER: Qualitative signal" },
  ],
  learnings:
    "PLACEHOLDER: Reflection on what worked, what you would do differently, and what this project taught you about the problem space.",
} as const;

export const caseStudies = {
  firstspark: {
    slug: "firstspark",
    name: "FirstSpark",
    description:
      "Designing confidence for first-gen immigrants navigating the U.S. financial system",
    contributions: ["UX Design", "Research", "Prototyping"],
    timeline: "Jan 2024 – Apr 2024",
    role: "UX Designer",
    nextProject: { name: "Path", href: "/work/path" },
    hero: {
      title:
        "Designing confidence for first-gen immigrants navigating the U.S. financial system",
      imageLabel: "PLACEHOLDER: Cover / hero image",
    },
    overview: placeholderOverview,
    problem: placeholderProblem,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
  path: {
    slug: "path",
    name: "Path",
    description:
      "Redesigning the career transition experience to feel guided, structured, and human",
    contributions: ["UX Design", "Usability Testing", "Systems Design"],
    timeline: "Sep 2024 – Dec 2024",
    role: "UX Designer",
    nextProject: { name: "Pottery Town", href: "/work/pottery-town" },
    hero: {
      title:
        "Redesigning the career transition experience to feel guided, structured, and human",
      imageLabel: "PLACEHOLDER: Cover / hero image",
    },
    overview: placeholderOverview,
    problem: placeholderProblem,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
  "pottery-town": {
    slug: "pottery-town",
    name: "Pottery Town",
    description:
      "Making craft communities visible through cultural storytelling and spatial digital experiences",
    contributions: ["UX Design", "Visual Design", "Cultural Research"],
    timeline: "Jan 2025 – Ongoing",
    role: "UX / Visual Designer",
    nextProject: { name: "FirstSpark", href: "/work/firstspark" },
    hero: {
      title:
        "Making craft communities visible through cultural storytelling and spatial digital experiences",
      imageLabel: "PLACEHOLDER: Cover / hero image",
    },
    overview: placeholderOverview,
    problem: placeholderProblem,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
} as const satisfies Record<string, CaseStudyData>;

export type CaseStudySlug = keyof typeof caseStudies;
