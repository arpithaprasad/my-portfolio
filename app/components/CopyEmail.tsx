"use client";

import { useEffect, useState } from "react";

// Copies the address and says so for a moment; falls back to opening mail if the clipboard is blocked.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="focus-ring min-h-11 min-w-[7.5rem] rounded-full bg-[var(--apricot)] px-5 text-[13px] font-semibold text-[var(--oxblood)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
    </button>
  );
}
