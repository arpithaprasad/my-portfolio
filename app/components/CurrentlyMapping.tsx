import { portfolio } from "../data/portfolio";
import RouteNode from "./RouteNode";
import SectionLabel from "./SectionLabel";

export default function CurrentlyMapping() {
  return (
    <section
      id="mapping"
      className="scroll-mt-8 border-y border-[var(--line)] px-6 py-16 md:px-12 md:py-20"
      aria-labelledby="mapping-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Route</SectionLabel>
            <h2
              id="mapping-heading"
              className="mt-3 text-2xl font-medium tracking-tight md:text-3xl"
            >
              Currently mapping
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--muted-soft)]">
            Three territories I keep returning to — connected, not isolated.
          </p>
        </div>

        <ol className="max-w-2xl">
          {portfolio.currentlyMapping.map((area, index) => (
            <RouteNode
              key={area.id}
              coordinate={area.coordinate}
              title={area.title}
              description={area.description}
              isLast={index === portfolio.currentlyMapping.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
