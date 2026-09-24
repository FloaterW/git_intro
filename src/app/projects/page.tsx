import type { Metadata } from "next";
import { getFeaturedProjects, getSmallerProjects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web apps, data tools and a chess engine I've built for classes and on my own.",
};

export default function ProjectsPage() {
  const smaller = getSmallerProjects();

  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">Projects</h1>
      <p className="mt-4 mb-10 text-[17px] leading-relaxed text-muted">
        Things I&apos;ve built for classes and on my own. Each one links to the code, and most have a
        version you can try.
      </p>
      <ProjectList projects={getFeaturedProjects()} showStack />

      {smaller.length > 0 && (
        <>
          <h2 className="mt-14 mb-2 font-serif text-xl font-semibold">Smaller projects</h2>
          <ProjectList projects={smaller} showStack thumbnails={false} />
        </>
      )}
    </>
  );
}
