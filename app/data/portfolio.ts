export const portfolio = {
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Play", href: "#play" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    label: "PRODUCT DESIGNER",
    name: "Arpitha Prasad",
    rotatingWords: ["designer", "coder", "hiker", "matcha drinker"],
    bio: "Designing digital products that help people navigate complexity — with an architect's eye and a coder's hands.",
  },
  // Homepage site model. `key` must match the building names in the Blender
  // export (public/model/light-<key>.webp + hotspots.json).
  siteModel: {
    kicker: "Studio AP · Site model · 4 volumes",
    headline: ["From building spaces", "to shaping", "experiences."],
    hint: "Hover a building to switch its lights on. Click to step inside.",
    hintTouch: "Tap a building to step inside.",
    buildings: [
      { key: "work", number: "01", label: "Work", caption: "Selected case studies", href: "#work" },
      { key: "about", number: "02", label: "About", caption: "The architect turned designer", href: "#about" },
      { key: "play", number: "03", label: "Play", caption: "XR, Unity and side experiments", href: "#play" },
      { key: "contact", number: "04", label: "Contact", caption: "Say hello", href: "#contact" },
    ],
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
  play: [
    {
      id: "living-pattern",
      name: "The Living Pattern",
      description: "Voice and hand-gesture web prototype for learning Tamil Nadu kolam.",
      tags: ["Gesture + voice", "Web prototype"],
    },
    {
      id: "creature-chase",
      name: "The Great Creature Chase",
      description: "AR scavenger hunt designed for an XR UX course.",
      tags: ["AR", "XR UX"],
    },
    {
      id: "one-room-many-lives",
      name: "One Room Many Lives",
      description: "VR spatial storytelling experience, from design document to Unity prototype.",
      tags: ["VR", "Unity"],
    },
    {
      id: "oden-stall",
      name: "Oden Stall",
      description: "A Spirited Away–inspired night-market scene built in Unity URP.",
      tags: ["Unity URP", "Environment"],
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
