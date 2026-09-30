"use client";

import { useState } from "react";
import { anniversary } from "../data/anniversary";

export default function MemoryCards() {
  const { memories } = anniversary;
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <section id="memories" className="section" aria-labelledby="memories-heading">
      <div className="section-inner">
        <p className="eyebrow">{memories.eyebrow}</p>
        <h2 id="memories-heading" className="heading">
          {memories.heading}
        </h2>

        <div className="memory-grid">
          {memories.cards.map((card) => {
            const isFlipped = Boolean(flipped[card.id]);
            return (
              <div key={card.id} className="memory-card">
                <button
                  type="button"
                  className={`memory-inner ${isFlipped ? "is-flipped" : ""}`}
                  style={{ ["--rot" as string]: `${card.rotation}deg` }}
                  aria-pressed={isFlipped}
                  aria-label={
                    isFlipped
                      ? `${card.title}. Click to flip back.`
                      : `Memory ${card.number}. Click to flip.`
                  }
                  onClick={() =>
                    setFlipped((current) => ({
                      ...current,
                      [card.id]: !current[card.id],
                    }))
                  }
                >
                  <div className="memory-face memory-front">{card.number}</div>
                  <div className="memory-face memory-back">
                    <figure
                      className="polaroid"
                      style={{
                        ["--rot" as string]: "0deg",
                        ["--tint" as string]: card.tint,
                        transform: "none",
                        width: "100%",
                      }}
                    >
                      <div className="polaroid-photo">PHOTO</div>
                      <figcaption className="polaroid-caption" style={{ opacity: 1 }}>
                        {card.title}
                        <br />
                        {card.description}
                      </figcaption>
                    </figure>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
