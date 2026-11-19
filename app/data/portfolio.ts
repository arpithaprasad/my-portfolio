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
// A screen or board exported from Figma into public/. `w`/`h` are the frame's
// size, so the page reserves the right space. Missing files show a labelled plate.
export type Figure = { src: string; alt: string; caption?: string; w: number; h: number };

export type CaseSection = {
  heading: string;
  body?: string | string[];
  points?: string[]; // short list under the body
  findings?: { title: string; body: string }[]; // numbered list of findings
  quote?: { text: string; cite: string };
  figures?: Figure[];
};

export type CaseStudy = {
  slug: string;
  sheet: string; // drawing-sheet number shown on the card
  name: string;
  title?: string; // page title, if different from the name
  description: string;
  tags: string[];
  color: string;
  hero?: Figure; // also used as the card image
  meta: { label: string; value: string }[];
  tldr?: { label: string; text: string }[];
  sections: CaseSection[];
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
    title: "Making career transitions feel guided",
    description: "A usability study and redesign of Path, helping people moving into software development feel oriented, confident and supported.",
    tags: ["Usability testing", "UX Design", "Career Tech"],
    color: "#4a6fa5",
    hero: {
      src: "/work/path/frame-16.webp",
      alt: "Redesigned Path screens: the checkpoint roadmap, coaching profile, onboarding and plans.",
      w: 2560,
      h: 1440,
    },
    meta: [
      { label: "Role", value: "UX research & design" },
      { label: "Timeline", value: "6 weeks" },
      { label: "Team", value: "4 UX designers" },
      { label: "Methods", value: "Moderated usability testing, affinity mapping" },
    ],
    tldr: [
      {
        label: "Problem",
        text: "People understood that Path was personalized, but couldn't see how it was guiding them. Next steps felt unclear, onboarding felt long, and coaching felt hard to trust.",
      },
      {
        label: "Approach",
        text: "We ran moderated usability tests with 8 people moving into software development, found five patterns across sessions, and redesigned the flows behind them.",
      },
      {
        label: "Outcome",
        text: "A usability report and redesign presented to Path. The client responded especially well to the trust-building, simpler onboarding and restructured roadmap.",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "Path is a startup that helps early-career people move into software development through personalized roadmaps, guided activities and coaching. Its promise is personal guidance, but in practice users struggled to tell where they were, what to do next, and why the app was recommending it.",
          "Over six weeks, our team of four tested the product with people in the middle of a career transition and redesigned the parts that broke their trust. I planned the research, moderated sessions, led synthesis with the team, redesigned onboarding, the roadmap and the information architecture, and kept communication going with the client.",
        ],
      },
      {
        heading: "Research",
        body: [
          "We recruited 8 participants through a screener survey: self-taught developers, students, career switchers and people moving over from non-technical fields. Each joined a 30 to 40 minute, in-person moderated session with a high-fidelity prototype.",
          "We asked them to complete onboarding, explore their roadmap, use the coaching features and find their way between activities. Afterwards we affinity-mapped every session and ranked issues by how often they came up, how much they hurt confidence, how much they blurred progress, and how far they undercut Path's promise of personalization.",
        ],
        figures: [
          {
            src: "/work/path/frame-3.webp",
            alt: "Three screener survey charts: participants' current career background, job search satisfaction and confidence in their career direction.",
            caption: "Screener results: who we tested with and how they felt about their search.",
            w: 2048,
            h: 464,
          },
          {
            src: "/work/path/frame-4.webp",
            alt: "Affinity map grouping observations into coaching, plans and pricing, onboarding, roadmap and activities, and navigation.",
            caption: "Affinity map across all 8 sessions.",
            w: 2560,
            h: 1440,
          },
        ],
      },
      {
        heading: "What we found",
        body: "Most problems weren't on a single screen. They came from effort piling up across the experience, and from the app not explaining what it was doing.",
        findings: [
          {
            title: "Onboarding fatigue",
            body: "Onboarding felt long and repetitive: near-identical screens for ranking roles and industries, no sense of how long it would take, and no view of how answers shaped the roadmap.",
          },
          {
            title: "Unclear roadmap",
            body: "People couldn't tell where they were in the journey, what was relevant right now, or how recommendations tied back to what they'd said in onboarding.",
          },
          {
            title: "Low trust in coaching",
            body: "Coaching scored highest as an idea, but participants hesitated to book because they couldn't see who the coach was, how sessions worked or why they'd been matched.",
          },
          {
            title: "Hidden navigation",
            body: "The hamburger menu hid the roadmap, coaching and profile, so participants kept losing the parts of the app that mattered most.",
          },
          {
            title: "Confusing plans",
            body: "Tiers looked alike, locked features had no explanation, and nobody could tell whether upgrading would actually help.",
          },
        ],
        quote: {
          text: "It felt like more than 20 questions.",
          cite: "Participant, on onboarding",
        },
        figures: [
          {
            src: "/work/path/frame-1.webp",
            alt: "The five usability themes: navigation and discoverability, roadmap clarity, coaching trust, subscription transparency and onboarding fatigue.",
            w: 2560,
            h: 1440,
          },
        ],
      },
      {
        heading: "Onboarding",
        body: "We kept every question Path needs, but cut the effort it takes to answer them, and showed people what their answers were turning into.",
        points: [
          "A time estimate up front and a progress tracker that stays visible to the end",
          "Role and industry choices on one scrollable multi-select screen each, with optional role descriptions behind an info icon",
          "An “Undecided” option for people still exploring",
          "Work style, company size and location grouped into one “Ideal Work Setup” screen, with location search only for people open to relocating",
          "Drag-to-rank priorities in place of an open-ended text question, and an optional resume upload to fill in the rest",
          "A “Current Direction” summary and a screen explaining what Path analyses before it builds the roadmap",
        ],
        figures: [
          {
            src: "/work/path/frame-7.webp",
            alt: "Original onboarding: each role and industry on its own screen, ranked one at a time.",
            caption: "Before: one role per screen, ranked one by one.",
            w: 2560,
            h: 1268,
          },
          {
            src: "/work/path/frame-8.webp",
            alt: "Redesigned onboarding: roles and industries on single multi-select screens with a progress tracker and time remaining.",
            caption: "After: one screen each for roles and industries, with time remaining.",
            w: 2560,
            h: 1193,
          },
          {
            src: "/work/path/frame-9.webp",
            alt: "Original work-preference questions spread across several screens, ending in an open-ended priorities question.",
            caption: "Before: work preferences spread across screens, then an open text question.",
            w: 2560,
            h: 1193,
          },
          {
            src: "/work/path/frame-10.webp",
            alt: "Redesigned Ideal Work Setup screen, drag-to-rank priorities and optional resume upload.",
            caption: "After: one Ideal Work Setup screen, drag-to-rank priorities and resume upload.",
            w: 2560,
            h: 1103,
          },
          {
            src: "/work/path/frame-5.webp",
            alt: "Original onboarding start and completion screens with no time estimate and a generic congratulations message.",
            caption: "Before: no time estimate, and a generic finish.",
            w: 2560,
            h: 1482,
          },
          {
            src: "/work/path/frame-6.webp",
            alt: "Redesigned start screen with a five-minute estimate, a Current Direction summary and a roadmap-building screen.",
            caption: "After: a time estimate, a summary of their direction, and what Path does with it.",
            w: 2560,
            h: 1268,
          },
        ],
      },
      {
        heading: "Roadmap",
        body: "The old dashboard tried to show everything at once. We reframed the roadmap as a journey of checkpoints, from Basecamp to Summit, and gave each screen one job.",
        points: [
          "Checkpoints marked completed, current or locked, so people always know where they stand",
          "A “Current Checkpoint” card that points to the next action",
          "An “Active Snapshot” of matched companies, open roles and skills to work on",
          "The overview separated from the detailed journey to cut information density",
        ],
        figures: [
          {
            src: "/work/path/frame-11.webp",
            alt: "Original long-scrolling dashboard next to the redesigned Basecamp and Journey screens with checkpoints and progress.",
            caption: "Before and after: the dashboard becomes Basecamp and a checkpoint Journey.",
            w: 2560,
            h: 1438,
          },
        ],
      },
      {
        heading: "Coaching",
        body: "People liked the idea of a coach but not booking a stranger. We put the trust signals they asked for in front of every decision to schedule, message or pay.",
        points: [
          "A coach profile with name, role, ratings and specialties",
          "Outcome stats and the reason for the match, before anyone commits",
          "Session descriptions, hosts and spots left on group sessions",
          "Prices and plan context shown inline, no longer hidden in a tooltip",
        ],
        figures: [
          {
            src: "/work/path/frame-12.webp",
            alt: "Original coaching screen annotated with missing coach identity, unexplained sessions and hidden pricing.",
            caption: "Before: an anonymous coach and sessions without context.",
            w: 2202,
            h: 876,
          },
          {
            src: "/work/path/frame-13.webp",
            alt: "Redesigned coaching screen with Sarah Reeves' profile, ratings, matching reason, session details and inline pricing.",
            caption: "After: a real coach, a reason for the match, and prices up front.",
            w: 2560,
            h: 876,
          },
        ],
      },
      {
        heading: "Navigation",
        body: "We replaced the hamburger menu with a bottom nav bar for the four places people return to most: Basecamp, Journey, Coaching and Profile, and reorganized the information architecture around it.",
        figures: [
          {
            src: "/work/path/frame-14.webp",
            alt: "Old hamburger menu beside the new bottom navigation bar and the suggested information architecture.",
            caption: "From hamburger menu to bottom nav, with the suggested information architecture.",
            w: 3850,
            h: 2160,
          },
        ],
      },
      {
        heading: "Plans and pricing",
        body: "We rebuilt the plan page so each tier explains itself and the differences do the comparing for you.",
        points: [
          "A clear “Your plan” label and a one-line summary of each tier",
          "Locked features shown with a lock and strikethrough",
          "Small comparison tags like “vs 2/day in Free”",
          "A “Most popular” tier, a free trial and quotes from our sessions",
        ],
        figures: [
          {
            src: "/work/path/frame-15.webp",
            alt: "Original plan options with no detail beside the redesigned Free, Plus and Pro plan cards.",
            caption: "Before and after: three tiers that explain themselves.",
            w: 2560,
            h: 843,
          },
        ],
      },
      {
        heading: "Outcome",
        body: [
          "We delivered a detailed usability report and presented the redesign to the Path team. They responded especially well to the trust-building in coaching, the simpler onboarding and the restructured roadmap.",
          "Participants also asked for community, networking and ways to keep each other accountable. Those are where I'd take Path next.",
        ],
      },
      {
        heading: "What I learned",
        points: [
          "Trust shapes usability. People weren't only asking whether a feature worked, but whether the app understood them and could realistically get them there.",
          "Most friction came from effort piling up and from the app not explaining itself, not from any single screen.",
          "Usability testing shows behavior patterns across a whole product, not just friction on one screen.",
        ],
      },
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
