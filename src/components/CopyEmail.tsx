"use client";

import { useEffect, useState } from "react";

type Status = { state: "idle" | "copied" | "failed"; at: number };

const labels = { idle: "Copy email", copied: "Copied!", failed: "Couldn't copy" };
const announcements = {
  idle: "",
  copied: "Email address copied",
  failed: "Couldn't copy. Select the address to copy it.",
};

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle", at: 0 });

  useEffect(() => {
    if (status.state === "idle") return;
    const timer = setTimeout(() => setStatus({ state: "idle", at: Date.now() }), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus({ state: "copied", at: Date.now() });
    } catch {
      setStatus({ state: "failed", at: Date.now() });
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center rounded-md border border-line px-3.5 py-2 text-small font-medium transition-colors duration-150 hover:border-accent hover:text-accent sm:px-4"
      >
        {labels[status.state]}
      </button>
      <span className="sr-only" aria-live="polite">
        {announcements[status.state]}
      </span>
    </>
  );
}
