import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: "A bit about Farad Wahab, a computer science student at Oregon State.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="heading-1">About me</h1>

      <div className="mt-8 sm:flex sm:gap-8">
        {siteConfig.photo && (
          <Image
            src={siteConfig.photo}
            alt="Farad Wahab"
            width={288}
            height={288}
            className="mb-6 size-36 shrink-0 rounded-lg border border-line object-cover sm:mb-0"
          />
        )}
        <div className="space-y-4 prose-body">
          <p>
            I&apos;m Farad. I study computer science at Oregon State (graduating{" "}
            {siteConfig.graduation}) and I&apos;m looking for {siteConfig.lookingFor}.
          </p>
          <p>
            Most of my projects are full-stack web apps: a React frontend, a backend in Node, Java
            or Python, and PostgreSQL underneath. A lot of them also involve public datasets that
            need serious cleaning before they&apos;re useful, like the county data behind the{" "}
            <Link href="/projects/housing-dashboard" className="text-link">
              housing dashboard
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4 prose-body">
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
        {/* PLACEHOLDER: replace with something true about you */}
        <p>
          Outside of code I play pickup soccer on weekends and hike around Corvallis. Marys Peak at
          sunset is my favorite so far.
        </p>
      </div>

      <h2 className="mt-14 heading-2">What I&apos;m looking for</h2>
      {/* PLACEHOLDER: adjust to the roles you actually want */}
      <p className="mt-3 prose-body">
        A backend or full-stack internship, ideally working with real data: pipelines, reporting, or
        systems where getting the data model wrong is expensive. {siteConfig.availability}.
      </p>

      <h2 className="mt-14 heading-2">School</h2>
      <p className="mt-3 prose-body">
        B.S. in Computer Science, Oregon State University, {siteConfig.graduation}
      </p>
    </div>
  );
}
