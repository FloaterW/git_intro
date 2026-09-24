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

      {siteConfig.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={siteConfig.photo}
          alt="Farad Wahab"
          className="mt-8 h-40 w-40 rounded-md object-cover"
        />
      )}

      <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          I&apos;m Farad. I study computer science at Oregon State and graduate in{" "}
          {siteConfig.gradYear}. I&apos;m looking for my first full-time job as a software
          engineer.
        </p>
        <p>
          Most of my projects are full-stack web apps: a React frontend, a backend in Node, Java or
          Python, and PostgreSQL underneath. I&apos;ve also done a fair amount of data work, which
          mostly means taking messy public datasets and turning them into maps and charts people
          can actually read.
        </p>
        <p>
          The projects I learned the most from were the ones where the hard part wasn&apos;t the
          interface. Making sure the <Link href="/projects/banking-app" className="text-link">banking
          app</Link> never loses money, or getting the{" "}
          <Link href="/projects/chess-engine" className="text-link">chess engine</Link> fast enough to
          look more than a few moves ahead, taught me more than another CRUD app would have.
        </p>
        {/* Add a line or two about you outside of code: what you're into, where you're from, etc. */}
      </div>

      <h2 className="mt-14 font-serif text-xl font-semibold">School</h2>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">
        B.S. in Computer Science, Oregon State University, {siteConfig.gradYear}
      </p>
    </>
  );
}
