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

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-[15px] hover:border-accent hover:text-accent"
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
      </svg>
    </a>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[i - 1];
  const next = projects[i + 1];

  const facts = [
    ["My role", project.role],
    ["Team", project.team],
    ["When", project.timeline],
    ["Built with", project.stack.join(", ")],
  ];

  return (
    <article>
      <Link href="/projects" className="text-[15px] text-muted hover:text-ink">
        &larr; Projects
      </Link>

      <h1 className="mt-6 font-serif text-3xl font-semibold">{project.title}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">{project.summary}</p>

      {(project.links.live || project.links.github) && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.live && <ExternalLink href={project.links.live}>Try it</ExternalLink>}
          {project.links.github && <ExternalLink href={project.links.github}>Code</ExternalLink>}
        </div>
      )}

      {project.video ? (
        <video
          src={project.video}
          poster={project.image}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`Short demo of ${project.title}`}
          className="mt-8 w-full rounded-md border border-line"
        />
      ) : (
        project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="mt-8 w-full rounded-md border border-line"
          />
        )
      )}

      <dl className="mt-8 grid gap-x-8 gap-y-4 text-[15px] sm:grid-cols-2">
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
