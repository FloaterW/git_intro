import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import ProjectCard from "@/components/ProjectCard";
import SkillGroup from "@/components/SkillGroup";
import Button from "@/components/Button";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "var(--space-4xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "40rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--color-accent)",
                marginBottom: "var(--space-md)",
                letterSpacing: "0.02em",
              }}
            >
              {siteConfig.university} · Computer Science &apos;{siteConfig.gradYear.slice(-2)}
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "var(--space-lg)",
              }}
            >
              I build software that
              <br />
              works for people.
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "36rem",
                marginBottom: "var(--space-2xl)",
              }}
            >
              Full-stack applications, data tools, and interfaces where the
              architecture, the data model, and the user experience all have to
              line up. Currently finishing my CS degree at Oregon State and
              looking for engineering roles.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-md)",
              }}
            >
              <Button href="/projects">View my work</Button>
              <Button href="/resume" variant="secondary">
                Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* Selected Work */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "var(--space-2xl)",
              flexWrap: "wrap",
              gap: "var(--space-md)",
            }}
          >
            <div>
              <p className="section-label">Selected work</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Projects I&apos;ve built
              </h2>
            </div>
            <Link
              href="/projects"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-accent)",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-xs)",
              }}
            >
              All projects
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

          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <hr className="divider container" />

      {/* Technical Strengths */}
      <section className="section">
        <div className="container">
          <p className="section-label">Technical strengths</p>
          <h2
            className="section-title"
            style={{ marginBottom: "var(--space-2xl)" }}
          >
            What I work with
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
              gap: "var(--space-xl)",
            }}
          >
            {skillGroups.map((group) => (
              <SkillGroup key={group.label} group={group} />
            ))}
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* About preview */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-2xl)",
              alignItems: "start",
            }}
          >
            <div style={{ maxWidth: "var(--content-width)" }}>
              <p className="section-label">About</p>
              <h2 className="section-title">A bit about me</h2>
              <div className="prose">
                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                  }}
                >
                  I&apos;m a final-year computer science student at Oregon State
                  with a focus on building things that work well — not just
                  technically, but for the people using them. My projects tend to
                  sit at the intersection of software engineering and data, and I
                  care about clean architecture, readable code, and interfaces
                  that don&apos;t make users think harder than necessary.
                </p>
                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                  }}
                >
                  I&apos;m drawn to problems where getting the abstraction right
                  matters — where a good data model makes the whole system
                  simpler, or where the right interface turns a complex workflow
                  into something someone can actually use.
                </p>
              </div>
              <div style={{ marginTop: "var(--space-xl)" }}>
                <Link
                  href="/about"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-accent)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                  }}
                >
                  More about me
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
            </div>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* Contact */}
      <ContactSection />
    </>
  );
}
