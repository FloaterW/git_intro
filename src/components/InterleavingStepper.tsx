"use client";

import { useState } from "react";

type Actor = "T1" | "T2";

interface Step {
  actor: Actor;
  action: string;
  balance: number;
  explain: string;
  waiting?: boolean;
}

const START = 100;

const scenarios: Record<"unlocked" | "locked", { steps: Step[]; verdict: string; ok: boolean }> = {
  unlocked: {
    steps: [
      {
        actor: "T1",
        action: "reads A: $100",
        balance: 100,
        explain: "Transfer 1 wants to move $50 out of account A. It reads the balance: $100.",
      },
      {
        actor: "T2",
        action: "reads A: $100",
        balance: 100,
        explain:
          "Transfer 2 starts before Transfer 1 has saved anything, so it also sees $100. This is the bug.",
      },
      {
        actor: "T1",
        action: "writes A = $100 − $50 = $50",
        balance: 50,
        explain: "Transfer 1 saves its result. So far so good.",
      },
      {
        actor: "T2",
        action: "writes A = $100 − $30 = $70",
        balance: 70,
        explain:
          "Transfer 2 saves a result based on the stale $100 and overwrites Transfer 1's withdrawal.",
      },
    ],
    verdict:
      "Account A ends at $70 but should be $20. $80 left the account and only $30 was taken out of it, so $50 appeared from nowhere.",
    ok: false,
  },
  locked: {
    steps: [
      {
        actor: "T1",
        action: "locks A, reads $100",
        balance: 100,
        explain: "Transfer 1 locks account A's row before reading it.",
      },
      {
        actor: "T2",
        action: "tries to lock A, waits",
        balance: 100,
        waiting: true,
        explain:
          "Transfer 2 asks for the same lock and has to wait. It can't read a stale balance.",
      },
      {
        actor: "T1",
        action: "writes A = $50, commits",
        balance: 50,
        explain: "Transfer 1 saves and commits, which releases the lock.",
      },
      {
        actor: "T2",
        action: "locks A, reads $50",
        balance: 50,
        explain: "Now Transfer 2 gets the lock and reads the up-to-date balance.",
      },
      {
        actor: "T2",
        action: "writes A = $50 − $30 = $20",
        balance: 20,
        explain: "Transfer 2 saves and commits.",
      },
    ],
    verdict: "Account A ends at $20, exactly what it should be.",
    ok: true,
  },
};

export default function InterleavingStepper() {
  const [mode, setMode] = useState<"unlocked" | "locked">("unlocked");
  const [shown, setShown] = useState(0);
  const { steps, verdict, ok } = scenarios[mode];
  const finished = shown === steps.length;
  const balance = shown === 0 ? START : steps[shown - 1].balance;
  const explanation =
    shown === 0
      ? "Account A has $100. Two transfers take money out of it at the same moment: $50 and $30."
      : steps[shown - 1].explain;

  function choose(next: "unlocked" | "locked") {
    if (next === mode) return;
    setMode(next);
    setShown(0);
  }

  return (
    <div
      role="region"
      aria-label="Step-through demo: two transfers from one account"
      className="rounded-xl border border-line bg-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Scenario">
          {(
            [
              ["unlocked", "Without a lock"],
              ["locked", "With a row lock"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => choose(value)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 ${
                mode === value
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">
          Account A{" "}
          <span className="ml-1 font-serif text-2xl font-semibold text-ink tabular-nums">
            ${balance}
          </span>
        </p>
      </div>

      <div className="mt-5 grid grid-cols-[1.75rem_1fr_1fr] gap-x-3 text-sm">
        <span />
        <p className="pb-2 font-medium">Transfer 1 (−$50)</p>
        <p className="pb-2 font-medium">Transfer 2 (−$30)</p>
        {steps.map((step, i) => {
          const state = i < shown - 1 ? "done" : i === shown - 1 ? "current" : "upcoming";
          const cell = (
            <span
              className={`block rounded-md px-2.5 py-1.5 transition-colors duration-200 ${
                state === "current"
                  ? step.waiting
                    ? "bg-line text-ink"
                    : "bg-accent text-paper"
                  : state === "done"
                    ? "bg-paper text-ink"
                    : "text-faint"
              }`}
            >
              {state === "upcoming" ? "·" : step.action}
            </span>
          );
          return (
            <div key={i} className="contents">
              <span className="py-1.5 text-faint tabular-nums">{i + 1}</span>
              <div className="py-0.5">{step.actor === "T1" && cell}</div>
              <div className="py-0.5">{step.actor === "T2" && cell}</div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 min-h-12 text-small text-muted" aria-live="polite">
        {finished ? (
          <span
            className={
              ok ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
            }
          >
            {verdict}
          </span>
        ) : (
          explanation
        )}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShown((n) => Math.min(n + 1, steps.length))}
          aria-disabled={finished}
          className="rounded-md bg-accent px-4 py-2 text-small font-medium text-paper transition-colors duration-150 hover:bg-ink aria-disabled:opacity-60"
        >
          {shown === 0 ? "Start" : finished ? "Done" : "Next step"}
        </button>
        <button
          type="button"
          onClick={() => setShown((n) => Math.max(n - 1, 0))}
          aria-disabled={shown === 0}
          className="rounded-md border border-line px-4 py-2 text-small font-medium transition-colors duration-150 hover:border-accent hover:text-accent aria-disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setShown(0)}
          className="rounded-md px-3 py-2 text-small text-muted transition-colors duration-150 hover:text-accent"
        >
          Reset
        </button>
        <span className="ml-auto text-sm text-faint tabular-nums">
          Step {shown} of {steps.length}
        </span>
      </div>
    </div>
  );
}
