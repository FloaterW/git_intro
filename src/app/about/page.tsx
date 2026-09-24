import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about Farad Wahab, a computer science student at Oregon State.",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">About me</h1>

      <div className="mt-8 sm:flex sm:gap-8">
        {siteConfig.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={siteConfig.photo}
            alt="Farad Wahab"
            className="mb-6 h-36 w-36 shrink-0 rounded-md border border-line object-cover sm:mb-0"
          />
        )}
        <div className="space-y-4 text-[17px] leading-relaxed text-muted">
          <p>
            I&apos;m Farad. I study computer science at Oregon State and graduate in{" "}
            {siteConfig.graduation}. I&apos;m looking for my first full-time job as a software
            engineer.
          </p>
          <p>
            Most of my projects are full-stack web apps: a React frontend, a backend in Node, Java or
            Python, and PostgreSQL underneath. I&apos;ve also done a fair amount of data work, which
            mostly means taking messy public datasets and turning them into maps and charts people
            can actually read.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          The projects I learned the most from were the ones where the hard part wasn&apos;t the
          interface. Tracking down why the{" "}
          <Link href="/projects/banking-app" className="text-link">
            banking app
          </Link>{" "}
          lost money under load, or getting the{" "}
          <Link href="/projects/chess-engine" className="text-link">
            chess engine
          </Link>{" "}
          fast enough to look six moves ahead, taught me more than another CRUD app would have.
        </p>
        {/* PLACEHOLDER: this paragraph is made up. Replace it with something true about you. */}
        <p>
          Outside of code I play pickup soccer most weekends, cook more than I probably should
          during finals week, and I&apos;m slowly working my way through every trail within an
          hour of Corvallis.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-xl font-semibold">What I&apos;m looking for</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">
        {/* PLACEHOLDER: adjust to the roles you actually want */}
        A backend or full-stack role on a team that ships often and reviews each other&apos;s code.
        I&apos;m especially interested in work involving data pipelines or anything where getting
        the data model right matters. {siteConfig.availability}.
      </p>

      <h2 className="mt-14 font-serif text-xl font-semibold">School</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">
        B.S. in Computer Science, Oregon State University, {siteConfig.graduation}
      </p>
    </>
  );
}
