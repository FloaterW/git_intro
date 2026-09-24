"use client";

import { useSearchParams } from "next/navigation";
import { MIN_FOR_FILTERS, type Project, type Tag } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

interface Props {
  projects: Project[];
  tags: Tag[];
}

// The active filter lives in the URL (?tag=Data) so Back and shared links keep it.
export default function ProjectFilter({ projects, tags }: Props) {
  const param = useSearchParams().get("tag");
  const active = tags.find((t) => t === param) ?? null;

  function select(tag: Tag | null) {
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    window.history.replaceState(null, "", url);
  }

  return <FilterView projects={projects} tags={tags} active={active} onSelect={select} />;
}

// Rendered on the server as the Suspense fallback, so the page arrives with every project.
export function FilterView({
  projects,
  tags,
  active = null,
  onSelect,
}: Props & { active?: Tag | null; onSelect?: (tag: Tag | null) => void }) {
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;
  const options: { label: string; value: Tag | null }[] = [
    { label: "All", value: null },
    ...tags.map((t) => ({ label: t, value: t })),
  ];

  // With only a handful of projects, filters leave near-empty pages. Show them once there are more.
  if (projects.length < MIN_FOR_FILTERS) {
    return (
      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel="h2" eager={i < 2} />
          </li>
        ))}
      </ul>
    );
  }

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
              onClick={() => onSelect?.(value)}
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
