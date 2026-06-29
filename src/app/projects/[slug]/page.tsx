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
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const statusLabel = {
    completed: "Completed",
    "in-progress": "In Progress",
    coursework: "Coursework",
  } as const;

  const categoryLabel = {
    "full-stack": "Full-Stack",
    systems: "Systems",
    data: "Data",
    frontend: "Frontend",
  } as const;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <article>
        {/* Header */}
        <section
          style={{
            paddingTop: "var(--space-2xl)",
            paddingBottom: "var(--space-3xl)",
          }}
        >
          <div className="container">
            <Link
              href="/projects"
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                marginBottom: "var(--space-xl)",
                transition: "color 0.15s",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All projects
            </Link>

            <div style={{ maxWidth: "var(--content-width)" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-sm)",
                  marginBottom: "var(--space-md)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {categoryLabel[project.category]}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  · {project.year} · {statusLabel[project.status]}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  marginBottom: "var(--space-sm)",
                }}
              >
                {project.title}
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {project.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Image placeholder */}
        {project.image ? (
          <div className="container" style={{ marginBottom: "var(--space-3xl)" }}>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        ) : (
          <div className="container" style={{ marginBottom: "var(--space-3xl)" }}>
            <div className="screenshot-placeholder">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-tertiary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Screenshot coming soon
              </p>
            </div>
          </div>
        )}

        {/* Content with sidebar */}
        <div className="container">
          <div className="case-study-layout">
            {/* Main content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3xl)",
              }}
            >
              {/* Overview */}
              <div>
                <h2 style={sectionHeading}>Overview</h2>
                <p style={bodyText}>{project.summary}</p>
              </div>

              {/* Problem */}
              <div>
                <h2 style={sectionHeading}>The problem</h2>
                <p style={bodyText}>{project.problem}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 style={sectionHeading}>Key features</h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-sm)",
                  }}
                >
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        paddingLeft: "var(--space-lg)",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--color-accent)",
                          fontWeight: 600,
                        }}
                      >
                        —
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical details */}
              <div>
                <h2 style={sectionHeading}>Technical details</h2>
                <p style={bodyText}>{project.technicalDetails}</p>
              </div>

              {/* Lessons */}
              <div>
                <h2 style={sectionHeading}>What I learned</h2>
                <p style={bodyText}>{project.lessons}</p>
              </div>

              {/* Improvements */}
              <div>
                <h2 style={sectionHeading}>What I&apos;d improve</h2>
                <p style={bodyText}>{project.improvements}</p>
              </div>

              {/* Links */}
              {(project.links.github || project.links.live) && (
                <div>
                  <h2 style={sectionHeading}>Links</h2>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-lg)",
                    }}
                  >
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--color-accent)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--space-sm)",
                        }}
                      >
                        View source
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--color-accent)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--space-sm)",
                        }}
                      >
                        Live demo
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — metadata */}
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xl)",
              }}
            >
              <div>
                <h2 style={sidebarLabel}>My role</h2>
                <p style={sidebarText}>{project.role}</p>
              </div>

              <div>
                <h2 style={sidebarLabel}>Tech stack</h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs)",
                  }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-secondary)",
                        backgroundColor: "var(--color-bg-alt)",
                        padding: "0.1875rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={sidebarLabel}>Year</h2>
                <p style={sidebarText}>{project.year}</p>
              </div>

              <div>
                <h2 style={sidebarLabel}>Status</h2>
                <p style={sidebarText}>{statusLabel[project.status]}</p>
              </div>
            </aside>
          </div>
        </div>

        {/* Nav between projects */}
        <div
          className="container"
          style={{
            paddingTop: "var(--space-4xl)",
            paddingBottom: "var(--space-4xl)",
          }}
        >
          <hr className="divider" style={{ marginBottom: "var(--space-2xl)" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-lg)",
            }}
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Previous
                </span>
                {prevProject.title}
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Next
                </span>
                {nextProject.title}
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>
    </>
  );
}

const sectionHeading: React.CSSProperties = {
  fontSize: "0.8125rem",
  fontFamily: "var(--font-mono)",
  fontWeight: 500,
  color: "var(--color-text-tertiary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "var(--space-md)",
};

const bodyText: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "var(--color-text-secondary)",
  lineHeight: 1.7,
  maxWidth: "40rem",
};

const sidebarLabel: React.CSSProperties = {
  fontSize: "0.75rem",
  fontFamily: "var(--font-mono)",
  fontWeight: 500,
  color: "var(--color-text-tertiary)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "var(--space-sm)",
};

const sidebarText: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "var(--color-text-secondary)",
  lineHeight: 1.6,
};
