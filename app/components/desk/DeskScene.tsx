"use client";

import DeskFoodPlate from "./DeskFoodPlate";
import DeskLaptop from "./DeskLaptop";
import DeskMatcha from "./DeskMatcha";
import DeskMountainPlush from "./DeskMountainPlush";
import DeskPhone from "./DeskPhone";
import DeskPolaroidBoard from "./DeskPolaroidBoard";

export default function DeskScene() {
  return (
    <div className="relative ml-auto w-full max-w-xl lg:translate-x-4" aria-hidden="true">
      {/* Desk surface — slightly angled perspective */}
      <div
        className="relative aspect-[5/4] w-full origin-bottom"
        style={{
          transform: "perspective(900px) rotateX(10deg) rotateZ(-2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Walnut top */}
        <div
          className="absolute inset-0 overflow-visible rounded-[2px]"
          style={{
            background:
              "linear-gradient(145deg, #3a2218 0%, #2C1810 40%, #24140e 100%)",
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Wood grain */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.18]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="woodGrain"
                width="40"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 4 Q10 1 20 4 T40 4"
                  fill="none"
                  stroke="#1a0c08"
                  strokeWidth="0.8"
                />
                <path
                  d="M0 7 Q12 5 24 7 T40 7"
                  fill="none"
                  stroke="#4a2e20"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#woodGrain)" />
          </svg>

          {/* Soft highlight across desk */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)",
            }}
          />

          {/* Artifacts sit on the desk plane */}
          <div className="absolute inset-0 overflow-visible">
            <DeskPolaroidBoard />
            <DeskLaptop />
            <DeskPhone />
            <DeskMatcha />
            <DeskFoodPlate />
            <DeskMountainPlush />
          </div>
        </div>

        {/* Front edge — lighter tone for depth */}
        <div
          className="absolute inset-x-0 -bottom-[10px] h-[10px] rounded-b-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #4a2e22 0%, #3a2218 55%, #2a160f 100%)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
            transform: "translateZ(-2px)",
          }}
        />
      </div>
    </div>
  );
}
