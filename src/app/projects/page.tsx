import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web apps, data tools and a chess engine I've built for classes and on my own.",
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">Projects</h1>
      <p className="mt-4 mb-10 text-[17px] leading-relaxed text-muted">
        Things I&apos;ve built for classes and on my own. Click one for more about how it works.
      </p>
      <ProjectList projects={projects} showStack />
    </>
  );
}
