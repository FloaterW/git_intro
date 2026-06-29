import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Farad Wahab — final-year CS student at Oregon State University.",
};

export default function AboutPage() {
  return (
    <>
      <section
        style={{
          paddingTop: "var(--space-4xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "var(--content-width)" }}>
            <p className="section-label">About</p>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                marginBottom: "var(--space-2xl)",
              }}
            >
              Building software that earns its complexity.
            </h1>

            <div className="prose">
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                }}
              >
                I&apos;m Farad — a final-year computer science student at Oregon
                State University. I spend most of my time building software that
                sits at the intersection of engineering and practical use: full-stack
                applications, data tools, and interfaces where the technical
                decisions directly shape the user experience.
              </p>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                }}
              >
                What draws me to software is the challenge of making complex
                systems understandable. I like projects where getting the data
                model right makes everything downstream simpler, or where a
                thoughtful interface turns a messy workflow into something
                someone can actually use without a manual.
              </p>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                }}
              >
                My background spans full-stack development, data engineering, and
                systems work. I&apos;ve built video platforms, banking systems,
                data dashboards, and a chess engine — projects that range from
                media processing pipelines to algorithmic optimization. What
                connects them is a focus on clean architecture and honest
                engineering trade-offs.
              </p>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.8,
                }}
              >
                Right now I&apos;m focused on finishing my degree and finding
                engineering roles where I can contribute to real products. I care
                most about teams that value clear thinking, readable code, and
                building things that actually work for the people using them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      {/* What I value */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "var(--content-width)" }}>
            <h2
              style={{
                fontSize: "1.375rem",
                fontWeight: 600,
                marginBottom: "var(--space-xl)",
              }}
            >
              How I think about software
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xl)",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Start from the problem
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  The best technical decisions come from understanding the
                  problem deeply — not from picking the trendiest stack. I try to
                  understand what the system needs before deciding how to build
                  it.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Earn complexity
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  Simple code that works is better than clever code that
                  impresses. I add abstractions when they reduce confusion, not
                  when they demonstrate knowledge.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Ship, then iterate
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  A working system you can improve is more valuable than a
                  perfect plan you haven&apos;t started. I aim for solid first
                  versions and clear paths to improvement.
                </p>
              </div>
            </div>
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
                fontSize: "1.375rem",
                fontWeight: 600,
                marginBottom: "var(--space-lg)",
              }}
            >
              {siteConfig.university}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Bachelor of Science in Computer Science · Expected{" "}
              {siteConfig.gradYear}
            </p>
          </div>
        </div>
      </section>

      <hr className="divider container" />

      <ContactSection />
    </>
  );
}
