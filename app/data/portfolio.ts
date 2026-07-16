export type ArtifactKind =
  | "journey-map"
  | "sticky-note"
  | "quote"
  | "wireframe"
  | "compass"
  | "nodes"
  | "plan"
  | "status";

export type Artifact = {
  id: string;
  kind: ArtifactKind;
  label: string;
  title: string;
  body?: string;
  annotation?: string;
  top: string;
  left: string;
  rotate: number;
  zIndex: number;
  mobile?: boolean;
};

export type FocusArea = {
  id: string;
  coordinate: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  focus: string;
  role: string;
  year: string;
  tags: string[];
  href: string;
  accentVar: "--accent-firstspark" | "--accent-path" | "--accent-pottery";
};

export type FieldNote = {
  id: string;
  title: string;
  description: string;
  year: string;
};

export const portfolio = {
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    intro: "Hi, I'm Arpitha —",
    headline: "I design digital products that help people navigate complexity.",
    support:
      "With a background in architecture, I bring spatial thinking, visual storytelling, and systems thinking into product design.",
    cta: { label: "Explore selected journeys", href: "#work" },
    markers: ["[01]", "FIELD NOTE", "CURRENT COORDINATES", "SYSTEM / STORY / INTERACTION"],
    annotation:
      "Architecture taught me to design spaces.\nUX taught me to design experiences.",
    meta: [
      "MS HCI @ Pratt Institute",
      "Currently open to opportunities",
      "Based in NYC",
    ],
  },
  artifacts: [
    {
      id: "a1",
      kind: "journey-map",
      label: "Journey map fragment",
      title: "Entry → Trust → Action",
      annotation: "Friction drops here",
      top: "4%",
      left: "8%",
      rotate: -6,
      zIndex: 2,
      mobile: true,
    },
    {
      id: "a2",
      kind: "sticky-note",
      label: "Design question sticky note",
      title: "How might we make this clearer?",
      top: "10%",
      left: "52%",
      rotate: 5,
      zIndex: 4,
      mobile: true,
    },
    {
      id: "a3",
      kind: "quote",
      label: "Research quote card",
      title: "Users trust people before platforms.",
      annotation: "Interview #07",
      top: "38%",
      left: "42%",
      rotate: -3,
      zIndex: 3,
      mobile: true,
    },
    {
      id: "a4",
      kind: "wireframe",
      label: "Mobile wireframe",
      title: "Screen flow",
      top: "52%",
      left: "6%",
      rotate: -4,
      zIndex: 2,
      mobile: false,
    },
    {
      id: "a5",
      kind: "compass",
      label: "Compass icon",
      title: "Orient",
      top: "22%",
      left: "78%",
      rotate: 8,
      zIndex: 5,
      mobile: false,
    },
    {
      id: "a6",
      kind: "nodes",
      label: "Connected node diagram",
      title: "System links",
      top: "68%",
      left: "58%",
      rotate: 4,
      zIndex: 3,
      mobile: true,
    },
    {
      id: "a7",
      kind: "plan",
      label: "Architectural plan fragment",
      title: "Plan / section",
      top: "72%",
      left: "18%",
      rotate: -8,
      zIndex: 1,
      mobile: false,
    },
    {
      id: "a8",
      kind: "status",
      label: "Status card",
      title: "Currently mapping",
      body: "Financial trust · Career transitions",
      top: "44%",
      left: "72%",
      rotate: 3,
      zIndex: 4,
      mobile: false,
    },
  ] satisfies Artifact[],
  currentlyMapping: [
    {
      id: "f1",
      coordinate: "01",
      title: "Financial trust",
      description: "making unfamiliar systems feel understandable",
    },
    {
      id: "f2",
      coordinate: "02",
      title: "Career transitions",
      description: "reducing friction in high-stakes decisions",
    },
    {
      id: "f3",
      coordinate: "03",
      title: "Cultural storytelling",
      description: "creating visibility for communities and craft",
    },
  ] satisfies FocusArea[],
  projects: [
    {
      id: "firstspark",
      name: "FirstSpark",
      description:
        "Designing confidence for first-generation immigrants navigating the U.S. financial system.",
      focus: "Financial trust",
      role: "UX Design",
      year: "2024",
      tags: ["Financial Services", "Onboarding"],
      href: "#work",
      accentVar: "--accent-firstspark",
    },
    {
      id: "path",
      name: "Path",
      description:
        "Redesigning the career transition experience to feel guided, structured, and human.",
      focus: "Career transitions",
      role: "UX Design",
      year: "2024",
      tags: ["Career Tech", "Decision support"],
      href: "#work",
      accentVar: "--accent-path",
    },
    {
      id: "pottery-town",
      name: "Pottery Town",
      description:
        "Making craft communities visible through cultural storytelling and spatial digital experiences.",
      focus: "Cultural storytelling",
      role: "UX / Visual Design",
      year: "2025",
      tags: ["Culture", "Place"],
      href: "#work",
      accentVar: "--accent-pottery",
    },
  ] satisfies Project[],
  fieldNotes: [
    {
      id: "n1",
      title: "Gesture-controlled vocal performance",
      description: "Mapping body movement to voice and visual feedback.",
      year: "2024",
    },
    {
      id: "n2",
      title: "Speculative anti-surveillance wearables",
      description: "Prototypes that question visibility, privacy, and control.",
      year: "2023",
    },
    {
      id: "n3",
      title: "Interaction & visual experiments",
      description: "Small studies in motion, hierarchy, and spatial UI.",
      year: "Ongoing",
    },
  ] satisfies FieldNote[],
  about: {
    title: "About",
    body: "I see complex systems, map the relationships between them, and turn them into approachable digital experiences — informed by architecture, HCI, and a love of clear visual storytelling.",
  },
  footer: {
    sentence: "Have something in mind? I'd love to hear from you.",
    email: "hello@arpithaprasad.com",
    linkedin: "https://www.linkedin.com/in/arpithaprasad",
    resume: "#",
    signature: "Designed as a map. Built as a system.",
  },
} as const;
