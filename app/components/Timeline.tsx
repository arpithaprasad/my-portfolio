import { anniversary } from "../data/anniversary";
import Polaroid from "./Polaroid";

export default function Timeline() {
  const { timeline } = anniversary;

  return (
    <section id="timeline" className="section" aria-labelledby="timeline-heading">
      <div className="section-inner">
        <p className="eyebrow">{timeline.eyebrow}</p>
        <h2 id="timeline-heading" className="heading">
          {timeline.heading}
        </h2>

        <div className="timeline-track-wrap">
          <svg
            className="timeline-line"
            viewBox="0 0 1100 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M8 44 C 90 8, 170 72, 250 40 S 420 6, 500 46 S 680 86, 780 34 S 980 4, 1092 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
          </svg>

          <ol className="timeline-track">
            {timeline.entries.map((entry) => (
              <li key={entry.id} className="timeline-item">
                <p className="timeline-month">{entry.month}</p>
                <Polaroid
                  caption={`${entry.memory}\n${entry.caption}`}
                  rotation={entry.rotation}
                  tint={entry.tint}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
