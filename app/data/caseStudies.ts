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

export type CaseStudyData = {
  slug: string;
  label: string;
  name: string;
  description: string;
  role: string;
  year: string;
  duration: string;
  nextProject: {
    name: string;
    href: string;
  };
  overview: {
    problem: string;
    roleBullets: readonly string[];
    goal: string;
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
    "PLACEHOLDER: Describe the core user problem this project addressed — who was struggling, in what context, and why existing solutions fell short.",
  roleBullets: [
    "PLACEHOLDER: Lead user research and synthesis",
    "PLACEHOLDER: Define information architecture and key flows",
    "PLACEHOLDER: Design and prototype the end-to-end experience",
  ],
  goal: "PLACEHOLDER: One bold sentence stating the north-star goal for this project.",
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
    label: "UX DESIGN · FINANCIAL SERVICES",
    name: "FirstSpark",
    description:
      "Designing confidence for first-generation immigrants navigating the U.S. financial system",
    role: "UX Designer",
    year: "2024",
    duration: "12 weeks",
    nextProject: { name: "Path", href: "/work/path" },
    overview: placeholderOverview,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
  path: {
    slug: "path",
    label: "UX DESIGN · CAREER TECH",
    name: "Path",
    description:
      "Redesigning the career transition experience to feel guided, structured, and human",
    role: "UX Designer",
    year: "2024",
    duration: "10 weeks",
    nextProject: { name: "Pottery Town", href: "/work/pottery-town" },
    overview: placeholderOverview,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
  "pottery-town": {
    slug: "pottery-town",
    label: "UX / VISUAL DESIGN · CULTURE",
    name: "Pottery Town",
    description:
      "Making craft communities visible through cultural storytelling and spatial digital experiences",
    role: "UX/Visual Designer",
    year: "2025",
    duration: "Ongoing",
    nextProject: { name: "FirstSpark", href: "/work/firstspark" },
    overview: placeholderOverview,
    process: placeholderProcess,
    solution: placeholderSolution,
    outcome: placeholderOutcome,
  },
} as const satisfies Record<string, CaseStudyData>;

export type CaseStudySlug = keyof typeof caseStudies;
