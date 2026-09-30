"use client";

import { useEffect, useRef, useState } from "react";
import { anniversary } from "../../data/anniversary";
import Doodle from "./Doodle";
import StickyNote from "./StickyNote";

export default function ThingsILearned() {
  const { learned } = anniversary;
  const boardRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);
  const [topNote, setTopNote] = useState<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setCanDrag(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <section id="learned" className="section" aria-labelledby="learned-heading">
      <div className="section-inner">
        <h2 id="learned-heading" className="heading">
          {learned.heading}
        </h2>
        <p className="subtext">{learned.subtext}</p>

        <div className="pinboard" ref={boardRef}>
          <span
            className="tape"
            style={{ top: "1.2rem", left: "8%", width: "4.2rem", transform: "rotate(-12deg)" }}
            aria-hidden="true"
          />
          <span
            className="tape"
            style={{ top: "2rem", right: "10%", width: "3.6rem", transform: "rotate(8deg)" }}
            aria-hidden="true"
          />
          <span
            className="absolute left-[30%] top-[40%] text-[var(--burgundy)] opacity-70"
            aria-hidden="true"
          >
            <Doodle type="arrow" />
          </span>
          <span
            className="absolute right-[22%] top-[12%] text-[var(--burgundy)] opacity-70"
            aria-hidden="true"
          >
            <Doodle type="star" />
          </span>
          <span
            className="absolute bottom-[12%] left-[40%] text-[var(--burgundy)] opacity-50"
            aria-hidden="true"
          >
            <Doodle type="heart" />
          </span>

          {learned.notes.map((note, index) => (
            <StickyNote
              key={note.id}
              text={note.text}
              color={note.color}
              rotation={note.rotation}
              xPct={note.xPct}
              yPct={note.yPct}
              draggable={canDrag}
              boardRef={boardRef}
              zIndex={topNote === note.id ? 8 : index + 1}
              onDragStart={() => setTopNote(note.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
