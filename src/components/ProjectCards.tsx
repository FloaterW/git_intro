import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCards({
  projects,
  headingLevel: Heading = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-colors duration-200 hover:border-accent/60"
          >
            <Image
              src={p.image}
              alt=""
              width={1600}
              height={1000}
              sizes="(min-width: 896px) 410px, (min-width: 640px) 45vw, 100vw"
              className="aspect-16/10 w-full border-b border-line object-cover object-top dark:brightness-90"
            />
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-baseline justify-between gap-3">
                <Heading className="font-medium transition-colors duration-150 group-hover:text-accent">
                  {p.title}
                </Heading>
                <span className="shrink-0 text-sm text-faint tabular-nums">{p.year}</span>
              </div>
              <p className="mt-1 text-small text-muted">{p.summary}</p>
              <p className="mt-auto pt-3 text-sm text-faint">{p.stack.join(" · ")}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
