import { siteConfig } from "@/content/site";
import CopyEmail from "@/components/CopyEmail";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-line pt-10 pb-8 print:hidden">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading-2">Get in touch</h2>
          <p className="mt-2 max-w-md text-small text-muted">
            I&apos;m looking for {siteConfig.lookingFor}. Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-3 inline-block font-serif text-xl break-all text-ink underline decoration-accent decoration-1 underline-offset-4 transition-colors duration-150 hover:text-accent sm:text-2xl"
          >
            {siteConfig.email}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyEmail email={siteConfig.email} />
          <SocialLinks />
        </div>
      </div>
      <p className="mt-10 text-sm text-faint">
        © {siteConfig.name}. Built with Next.js and Tailwind CSS.{" "}
        <a
          href={siteConfig.sourceRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-3 transition-colors duration-150 hover:text-accent"
        >
          View the source
        </a>
        .
      </p>
    </footer>
  );
}
