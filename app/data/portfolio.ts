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
      tags: ["UX Design", "Financial Services"],
      href: "#work",
    },
    {
      id: "path",
      name: "Path",
      description:
        "Redesigning the career transition experience to feel guided and human",
      tags: ["UX Design", "Career Tech"],
      href: "#work",
    },
    {
      id: "pottery-town",
      name: "Pottery Town",
      description:
        "Making craft communities visible through cultural storytelling",
      tags: ["UX/Visual Design", "Culture"],
      href: "#work",
    },
  ],
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
