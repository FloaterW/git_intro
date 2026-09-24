import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { education, experience, skills } from "@/content/resume";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Farad Wahab's resume: education, projects and skills.",
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 border-b border-line pb-2 font-serif text-xl font-semibold">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">Resume</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-muted">
        {siteConfig.resumePdf ? (
          <>
            Here&apos;s the short version.{" "}
            <a href="/resume.pdf" className="text-link">
              Download the PDF
            </a>{" "}
            if you&apos;d rather have that.
          </>
        ) : (
          <>
            Here&apos;s the short version. If you want a PDF,{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              email me
            </a>{" "}
            and I&apos;ll send one over.
          </>
        )}
      </p>

      <Heading>Education</Heading>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-medium">{education.school}</p>
        <p className="shrink-0 text-sm text-faint">{education.graduation}</p>
      </div>
      <p className="text-muted">
        {education.degree} · {education.location}
      </p>
      <p className="mt-2 text-[15px] text-muted">
        Coursework: {education.coursework.join(", ")}
      </p>

      {experience.length > 0 && (
        <>
          <Heading>Experience</Heading>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={`${job.org}-${job.title}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium">
                    {job.title}, {job.org}
                  </p>
                  <p className="shrink-0 text-sm text-faint">{job.dates}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-muted">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      <Heading>Projects</Heading>
      <div className="space-y-5">
        {projects.map((p) => (
          <div key={p.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <Link href={`/projects/${p.slug}`} className="text-link font-medium">
                {p.title}
              </Link>
              <p className="shrink-0 text-sm text-faint">{p.year}</p>
            </div>
            <p className="mt-1 text-[15px] text-muted">{p.summary}</p>
            <p className="mt-1 text-sm text-faint">{p.stack.join(", ")}</p>
          </div>
        ))}
      </div>

      <Heading>Skills</Heading>
      <dl className="space-y-2 text-[15px]">
        {skills.map((s) => (
          <div key={s.label} className="sm:flex sm:gap-4">
            <dt className="shrink-0 font-medium sm:w-32">{s.label}</dt>
            <dd className="text-muted">{s.items}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
