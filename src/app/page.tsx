import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Hi, I&apos;m Farad.</h1>

      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          I&apos;m finishing a computer science degree at Oregon State (class of{" "}
          {siteConfig.gradYear}). Most of what I build is web apps with a real database behind
          them, but I also like problems that are more about the algorithm, like the chess engine
          below.
        </p>
        <p>
          I&apos;m looking for a software engineering job. If you think I&apos;d be a good fit,{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-link">
            send me an email
          </a>{" "}
          or have a look at my{" "}
          <a href={siteConfig.github} className="text-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>

      <h2 className="mt-16 mb-2 font-serif text-xl font-semibold">Some things I&apos;ve built</h2>
      <ProjectList projects={getFeaturedProjects()} />
      <p className="mt-5 text-[15px]">
        <Link href="/projects" className="text-link">
          See all projects
        </Link>
      </p>
    </>
  );
}
