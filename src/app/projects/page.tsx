import { Suspense } from "react";
import { allTags, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import ProjectFilter, { FilterView } from "@/components/ProjectFilter";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Web apps, data tools and a chess engine I've built for classes and on my own.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <h1 className="heading-1">Projects</h1>
      <p className="mt-4 mb-8 max-w-2xl prose-body">
        Things I&apos;ve built for classes and on my own. Each write-up covers what I built, the
        hardest problem I hit, and what I&apos;d do next, with links to the code and a live demo
        where there is one.
      </p>
      <Suspense fallback={<FilterView projects={projects} tags={allTags} />}>
        <ProjectFilter projects={projects} tags={allTags} />
      </Suspense>
    </>
  );
}
