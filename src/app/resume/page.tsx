import Link from "next/link";
import { siteConfig } from "@/content/site";
import { education, experience, skills } from "@/content/resume";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import ButtonLink from "@/components/ButtonLink";

export const metadata = pageMetadata({
  title: "Resume",
  description: "Farad Wahab's resume: education, experience, projects and skills.",
  path: "/resume",
});

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 mb-4 border-b border-line pb-2 heading-2">{children}</h2>;
}

function Row({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="font-medium">{left}</h3>
      <p className="text-sm text-faint">{right}</p>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="heading-1">Resume</h1>
      {siteConfig.resumePdf ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ButtonLink href={siteConfig.resumePdf} variant="primary" download>
            Download PDF
          </ButtonLink>
          <span className="text-small text-muted">or read the short version below.</span>
        </div>
      ) : (
        <p className="mt-4 prose-body">
          For a PDF,{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-link">
            email me
          </a>
          .
        </p>
      )}

      <Heading>Education</Heading>
      <Row left={education.school} right={education.graduation} />
      <p className="text-muted">
        {education.degree}
        {education.gpa && <> · GPA {education.gpa}</>}
      </p>
      <p className="mt-2 text-small text-muted">Coursework: {education.coursework.join(", ")}</p>

      {experience.length > 0 && (
        <>
          <Heading>Experience</Heading>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={`${job.org}-${job.title}`}>
                <Row left={job.title} right={job.dates} />
                <p className="text-muted">{job.org}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-muted">
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
            <Row
              left={
                <Link href={`/projects/${p.slug}`} className="text-link">
                  {p.title}
                </Link>
              }
              right={p.year}
            />
            <p className="mt-1 text-small text-muted">{p.summary}</p>
            <p className="mt-1 text-sm text-faint">{p.stack.join(", ")}</p>
          </div>
        ))}
      </div>

      <Heading>Skills</Heading>
      <dl className="space-y-2 text-small">
        {skills.map((s) => (
          <div key={s.label} className="sm:flex sm:gap-4">
            <dt className="shrink-0 font-medium sm:w-28">{s.label}</dt>
            <dd className="text-muted">{s.items}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
