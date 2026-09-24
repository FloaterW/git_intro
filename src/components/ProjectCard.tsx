import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({
  project: p,
  headingLevel: Heading = "h3",
  wide = false,
  eager = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  wide?: boolean;
  eager?: boolean;
}) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-black/5 motion-safe:hover:-translate-y-1 ${
        wide ? "md:grid md:grid-cols-[1.35fr_1fr]" : ""
      }`}
    >
      <div
        className={`overflow-hidden border-line ${wide ? "border-b md:border-r md:border-b-0" : "border-b"}`}
      >
        <Image
          src={p.image}
          alt=""
          width={1600}
          height={1000}
          sizes={
            wide
              ? "(min-width: 1024px) 560px, 100vw"
              : "(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
          }
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="aspect-16/10 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none dark:brightness-90"
        />
      </div>
      <div className={`flex flex-1 flex-col ${wide ? "p-6 md:justify-center" : "p-5"}`}>
        <div className="flex items-baseline justify-between gap-3">
          <Heading
            className={`font-medium transition-colors duration-150 group-hover:text-accent ${wide ? "font-serif text-2xl" : "text-lg"}`}
          >
            {p.title}
          </Heading>
          <span className="shrink-0 text-sm text-faint tabular-nums">{p.year}</span>
        </div>
        <p className="mt-2 text-small text-muted">{p.summary}</p>
        {p.highlight && (
          <p className="mt-3 flex gap-2 text-sm font-medium text-ink">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {p.highlight}
          </p>
        )}
        {p.demo && (
          <p className="mt-3 w-fit rounded-full border border-accent/40 px-2.5 py-0.5 text-xs font-medium text-accent">
            Interactive demo inside
          </p>
        )}
        <p className={`pt-4 text-sm text-faint ${wide ? "" : "mt-auto"}`}>{p.stack.join(" · ")}</p>
        {wide && (
          <p className="mt-4 text-small font-medium text-ink">
            Read the write-up{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
