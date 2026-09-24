"use client";

import { useState } from "react";
import type { Project, Tag } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectFilter({ projects, tags }: { projects: Project[]; tags: Tag[] }) {
  const [active, setActive] = useState<Tag | null>(null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;
  const options: { label: string; value: Tag | null }[] = [
    { label: "All", value: null },
    ...tags.map((t) => ({ label: t, value: t })),
  ];

  return (
    <>
      <div
        className="mb-6 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter projects"
      >
        {options.map(({ label, value }) => {
          const count = value
            ? projects.filter((p) => p.tags.includes(value)).length
            : projects.length;
          const pressed = active === value;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(value)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 ${
                pressed
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {label} <span className="tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel="h2" eager={i < 2} />
          </li>
        ))}
      </ul>
    </>
  );
}
