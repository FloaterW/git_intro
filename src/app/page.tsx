import Link from "next/link";
import { siteConfig } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/resume";
import { pageMetadata } from "@/lib/metadata";
import ButtonLink from "@/components/ButtonLink";
import ProjectCards from "@/components/ProjectCards";
import SocialLinks from "@/components/SocialLinks";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <section className="max-w-2xl">
        <h1 className="heading-1">Hi, I&apos;m Farad.</h1>
        <p className="mt-3 font-serif text-xl sm:text-2xl">{siteConfig.tagline}</p>
        <p className="mt-3 text-sm text-faint">
          Computer science at Oregon State · Graduating {siteConfig.graduation} ·{" "}
          {siteConfig.availability}
        </p>
        <p className="mt-5 prose-body">
          I&apos;m looking for my first full-time software engineering job. My projects range from
          a banking app that has to stay correct under load to a map of housing costs for every
          county in the US.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
          {siteConfig.resumePdf && (
            <ButtonLink href={siteConfig.resumePdf} variant="primary" download>
              Download resume
            </ButtonLink>
          )}
          <ButtonLink href={`mailto:${siteConfig.email}`}>Email me</ButtonLink>
          <SocialLinks />
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="heading-2">Projects</h2>
          <Link href="/projects" className="text-small text-link">
            All projects
          </Link>
        </div>
        <ProjectCards projects={featuredProjects} />
      </section>

      {experience.length > 0 && (
        <section className="mt-16 max-w-2xl">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="heading-2">Experience</h2>
            <Link href="/resume" className="text-small text-link">
              Full resume
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {experience.map((job) => (
              <li key={`${job.org}-${job.title}`} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium">
                    {job.title} <span className="font-normal text-muted">· {job.org}</span>
                  </h3>
                  <span className="text-sm text-faint">{job.dates}</span>
                </div>
                <p className="mt-1 text-small text-muted">{job.points[0]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
