import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, type Project } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ButtonLink from "@/components/ButtonLink";
import CodeBlock from "@/components/CodeBlock";
import DemoVideo from "@/components/DemoVideo";
import InterleavingStepper from "@/components/InterleavingStepper";
import RaceConditionDemo from "@/components/RaceConditionDemo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: `/projects/${project.slug}/opengraph-image`,
  });
}

function NeighbourCard({
  project,
  direction,
}: {
  project: Project;
  direction: "Previous" | "Next";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex items-center gap-4 rounded-xl border border-line bg-card p-3 transition duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-black/5 ${
        direction === "Next" ? "sm:col-start-2 sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <Image
          src={project.image}
          alt=""
          width={1600}
          height={1000}
          sizes="96px"
          className="aspect-16/10 w-24 shrink-0 rounded-md border border-line object-cover object-top dark:brightness-90"
        />
      </ViewTransition>
      <span>
        <span className="block text-sm text-faint">{direction} project</span>
        <span className="font-medium transition-colors duration-150 group-hover:text-accent">
          {direction === "Previous" && "← "}
          {project.title}
          {direction === "Next" && " →"}
        </span>
      </span>
    </Link>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[i - 1];
  const next = projects[i + 1];

  const facts: [label: string, value: string][] = [
    ["My role", project.role],
    ["Team", project.team],
    ["When", project.timeline],
    ["Built with", project.stack.join(", ")],
  ];

  return (
    <article>
      <Link
        href="/projects"
        className="text-small text-muted transition-colors duration-150 hover:text-ink"
      >
        &larr; All projects
      </Link>

      <header className="mt-6 max-w-2xl">
        <h1 className="heading-1 motion-safe:animate-rise">{project.title}</h1>
        <p className="mt-3 prose-body motion-safe:animate-rise motion-safe:[animation-delay:60ms]">
          {project.summary}
        </p>
        {(project.links.live || project.links.github) && (
          <div className="mt-5 flex flex-wrap gap-3 motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            {project.links.live && (
              <ButtonLink href={project.links.live} variant="primary" external>
                Live demo
              </ButtonLink>
            )}
            {project.links.github && (
              <ButtonLink href={project.links.github} external>
                Source code
              </ButtonLink>
            )}
          </div>
        )}
        {project.links.live && project.links.liveNote && (
          <p className="mt-3 text-small text-muted motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            {project.links.liveNote}
          </p>
        )}
      </header>

      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <div className="mt-8">
          {project.video ? (
            <DemoVideo
              webm={project.video.webm}
              mp4={project.video.mp4}
              poster={project.video.poster}
              label={`Short demo of ${project.title}`}
            />
          ) : (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 960px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="w-full rounded-xl border border-line dark:brightness-90"
            />
          )}
        </div>
      </ViewTransition>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-small sm:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-faint">{label}</dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>

      {project.metrics.length > 0 && (
        <ul className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
          {project.metrics.map((m) => (
            <li key={m.label}>
              <p className="font-serif text-2xl font-semibold tabular-nums sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      {project.architecture && (
        <section className="mt-12">
          <h2 className="mb-4 heading-2">How it&apos;s built</h2>
          <ArchitectureDiagram steps={project.architecture} />
        </section>
      )}

      <div className="mt-12 max-w-2xl space-y-10">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="heading-2">{section.heading}</h2>
            <div className="mt-3 space-y-4 prose-body">
              {section.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {project.demo === "race-condition" && (
        <section id="try-it" className="mt-12 max-w-3xl">
          <h2 className="heading-2">Try the bug yourself</h2>
          <p className="mt-3 mb-5 max-w-2xl prose-body">
            Step through two transfers hitting the same account, first without a lock and then with
            one.
          </p>
          <InterleavingStepper />
          <h3 className="mt-10 font-medium">Now at scale</h3>
          <p className="mt-2 mb-5 max-w-2xl prose-body">
            The same thing with 1,000 transfers. Without locks, money goes missing or appears from
            nowhere. With row locks, the total never changes.
          </p>
          <RaceConditionDemo />
        </section>
      )}

      {project.code && (
        <section className="mt-12 max-w-3xl">
          <h2 className="heading-2">A piece of the code</h2>
          <p className="mt-3 max-w-2xl prose-body">{project.code.caption}</p>
          <CodeBlock
            source={project.code.source}
            lang={project.code.lang}
            label={`Code sample from ${project.title}`}
          />
        </section>
      )}

      <nav aria-label="More projects" className="mt-16 grid gap-4 sm:grid-cols-2">
        {prev && <NeighbourCard project={prev} direction="Previous" />}
        {next && <NeighbourCard project={next} direction="Next" />}
      </nav>
    </article>
  );
}
