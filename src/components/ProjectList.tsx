import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectList({
  projects,
  showStack = false,
}: {
  projects: Project[];
  showStack?: boolean;
}) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="group block py-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium group-hover:text-accent">{p.title}</h3>
              <span className="shrink-0 text-sm text-faint tabular-nums">{p.year}</span>
            </div>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.summary}</p>
            {showStack && (
              <p className="mt-2 text-sm text-faint">{p.stack.join(" · ")}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
