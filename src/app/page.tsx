import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Hi, I&apos;m Farad.</h1>
      <p className="mt-3 font-serif text-xl text-ink sm:text-2xl">{siteConfig.tagline}</p>

      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          I&apos;m finishing a computer science degree at Oregon State. Most of what I build is web
          apps with a real database behind them, and a lot of it involves data: cleaning it, storing
          it, and turning it into something people can use. Now and then I build something just for
          the algorithm, like the chess engine below.
        </p>
        <p>
          I&apos;m looking for a full-time software engineering job starting after I graduate in{" "}
          {siteConfig.graduation}. If you&apos;re hiring,{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-link">
            send me an email
          </a>
          {siteConfig.resumePdf && (
            <>
              {" "}
              or grab my{" "}
              <a href={siteConfig.resumePdf} className="text-link">
                resume
              </a>
            </>
          )}
          .
        </p>
      </div>

      <p className="mt-5 text-sm text-faint">
        {siteConfig.location} · {siteConfig.availability}
      </p>

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
