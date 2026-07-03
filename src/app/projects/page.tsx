import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software engineering projects — full-stack apps, data tools, systems work, and more.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <>
      <section
        style={{
          paddingTop: "var(--space-4xl)",
          paddingBottom: "var(--space-xl)",
        }}
      >
        <div className="container">
          <p className="section-label">Projects</p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              marginBottom: "var(--space-md)",
            }}
          >
            Things I&apos;ve built
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-secondary)",
              maxWidth: "36rem",
              lineHeight: 1.7,
            }}
          >
            A mix of coursework, personal projects, and exploratory work. Each
            one taught me something different about building software well.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "var(--space-xl)" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "var(--space-xl)",
            }}
          >
            Featured
          </h2>
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {other.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-xl)",
                paddingTop: "var(--space-2xl)",
              }}
            >
              Other Projects
            </h2>
            {other.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
