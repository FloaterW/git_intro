import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function HeroShowcase({ project }: { project: Project }) {
  const hero = project.heroImage ?? { src: project.image, caption: project.title };
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group hidden motion-safe:animate-rise motion-safe:[animation-delay:250ms] lg:block"
    >
      <Image
        src={hero.src}
        alt={`Screenshot of ${project.title}`}
        width={1600}
        height={1000}
        sizes="560px"
        loading="eager"
        fetchPriority="high"
        className="aspect-16/10 w-full rounded-lg border border-line object-cover object-top shadow-xl shadow-black/10 transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none dark:brightness-90"
      />
      <p className="mt-3 text-small text-muted transition-colors duration-150 group-hover:text-ink">
        {hero.caption} &rarr;
      </p>
    </Link>
  );
}
