"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CaseStudyBackNav() {
  const [subtle, setSubtle] = useState(false);

  useEffect(() => {
    const onScroll = () => setSubtle(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-6 z-50 mb-8 w-fit transition-opacity duration-300">
      <Link
        href="/#work"
        className={`focus-ring text-sm text-[var(--accent)] transition-opacity duration-300 ${
          subtle ? "opacity-50 hover:opacity-100" : "opacity-100"
        }`}
      >
        ← Back to work
      </Link>
    </div>
  );
}
