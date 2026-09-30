"use client";

import { useEffect, useRef, useState } from "react";
import { anniversary } from "../data/anniversary";

const HEARTS = ["♡", "♥", "♡", "♥", "♡"];

export default function FinalQuestion() {
  const { finale } = anniversary;
  const sectionRef = useRef<HTMLElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState<
    { id: number; dx: string; dy: string; left: string; top: string; char: string }[]
  >([]);
  const [noPos, setNoPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let line = 0;
          const tick = () => {
            line += 1;
            setVisibleLines(line);
            if (line < finale.lines.length) {
              window.setTimeout(tick, 850);
            }
          };
          window.setTimeout(tick, 200);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [finale.lines.length]);

  function moveNo() {
    const section = sectionRef.current;
    const button = noRef.current;
    if (!section || !button) return;

    const width = button.offsetWidth;
    const height = button.offsetHeight;
    const pad = 18;
    const maxX = Math.max(pad, section.clientWidth - width - pad);
    const maxY = Math.max(pad, section.clientHeight - height - pad);
    let left = pad + Math.random() * (maxX - pad);
    let top = pad + Math.random() * (maxY - pad);

    if (noPos) {
      let tries = 0;
      while (tries < 8 && Math.hypot(left - noPos.left, top - noPos.top) < 90) {
        left = pad + Math.random() * (maxX - pad);
        top = pad + Math.random() * (maxY - pad);
        tries += 1;
      }
    }

    setNoPos({ left, top });
  }

  function sayYes() {
    const pieces = Array.from({ length: 22 }, (_, index) => ({
      id: index,
      char: HEARTS[index % HEARTS.length],
      left: `${44 + Math.random() * 12}%`,
      top: `${48 + Math.random() * 10}%`,
      dx: `${(Math.random() - 0.5) * 240}px`,
      dy: `${-80 - Math.random() * 180}px`,
    }));
    setConfetti(pieces);
    setAnswered(true);
  }

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="finale"
      aria-labelledby="finale-heading"
    >
      <div className="finale-copy">
        <h2 id="finale-heading" className="sr-only">
          A question
        </h2>
        {finale.lines.map((line, index) => (
          <p
            key={line}
            className={`finale-line ${visibleLines > index ? "is-in" : ""}`}
          >
            {line}
          </p>
        ))}

        {answered ? (
          <div className="mt-10">
            <p className="finale-yes">{finale.afterYes}</p>
            <p className="finale-sub">{finale.afterYesSub}</p>
          </div>
        ) : (
          <div className="finale-actions">
            <button type="button" className="scrap-btn" onClick={sayYes}>
              {finale.yes}
            </button>
            <button
              ref={noRef}
              type="button"
              className="scrap-btn scrap-btn-ghost"
              style={
                noPos
                  ? {
                      position: "absolute",
                      left: noPos.left,
                      top: noPos.top,
                    }
                  : undefined
              }
              onMouseEnter={() => {
                if (window.matchMedia("(pointer: fine)").matches) {
                  moveNo();
                }
              }}
              onClick={(event) => {
                event.preventDefault();
                moveNo();
              }}
              onTouchStart={(event) => {
                event.preventDefault();
                moveNo();
              }}
            >
              {finale.no}
            </button>
          </div>
        )}
      </div>

      {confetti.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            top: piece.top,
            color: indexColor(piece.id),
            ["--dx" as string]: piece.dx,
            ["--dy" as string]: piece.dy,
            animationDelay: `${piece.id * 18}ms`,
          }}
          aria-hidden="true"
        >
          {piece.char}
        </span>
      ))}
    </section>
  );
}

function indexColor(index: number) {
  const colors = ["#8a2a38", "#d9a8a5", "#b4232c", "#6b1e2b", "#efd0cc"];
  return colors[index % colors.length];
}
