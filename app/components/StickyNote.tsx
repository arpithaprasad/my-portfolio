"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type StickyNoteProps = {
  text: string;
  color: "cream" | "yellow" | "pink" | "blue";
  rotation: number;
  xPct: number;
  yPct: number;
  draggable: boolean;
  zIndex: number;
  onDragStart: () => void;
};

export default function StickyNote({
  text,
  color,
  rotation,
  xPct,
  yPct,
  draggable,
  zIndex,
  onDragStart,
}: StickyNoteProps) {
  const noteRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    offsetX: number;
    offsetY: number;
  } | null>(null);

  function pointerDown(event: PointerEvent<HTMLElement>) {
    if (!draggable) return;
    const note = noteRef.current;
    const board = note?.offsetParent as HTMLElement | null;
    if (!note || !board) return;

    onDragStart();
    const boardRect = board.getBoundingClientRect();
    const noteRect = note.getBoundingClientRect();
    const currentX = pos?.x ?? noteRect.left - boardRect.left;
    const currentY = pos?.y ?? noteRect.top - boardRect.top;
    setPos({ x: currentX, y: currentY });
    drag.current = {
      offsetX: event.clientX - boardRect.left - currentX,
      offsetY: event.clientY - boardRect.top - currentY,
    };
    note.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function pointerMove(event: PointerEvent<HTMLElement>) {
    if (!drag.current || !draggable) return;
    const note = noteRef.current;
    const board = note?.offsetParent as HTMLElement | null;
    if (!note || !board) return;

    const boardRect = board.getBoundingClientRect();
    const maxX = board.clientWidth - note.offsetWidth;
    const maxY = board.clientHeight - note.offsetHeight;
    const x = Math.max(
      0,
      Math.min(event.clientX - boardRect.left - drag.current.offsetX, maxX),
    );
    const y = Math.max(
      0,
      Math.min(event.clientY - boardRect.top - drag.current.offsetY, maxY),
    );
    setPos({ x, y });
  }

  function pointerUp(event: PointerEvent<HTMLElement>) {
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const style: CSSProperties = {
    transform: `rotate(${rotation}deg)`,
    zIndex,
    ...(draggable && pos
      ? { left: pos.x, top: pos.y }
      : draggable
        ? { left: `${xPct}%`, top: `${yPct}%` }
        : {}),
  };

  return (
    <article
      ref={noteRef}
      className={`sticky-note sticky-${color} ${draggable ? "sticky-desktop" : ""} ${dragging ? "is-dragging" : ""}`}
      style={style}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
    >
      <span
        className="tape"
        style={{
          top: "-0.45rem",
          left: "50%",
          width: "2.6rem",
          marginLeft: "-1.3rem",
          transform: `rotate(${rotation > 0 ? -8 : 6}deg)`,
        }}
        aria-hidden="true"
      />
      {text}
    </article>
  );
}
