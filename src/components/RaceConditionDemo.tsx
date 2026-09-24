"use client";

import { useEffect, useRef, useState } from "react";

const START = 5000;
const TRANSFERS = 1000;
const IN_FLIGHT = 6;

type Balances = [number, number];

interface Pending {
  from: 0 | 1;
  amount: number;
  seen: Balances;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// Each transfer reads the sender's balance, then later saves "balance read minus amount".
// Without a lock, other transfers can change that balance in between and get overwritten,
// while the credit to the other account still goes through.
function simulate(locked: boolean): Balances[] {
  const balances: Balances = [START, START];
  const pending: Pending[] = [];
  const frames: Balances[] = [];
  let started = 0;
  let finished = 0;

  const finish = (t: Pending) => {
    const fromBalance = locked ? balances[t.from] : t.seen[t.from];
    if (fromBalance < t.amount) return;
    const to = t.from === 0 ? 1 : 0;
    balances[t.from] = fromBalance - t.amount;
    balances[to] += t.amount;
  };

  while (finished < TRANSFERS) {
    const canStart =
      started < TRANSFERS && (locked ? pending.length === 0 : pending.length < IN_FLIGHT);
    if (canStart && (pending.length === 0 || Math.random() < 0.5)) {
      pending.push({
        from: Math.random() < 0.5 ? 0 : 1,
        amount: 10 + Math.floor(Math.random() * 90),
        seen: [balances[0], balances[1]],
      });
      started++;
    } else {
      const t = pending.splice(Math.floor(Math.random() * pending.length), 1)[0];
      finish(t);
      finished++;
      if (finished % 20 === 0) frames.push([balances[0], balances[1]]);
    }
  }
  return frames;
}

export default function RaceConditionDemo() {
  const [locked, setLocked] = useState(false);
  const [balances, setBalances] = useState<Balances>([START, START]);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  function run() {
    if (running) return;
    setRuns((n) => n + 1);
    const frames = simulate(locked);
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant) {
      setBalances(frames[frames.length - 1]);
      setProgress(1);
      return;
    }
    setRunning(true);
    let i = 0;
    const step = () => {
      setBalances(frames[i]);
      setProgress((i + 1) / frames.length);
      i++;
      if (i < frames.length) {
        frame.current = requestAnimationFrame(step);
      } else {
        setRunning(false);
      }
    };
    frame.current = requestAnimationFrame(step);
  }

  function choose(value: boolean) {
    if (running || value === locked) return;
    setLocked(value);
    setBalances([START, START]);
    setProgress(0);
  }

  const total = balances[0] + balances[1];
  const drift = total - START * 2;
  const done = progress === 1 && !running;

  return (
    <div className="rounded-xl border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Transfer mode">
        {[
          { label: "Without locks", value: false },
          { label: "With row locks", value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            aria-pressed={locked === opt.value}
            aria-disabled={running}
            onClick={() => choose(opt.value)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 aria-disabled:opacity-50 ${
              locked === opt.value
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={run}
          aria-disabled={running}
          className="ml-auto rounded-md bg-accent px-4 py-2 text-small font-medium text-paper transition-colors duration-150 hover:bg-ink aria-disabled:opacity-60"
        >
          {running ? "Running…" : `Run ${TRANSFERS.toLocaleString()} transfers`}
        </button>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 tabular-nums">
        <div>
          <dt className="text-sm text-faint">Account A</dt>
          <dd className="font-serif text-xl font-semibold sm:text-2xl">
            {usd.format(balances[0])}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-faint">Account B</dt>
          <dd className="font-serif text-xl font-semibold sm:text-2xl">
            {usd.format(balances[1])}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-faint">Total</dt>
          <dd className="font-serif text-xl font-semibold sm:text-2xl">{usd.format(total)}</dd>
        </div>
      </dl>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </div>

      <p className="mt-4 min-h-6 text-small" aria-live="polite">
        {done && <span className="sr-only">Run {runs}: </span>}
        {done &&
          (locked ? (
            <span className="text-emerald-700 dark:text-emerald-400">
              Total is still {usd.format(START * 2)}. Every transfer waited its turn.
            </span>
          ) : drift === 0 ? (
            <span className="text-muted">
              No money went missing this time, but that was luck. Run it again.
            </span>
          ) : (
            <span className="text-red-700 dark:text-red-400">
              {usd.format(Math.abs(drift))} {drift < 0 ? "disappeared" : "appeared out of nowhere"}.
              Transfers overwrote each other&apos;s balances.
            </span>
          ))}
        {!done && !running && (
          <span className="text-muted">Both accounts start at {usd.format(START)}.</span>
        )}
      </p>
    </div>
  );
}
