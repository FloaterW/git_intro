import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import ButtonLink from "@/components/ButtonLink";
import DemoVideo from "@/components/DemoVideo";

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

  const imageSizes = "(min-width: 896px) 832px, 100vw";

  return (
    <article>
      <Link href="/projects" className="text-small text-muted transition-colors duration-150 hover:text-ink">
        &larr; All projects
      </Link>

      <header className="mt-6 max-w-2xl">
        <h1 className="heading-1">{project.title}</h1>
        <p className="mt-3 prose-body">{project.summary}</p>
        {(project.links.live || project.links.github) && (
          <div className="mt-5 flex flex-wrap gap-3">
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
      </header>

      <div className="mt-8">
        {project.video ? (
          <DemoVideo
            webm={project.video.webm}
            mp4={project.video.mp4}
            poster={
              getImageProps({ src: project.image, alt: "", width: 1600, height: 1000, sizes: imageSizes }).props.src
            }
            label={`Short demo of ${project.title}`}
          />
        ) : (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1600}
            height={1000}
            sizes={imageSizes}
            loading="eager"
            fetchPriority="high"
            className="w-full rounded-lg border border-line dark:brightness-90"
          />
        )}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-small sm:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-faint">{label}</dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>

      {project.metrics.length > 0 && (
        <ul className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-5">
          {project.metrics.map((m) => (
            <li key={m.label}>
              <p className="font-serif text-2xl font-semibold tabular-nums sm:text-3xl">{m.value}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 max-w-2xl space-y-10">
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

        {project.code && (
          <section>
            <h2 className="heading-2">A piece of the code</h2>
            <p className="mt-3 prose-body">{project.code.caption}</p>
            <pre
              tabIndex={0}
              aria-label={`Code sample from ${project.title}`}
              className="mt-4 overflow-x-auto rounded-lg border border-line bg-card p-4 text-[13px] leading-relaxed">
              <code className={`language-${project.code.language}`}>{project.code.source}</code>
            </pre>
          </section>
        )}
      </div>

      <nav
        aria-label="More projects"
        className="mt-16 grid gap-4 border-t border-line pt-6 text-small sm:grid-cols-2"
      >
        {prev && (
          <Link href={`/projects/${prev.slug}`} className="group">
            <span className="block text-sm text-faint">Previous</span>
            <span className="transition-colors duration-150 group-hover:text-accent">&larr; {prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="group sm:col-start-2 sm:text-right">
            <span className="block text-sm text-faint">Next</span>
            <span className="transition-colors duration-150 group-hover:text-accent">{next.title} &rarr;</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
