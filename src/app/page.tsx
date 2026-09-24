import Link from "next/link";
import { siteConfig } from "@/content/site";
import { featuredProjects, projects } from "@/content/projects";
import { experience } from "@/content/resume";
import { pageMetadata } from "@/lib/metadata";
import ButtonLink from "@/components/ButtonLink";
import HeroShowcase from "@/components/HeroShowcase";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;

  return (
    <>
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="heading-1 motion-safe:animate-rise">Hi, I&apos;m Farad.</h1>
          <p className="mt-3 font-serif text-xl motion-safe:animate-rise motion-safe:[animation-delay:60ms] sm:text-2xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 text-sm text-faint motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            Computer science at Oregon State · {siteConfig.availability}
          </p>
          <p className="mt-5 prose-body motion-safe:animate-rise motion-safe:[animation-delay:180ms]">
            I&apos;m looking for {siteConfig.lookingFor}. My projects range from a banking app that
            has to stay correct under load to a map of housing costs for every county in the US.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
            {siteConfig.resumePdf && (
              <ButtonLink href={siteConfig.resumePdf} variant="primary" download>
                Download resume
              </ButtonLink>
            )}
            <ButtonLink href={`mailto:${siteConfig.email}`}>Email me</ButtonLink>
            <SocialLinks />
          </div>
          {siteConfig.currently && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-sm text-muted motion-safe:animate-rise motion-safe:[animation-delay:300ms]">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span>
                <span className="font-medium text-ink">Currently:</span> {siteConfig.currently}
              </span>
            </p>
          )}
        </div>
        <HeroShowcase projects={featuredProjects} />
      </section>

      <section className="mt-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="heading-2">Featured projects</h2>
          <Link href="/projects" className="text-small text-link">
            All {projects.length} projects
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ProjectCard project={lead} wide eager />
          </div>
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {experience.length > 0 && (
        <section className="mt-20">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="heading-2">Experience</h2>
            <Link href="/resume" className="text-small text-link">
              Full resume
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {experience.map((job) => (
              <li
                key={`${job.org}-${job.title}`}
                className="grid gap-1 py-5 sm:grid-cols-[1fr_2fr] sm:gap-8"
              >
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-small text-muted">
                    {job.org} · {job.dates}
                  </p>
                </div>
                <p className="text-small text-muted">{job.points[0]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
