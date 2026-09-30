"use client";

import { useState } from "react";
import { anniversary } from "../data/anniversary";
import Doodle from "./Doodle";
import Polaroid from "./Polaroid";

const tints = ["#e6d0d0", "#d7e0d2", "#d3dce8", "#efe4c4"];

export default function OurPlaces() {
  const { places } = anniversary;
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="places" className="section" aria-labelledby="places-heading">
      <div className="section-inner">
        <p className="eyebrow">{places.eyebrow}</p>
        <h2 id="places-heading" className="heading">
          {places.heading}
        </h2>

        <div className="place-map">
          <svg
            className="place-svg"
            viewBox="0 0 1000 420"
            aria-hidden="true"
          >
            <path
              d="M80 300 C 180 310, 220 140, 360 130 S 520 300, 620 270 S 780 90, 900 110"
              fill="none"
              stroke="#8a2a38"
              strokeWidth="2.4"
              strokeDasharray="7 9"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M210 250 l18 -28"
              stroke="#8a2a38"
              strokeWidth="1.6"
              opacity="0.55"
            />
            <text x="200" y="210" fill="#8a2a38" fontSize="22" fontFamily="Caveat, cursive">
              ✈
            </text>
            <text x="500" y="200" fill="#8a2a38" fontSize="20" fontFamily="Caveat, cursive">
              →
            </text>
            <text x="760" y="220" fill="#8a2a38" fontSize="20" fontFamily="Caveat, cursive">
              🚲
            </text>
          </svg>

          {places.locations.map((place, index) => (
            <div
              key={place.id}
              style={{ left: `${place.x}%`, top: `${place.y}%`, position: "absolute" }}
            >
              <button
                type="button"
                className="place-pin"
                aria-expanded={openId === place.id}
                aria-label={`Open memory for ${place.name}`}
                onClick={() =>
                  setOpenId((current) => (current === place.id ? null : place.id))
                }
              >
                <Doodle type="heart" />
                <span className="font-hand mt-0.5 block text-sm text-[var(--ink)]">
                  {place.name}
                </span>
              </button>

              {openId === place.id ? (
                <div
                  className="place-popup"
                  style={
                    place.y < 40
                      ? { transform: "translate(-30%, 18%)" }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    className="place-popup-close"
                    aria-label="Close memory"
                    onClick={() => setOpenId(null)}
                  >
                    x
                  </button>
                  <Polaroid
                    caption={place.memory}
                    rotation={index % 2 === 0 ? -2 : 3}
                    size="sm"
                    tint={tints[index % tints.length]}
                    liftOnHover={false}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
