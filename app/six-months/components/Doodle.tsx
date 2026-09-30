import type { ReactNode } from "react";

type DoodleType =
  | "heart"
  | "star"
  | "arrow"
  | "circle"
  | "underline"
  | "scribble";

type DoodleProps = {
  type: DoodleType;
  className?: string;
  title?: string;
};

export default function Doodle({ type, className = "", title }: DoodleProps) {
  return (
    <span
      className={`doodle doodle-${type} ${className}`}
      aria-hidden={title ? undefined : true}
      title={title}
    >
      {paths[type]}
    </span>
  );
}

const paths: Record<DoodleType, ReactNode> = {
  heart: (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
      <path
        d="M14 23s-8.2-5.1-11-9.6C1.2 10.2 2.6 5.4 7.1 5.2c2.4-.1 4.1 1.4 4.9 2.8.7-1.5 2.3-3 4.8-2.9 4.5.2 6.1 5 4.3 8.3C18.4 17.8 14 23 14 23Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  star: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        d="M13 3.2 14.8 10l6.8.2-5.4 4.2 1.9 6.6L13 17.4 7.9 21l1.9-6.6L4.4 10.2 11.2 10 13 3.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  arrow: (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none">
      <path
        className="stroke"
        d="M4 18c12-12 24-12 36-6s18 8 28-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M61 6.5 68 8.2 64 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  circle: (
    <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
      <path
        d="M18 48c2-22 28-34 52-32s42 18 38 38-28 30-54 28S14 68 18 48Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  underline: (
    <svg width="120" height="16" viewBox="0 0 120 16" fill="none">
      <path
        className="stroke"
        d="M3 9c18 6 28-6 46-3 16 3 24 7 44-2 8-3 18-4 24 1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  scribble: (
    <svg width="54" height="22" viewBox="0 0 54 22" fill="none">
      <path
        d="M3 14c6-9 10 6 16-1 6-8 8 9 15 1 6-7 10 6 17-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};
