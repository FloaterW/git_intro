import { siteConfig } from "@/content/site";
import ButtonLink from "@/components/ButtonLink";
import CopyEmail from "@/components/CopyEmail";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 scroll-mt-8 border-t border-line py-12">
      <h2 className="heading-2">Get in touch</h2>
      <p className="mt-2 max-w-xl prose-body">
        I&apos;m looking for a full-time software engineering role starting after{" "}
        {siteConfig.graduation}. Email is the fastest way to reach me:{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-link">
          {siteConfig.email}
        </a>
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
        <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
          Email me
        </ButtonLink>
        <CopyEmail email={siteConfig.email} />
        <SocialLinks />
      </div>
    </footer>
  );
}
