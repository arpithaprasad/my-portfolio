import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "FirstSpark",
    tag: "UX Design · Financial Services",
    description:
      "Designing confidence for first-generation immigrants navigating the U.S. financial system",
    year: "2024",
    tabColor: "#C4622D",
  },
  {
    title: "Path",
    tag: "UX Design · Career Tech",
    description:
      "Redesigning the career transition experience to feel guided, structured, and human",
    year: "2024",
    tabColor: "#4A6FA5",
  },
];

export default function Work() {
  return (
    <section id="work" className="px-6 pb-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-neutral-400">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 [&>article]:pb-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
