import { anniversary } from "../../data/anniversary";
import Doodle from "./Doodle";

export default function Stats() {
  const { stats } = anniversary;

  return (
    <section id="stats" className="section" aria-labelledby="stats-heading">
      <div className="section-inner">
        <p className="eyebrow">{stats.eyebrow}</p>
        <h2 id="stats-heading" className="heading">
          {stats.heading}
        </h2>

        <div className="stats-scatter">
          {stats.items.map((stat) => (
            <article
              key={stat.id}
              className={`stat stat-${stat.size} ${stat.circled ? "stat-circled" : ""}`}
            >
              {stat.circled ? (
                <span className="marker-circle" aria-hidden="true">
                  <svg viewBox="0 0 160 120" fill="none">
                    <path
                      d="M18 62c3-28 36-46 72-44 34 2 54 24 50 48-4 26-36 40-72 38C32 102 14 88 18 62Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ) : null}
              {stat.annotation ? (
                <>
                  <p className="stat-note">{stat.annotation}</p>
                  <span
                    className="absolute -right-8 top-6"
                    aria-hidden="true"
                  >
                    <Doodle type="arrow" className="scale-75" />
                  </span>
                </>
              ) : null}
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>

        <p className="disclaimer">{stats.disclaimer}</p>
      </div>
    </section>
  );
}
