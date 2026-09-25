"use client";

import { useEffect, useState } from "react";

type Status = { state: "idle" | "copied" | "failed"; at: number };

export default function CopyButton({
  text,
  label,
  what,
  className = "",
}: {
  text: string;
  label: string;
  what: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle", at: 0 });

  useEffect(() => {
    if (status.state === "idle") return;
    const timer = setTimeout(() => setStatus({ state: "idle", at: Date.now() }), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ state: "copied", at: Date.now() });
    } catch {
      setStatus({ state: "failed", at: Date.now() });
    }
  }

  const labels = { idle: label, copied: "Copied!", failed: "Couldn't copy" };
  const announcements = {
    idle: "",
    copied: `${what} copied`,
    failed: `Couldn't copy. Select the ${what.toLowerCase()} to copy it.`,
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`transition-colors duration-150 hover:border-accent hover:text-accent ${className}`}
      >
        {labels[status.state]}
      </button>
      <span className="sr-only" aria-live="polite">
        {announcements[status.state]}
      </span>
    </>
  );
}
