import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectList({
  projects,
  showStack = false,
  thumbnails = true,
}: {
  projects: Project[];
  showStack?: boolean;
  thumbnails?: boolean;
}) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="group flex gap-4 py-5 sm:gap-5">
            {thumbnails && p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="mt-1 aspect-[16/10] w-24 shrink-0 rounded border border-line object-cover object-top sm:w-36"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium group-hover:text-accent">{p.title}</h3>
                <span className="shrink-0 text-sm text-faint tabular-nums">{p.year}</span>
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              {showStack && <p className="mt-2 text-sm text-faint">{p.stack.join(" · ")}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
