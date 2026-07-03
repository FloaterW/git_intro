import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { resumeData } from "@/content/resume";
import { skillGroups } from "@/content/skills";
import { getFeaturedProjects } from "@/content/projects";
import SkillGroup from "@/components/SkillGroup";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume — Farad Wahab, CS student at Oregon State University.",
};

export default function ResumePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section
        style={{
          paddingTop: "var(--space-4xl)",
          paddingBottom: "var(--space-xl)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "var(--content-width)" }}>
            <p className="section-label">Resume</p>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                marginBottom: "var(--space-md)",
              }}
            >
              {siteConfig.name}
            </h1>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "var(--space-xl)",
              }}
            >
              {siteConfig.description}
            </p>

            {resumeData.resumeAvailable ? (
              <Button href={siteConfig.resumeUrl} external>
                Download resume (PDF)
              </Button>
            ) : (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                  padding: "var(--space-md) var(--space-lg)",
                  backgroundColor: "var(--color-bg-alt)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  display: "inline-block",
                }}
              >
                Resume available on request
              </p>
            )}
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* Education */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "var(--content-width)" }}>
            <p className="section-label">Education</p>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "var(--space-xs)",
              }}
            >
              {resumeData.education.school}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              {resumeData.education.degree}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                marginBottom: "var(--space-lg)",
              }}
            >
              Expected {resumeData.education.expected} ·{" "}
              {resumeData.education.location}
            </p>

            <div>
              <h3
                style={{
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  color: "var(--color-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--space-sm)",
                }}
              >
                Relevant Coursework
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {resumeData.education.coursework.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <>
          <section className="section">
            <div className="container">
              <div style={{ maxWidth: "var(--content-width)" }}>
                <p className="section-label">Experience</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2xl)",
                  }}
                >
                  {resumeData.experience.map((exp, i) => (
                    <div key={i}>
                      <h2
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        {exp.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--color-text-secondary)",
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        {exp.company}
                      </p>
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--color-text-tertiary)",
                          marginBottom: "var(--space-md)",
                        }}
                      >
                        {exp.period} · {exp.location}
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--space-xs)",
                        }}
                      >
                        {exp.highlights.map((h, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: "0.875rem",
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
                              }}
                            >
                              —
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <hr className="divider container" />
        </>
      )}

      {/* Skills */}
      <section className="section">
        <div className="container">
          <p className="section-label">Skills</p>
          <h2
            className="section-title"
            style={{ marginBottom: "var(--space-2xl)" }}
          >
            Technical skills
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

      {/* Selected projects */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "var(--content-width)" }}>
            <p className="section-label">Projects</p>
            <h2
              className="section-title"
              style={{ marginBottom: "var(--space-xl)" }}
            >
              Selected projects
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              {featured.map((project) => (
                <div
                  key={project.slug}
                  style={{
                    paddingBottom: "var(--space-lg)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "var(--space-sm)",
                      marginBottom: "var(--space-xs)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {project.subtitle}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-xs)",
                    }}
                  >
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
