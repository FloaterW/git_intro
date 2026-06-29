import Link from "next/link";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "hero" | "default";
}

export default function ProjectCard({ project, index, variant = "default" }: ProjectCardProps) {
  const statusLabel: Record<Project["status"], string> = {
    completed: "Completed",
    "in-progress": "In Progress",
    coursework: "Coursework",
  };

  const categoryLabel: Record<Project["category"], string> = {
    "full-stack": "Full-Stack",
    systems: "Systems",
    data: "Data",
    frontend: "Frontend",
  };

  if (variant === "hero") {
    return (
      <article
        className="project-card project-hero-card"
        style={{
          marginBottom: "var(--space-2xl)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
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

        <h3
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "var(--space-sm)",
            letterSpacing: "-0.02em",
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="project-title-link"
            style={{ transition: "color 0.15s" }}
          >
            {project.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-lg)",
            maxWidth: "44rem",
            lineHeight: 1.7,
          }}
        >
          {project.summary}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xs)",
            marginBottom: "var(--space-lg)",
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

        <Link
          href={`/projects/${project.slug}`}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-accent)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            transition: "gap 0.2s",
          }}
          className="project-read-more"
        >
          Read case study
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
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        <style>{`
          .project-title-link:hover {
            color: var(--color-accent);
          }
          .project-read-more:hover {
            gap: var(--space-sm) !important;
          }
        `}</style>
      </article>
    );
  }

  return (
    <article
      className="project-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "var(--space-xl)",
        paddingTop: index === 0 ? 0 : "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-sm)",
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

        <h3
          style={{
            fontSize: "1.375rem",
            fontWeight: 600,
            marginBottom: "var(--space-xs)",
            letterSpacing: "-0.01em",
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            style={{
              transition: "color 0.15s",
            }}
            className="project-title-link"
          >
            {project.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-md)",
            maxWidth: "40rem",
            lineHeight: 1.6,
          }}
        >
          {project.summary}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xs)",
            marginBottom: "var(--space-md)",
          }}
        >
          {project.stack.slice(0, 5).map((tech) => (
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

        <Link
          href={`/projects/${project.slug}`}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-accent)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            transition: "gap 0.2s",
          }}
          className="project-read-more"
        >
          Read case study
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
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <style>{`
        .project-title-link:hover {
          color: var(--color-accent);
        }
        .project-read-more:hover {
          gap: var(--space-sm) !important;
        }
      `}</style>
    </article>
  );
}
