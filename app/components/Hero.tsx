import { anniversary } from "../data/anniversary";
import Doodle from "./Doodle";
import Polaroid from "./Polaroid";

export default function Hero() {
  const { hero } = anniversary;

  return (
    <section className="hero" aria-label="Introduction">
      <span
        className="float-heart"
        style={{ left: "12%", top: "22%" }}
        aria-hidden="true"
      >
        <Doodle type="heart" />
      </span>
      <span
        className="float-heart"
        style={{ right: "16%", bottom: "18%", animationDelay: "1.8s" }}
        aria-hidden="true"
      >
        <Doodle type="star" />
      </span>

      <div className="hero-cluster">
        <p className="hero-annotation">{hero.annotation}</p>
        <span className="hero-heart">
          <Doodle type="heart" />
        </span>

        <h1 className="hero-title">{hero.greeting}</h1>
        <p className="hero-sub">{hero.subtitle}</p>

        <div className="hero-cta">
          <a href="#stats" className="scrap-btn">
            {hero.cta}
          </a>
        </div>

        <p className="hero-scribble">{hero.scribble}</p>
      </div>

      <div className="hero-polaroid">
        <Polaroid
          caption={hero.polaroidCaption}
          rotation={9}
          size="sm"
          tint="#d7e0d2"
        />
      </div>
    </section>
  );
}
