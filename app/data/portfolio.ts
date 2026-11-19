// All site content lives here. Edit text, links and case studies in this file.

// ⬇ Paste your Google Drive resume link here (sharing: "Anyone with the link can view").
//   While it's empty, the Resume pavilion and nav link show "coming soon".
export const RESUME_URL = "";

export type RoomKey = "work" | "about" | "play" | "contact" | "resume";

// One "room" per building on the site model. `key` must match the Blender export
// (public/model/light-<key>.webp + hotspots.json).
// `color` is the building's palette colour (key plan, large marks). `ink` is a
// darker, text-safe version (4.5:1+ on the page and its header). `tint` is the
// soft wash at the top of that room's page.
export const rooms = {
  work: {
    number: "01",
    label: "Work",
    caption: "Selected case studies",
    href: "/work",
    color: "#6a1229",
    ink: "#6a1229",
    tint: "#f2dadd",
    title: "Selected work",
    intro: "Case studies in designing for people navigating complex, high-stakes moments.",
  },
  about: {
    number: "02",
    label: "About",
    caption: "The architect turned designer",
    href: "/about",
    color: "#c04e5c",
    ink: "#a23a4a",
    tint: "#f7dfe1",
    title: "A little about me",
    intro: "Trained as an architect, now designing digital products — still obsessed with structure, space and detail.",
  },
  play: {
    number: "03",
    label: "Play",
    caption: "XR, Unity and side experiments",
    href: "/play",
    color: "#f0885e",
    ink: "#a84a26",
    tint: "#fce3d7",
    title: "Play",
    intro: "Experiments in XR, gesture, voice and real-time 3D — where I try things before I know they'll work.",
  },
  contact: {
    number: "04",
    label: "Contact",
    caption: "Say hello",
    href: "/contact",
    color: "#f0a262",
    ink: "#93531a",
    tint: "#fdecd8",
    title: "Let's talk.",
    intro: "Open to full-time roles, freelance projects, and coffee chats.",
  },
  resume: {
    number: "05",
    label: "Resume",
    caption: RESUME_URL ? "Opens in a new tab ↗" : "Coming soon",
    href: RESUME_URL,
    color: "#4a0a10",
    ink: "#4a0a10",
    tint: "#eedbdb",
    title: "Resume",
    intro: "",
  },
} satisfies Record<RoomKey, Room>;

type Room = {
  number: string;
  label: string;
  caption: string;
  href: string;
  color: string;
  ink: string;
  tint: string;
  title: string;
  intro: string;
};

// Order buildings are listed in (and tabbed through) on the homepage.
export const roomOrder: RoomKey[] = ["work", "about", "play", "contact", "resume"];
export const pageRooms: Exclude<RoomKey, "resume">[] = ["work", "about", "play", "contact"];

export const portfolio = {
  name: "Arpitha Prasad",
  hero: {
    kicker: "Studio AP · Site model · 5 volumes",
    headline: ["From building spaces", "to shaping", "experiences."],
    bio: "Designing digital products that help people navigate complexity — with an architect's eye and a coder's hands.",
    hint: "Hover a building to switch its lights on. Click to step inside.",
    hintTouch: "Tap a building to step inside.",
  },
  about: {
    paragraphs: [
      "I'm a product designer with an MS in Human-Computer Interaction from Pratt Institute. My background in architecture shapes how I approach design — with attention to structure, space, and detail.",
      "I care about the moments most people skip — the micro-interaction, the just-right spacing, the detail that makes something feel considered. I've also taught myself to code, because understanding the medium makes me a better designer.",
    ],
    facts: [
      { label: "Education", value: "MS HCI · Pratt Institute" },
      { label: "Background", value: "Architecture" },
      { label: "Based in", value: "New York City" },
      { label: "Status", value: "Open to full-time roles" },
    ],
  },
  contact: {
    email: "arpitha19.prasad@gmail.com",
    linkedin: "https://www.linkedin.com/in/arpitha-prasad19",
  },
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
};

// Case studies. Each one gets a page at /work/<slug>.
// Text in [square brackets] is a placeholder — replace it with your own.
export type CaseStudy = {
  slug: string;
  sheet: string; // drawing-sheet number shown on the card
  name: string;
  description: string;
  tags: string[];
  color: string;
  meta: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "firstspark",
    sheet: "A-101",
    name: "FirstSpark",
    description: "Designing confidence for first-gen immigrants navigating the U.S. financial system.",
    tags: ["UX Design", "Financial Services"],
    color: "#c4622d",
    meta: [
      { label: "Role", value: "[Your role]" },
      { label: "Timeline", value: "[Duration]" },
      { label: "Team", value: "[Team / solo]" },
      { label: "Tools", value: "[Figma, …]" },
    ],
    sections: [
      { heading: "Overview", body: "[One paragraph: what FirstSpark is, who it's for, and the outcome.]" },
      { heading: "The problem", body: "[What makes the U.S. financial system hard for first-generation immigrants?]" },
      { heading: "Research", body: "[Who you talked to, what you learned, the insight that changed direction.]" },
      { heading: "Design process", body: "[Key iterations and the decisions behind them.]" },
      { heading: "Outcome", body: "[Final design, results, and what you'd do next.]" },
    ],
  },
  {
    slug: "path",
    sheet: "A-102",
    name: "Path",
    description: "Redesigning the career transition experience to feel guided and human.",
    tags: ["UX Design", "Career Tech"],
    color: "#4a6fa5",
    meta: [
      { label: "Role", value: "[Your role]" },
      { label: "Timeline", value: "[Duration]" },
      { label: "Team", value: "[Team / solo]" },
      { label: "Tools", value: "[Figma, …]" },
    ],
    sections: [
      { heading: "Overview", body: "[One paragraph: what Path is, who it's for, and the outcome.]" },
      { heading: "The problem", body: "[Why career switching into tech feels unguided today.]" },
      { heading: "Research", body: "[Who you talked to, what you learned, the insight that changed direction.]" },
      { heading: "Design process", body: "[Key iterations and the decisions behind them.]" },
      { heading: "Outcome", body: "[Final design, results, and what you'd do next.]" },
    ],
  },
  {
    slug: "pottery-town",
    sheet: "A-103",
    name: "Pottery Town",
    description: "Making craft communities visible through cultural storytelling.",
    tags: ["UX/Visual Design", "Culture"],
    color: "#7d8f5c",
    meta: [
      { label: "Role", value: "[Your role]" },
      { label: "Timeline", value: "[Duration]" },
      { label: "Team", value: "[Team / solo]" },
      { label: "Tools", value: "[Figma, …]" },
    ],
    sections: [
      { heading: "Overview", body: "[One paragraph: what the project is, who it's for, and the outcome.]" },
      { heading: "The problem", body: "[Why this craft community is under-seen.]" },
      { heading: "Research", body: "[Who you talked to, what you learned.]" },
      { heading: "Design process", body: "[Key iterations and the decisions behind them.]" },
      { heading: "Outcome", body: "[Final design, results, and what you'd do next.]" },
    ],
  },
];
