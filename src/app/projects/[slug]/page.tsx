import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAllSlugs } from "@/content/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <article>
      <Link href="/projects" className="text-[15px] text-muted hover:text-ink">
        &larr; Projects
      </Link>

      <h1 className="mt-6 font-serif text-3xl font-semibold">{project.title}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">{project.summary}</p>

      <p className="mt-4 text-sm text-faint">
        {project.year} · {project.stack.join(", ")}
      </p>

      {(project.links.github || project.links.live) && (
        <p className="mt-3 flex gap-5 text-[15px]">
          {project.links.github && (
            <a href={project.links.github} className="text-link" target="_blank" rel="noopener noreferrer">
              Code on GitHub
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} className="text-link" target="_blank" rel="noopener noreferrer">
              Try it
            </a>
          )}
        </p>
      )}

      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="mt-10 w-full rounded-md border border-line"
        />
      )}

      <div className="mt-10 space-y-10">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-xl font-semibold">{section.heading}</h2>
            <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-muted">
              {section.body.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <nav
        aria-label="More projects"
        className="mt-16 flex justify-between gap-6 border-t border-line pt-6 text-[15px]"
      >
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="text-muted hover:text-ink">
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="text-right text-muted hover:text-ink">
            {next.title} &rarr;
          </Link>
        )}
      </nav>
    </article>
  );
}
