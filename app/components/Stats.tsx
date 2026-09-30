import { anniversary } from "../data/anniversary";
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
                <span className="marker-circle">
                  <Doodle type="circle" className="h-full w-full" />
                </span>
              ) : null}
              {"annotation" in stat && stat.annotation ? (
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
