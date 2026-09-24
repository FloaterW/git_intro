import Link from "next/link";
import { featuredProjects, smallerProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import ProjectCards from "@/components/ProjectCards";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Web apps, data tools and a chess engine I've built for classes and on my own.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <h1 className="heading-1">Projects</h1>
      <p className="mt-4 mb-10 max-w-2xl prose-body">
        Things I&apos;ve built for classes and on my own. Each one links to the code, and most have a
        version you can try.
      </p>
      <ProjectCards projects={featuredProjects} headingLevel="h2" />

      {smallerProjects.length > 0 && (
        <section className="mt-16 max-w-2xl">
          <h2 className="mb-2 heading-2">Smaller projects</h2>
          <ul className="divide-y divide-line border-y border-line">
            {smallerProjects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group block py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium transition-colors duration-150 group-hover:text-accent">
                      {p.title}
                    </h3>
                    <span className="shrink-0 text-sm text-faint tabular-nums">{p.year}</span>
                  </div>
                  <p className="mt-1 text-small text-muted">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
