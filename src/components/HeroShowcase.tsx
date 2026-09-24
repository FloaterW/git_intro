import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

// Back to front. Each card fans out a little further on hover.
const layers = [
  "top-0 right-0 rotate-6 group-hover:translate-x-6 group-hover:rotate-9",
  "top-16 right-10 rotate-1 group-hover:translate-x-1 group-hover:rotate-2",
  "top-32 right-20 -rotate-4 group-hover:-translate-x-5 group-hover:-rotate-7",
];

export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const stack = projects.slice(0, 3).reverse();
  return (
    <Link
      href="/projects"
      aria-label="See all projects"
      className="group relative hidden h-[380px] motion-safe:animate-rise motion-safe:[animation-delay:250ms] lg:block"
    >
      {stack.map((p, i) => (
        <Image
          key={p.slug}
          src={p.image}
          alt=""
          width={1600}
          height={1000}
          sizes="380px"
          loading="eager"
          fetchPriority={i === stack.length - 1 ? "high" : undefined}
          className={`absolute aspect-16/10 w-[82%] rounded-lg border border-line object-cover object-top shadow-xl shadow-black/10 transition-transform duration-500 ease-out motion-reduce:transition-none dark:brightness-90 ${layers[i]}`}
        />
      ))}
    </Link>
  );
}
