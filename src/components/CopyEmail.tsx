"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center rounded-md border border-line px-3.5 py-2 text-small font-medium transition-colors duration-150 hover:border-accent hover:text-accent sm:px-4"
      >
        {copied ? "Copied!" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
