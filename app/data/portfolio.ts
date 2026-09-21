export type ProjectSlide = {
  id: string;
  caption: string;
  variant: string;
};

export type Project = {
  id: "firstspark" | "path" | "pottery-town";
  name: string;
  description: string;
  tooltip: string;
  tags: readonly string[];
  year: string;
  href: "/work/firstspark" | "/work/path" | "/work/pottery-town";
  aspect: "tall" | "mid" | "wide";
  slides: readonly ProjectSlide[];
};

export const portfolio = {
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    label: "PRODUCT DESIGNER",
    name: "Arpitha Prasad",
    rotatingWords: ["designer", "coder", "hiker", "matcha drinker"],
    bio: "Designing digital products that help people navigate complexity — with an architect's eye and a coder's hands.",
  },
  projects: [
    {
      id: "firstspark",
      name: "FirstSpark",
      description:
        "Designing confidence for first-gen immigrants navigating the U.S. financial system",
      tooltip: "Confidence for first-gen finance · 2025",
      tags: ["UX Design", "Financial Services"],
      year: "2025",
      href: "/work/firstspark",
      aspect: "tall",
      slides: [
        {
          id: "hook",
          caption:
            "A first paycheck, a dozen new systems — the product has to feel calm before it teaches anything.",
          variant: "balance",
        },
        {
          id: "flow",
          caption:
            "The U.S. financial maze becomes one checklist: identity, credit, housing, sending money home.",
          variant: "checklist",
        },
        {
          id: "detail",
          caption:
            "Transfers and jargon sit in plain language, so progress feels earned instead of lectured.",
          variant: "transfer",
        },
        {
          id: "result",
          caption:
            "The outcome is not a better bank screen. It is the feeling that you can do this.",
          variant: "calm",
        },
      ],
    },
    {
      id: "path",
      name: "Path",
      description:
        "Redesigning the career transition experience to feel guided and human",
      tooltip: "A guided career transition · 2025",
      tags: ["UX Design", "Career Tech"],
      year: "2025",
      href: "/work/path",
      aspect: "wide",
      slides: [
        {
          id: "hook",
          caption:
            "Career change should not feel like erasing yourself and starting over.",
          variant: "fork",
        },
        {
          id: "guide",
          caption:
            "A human check-in at the forks that matter, instead of another infinite job board.",
          variant: "guide",
        },
        {
          id: "timeline",
          caption:
            "Weeks, not vibes — a path you can see, name, and walk in small steps.",
          variant: "timeline",
        },
        {
          id: "result",
          caption:
            "The win is a next step you can say out loud.",
          variant: "offer",
        },
      ],
    },
    {
      id: "pottery-town",
      name: "Pottery Town",
      description:
        "Making craft communities visible through cultural storytelling",
      tooltip: "A town square for makers · 2025",
      tags: ["UX/Visual Design", "Culture"],
      year: "2025",
      href: "/work/pottery-town",
      aspect: "mid",
      slides: [
        {
          id: "hook",
          caption:
            "Craft communities are local. The internet usually flattens them into a feed.",
          variant: "map",
        },
        {
          id: "maker",
          caption:
            "Lead with the maker — who they are, where they fire, why the form exists.",
          variant: "maker",
        },
        {
          id: "story",
          caption:
            "Process is the story: clay, kiln, glaze, the hands that stay.",
          variant: "story",
        },
        {
          id: "result",
          caption:
            "Visibility without turning culture into a catalog dump.",
          variant: "square",
        },
      ],
    },
  ] as const satisfies readonly Project[],
  about: {
    heading: "A little about me",
    paragraphs: [
      "I'm a product designer with an MS in Human-Computer Interaction from Pratt Institute. My background in architecture shapes how I approach design — with attention to structure, space, and detail.",
      "I care about the moments most people skip — the micro-interaction, the just-right spacing, the detail that makes something feel considered. I've also taught myself to code, because understanding the medium makes me a better designer.",
    ],
    facts: [
      "MS HCI · Pratt Institute",
      "Based in NYC",
      "Currently open to work",
    ],
  },
  contact: {
    heading: "Let's talk.",
    subtitle: "Open to full-time roles, freelance projects, and coffee chats.",
    email: "arpitha19.prasad@gmail.com",
    linkedin: "https://www.linkedin.com/in/arpitha-prasad19",
  },
} as const;
