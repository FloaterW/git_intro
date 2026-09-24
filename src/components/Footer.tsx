import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-line py-10 text-[15px] text-muted">
      <p>
        The best way to reach me is email:{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-link">
          {siteConfig.email}
        </a>
      </p>
      <p className="mt-2">
        I&apos;m also on{" "}
        <a href={siteConfig.github} className="text-link" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        and{" "}
        <a href={siteConfig.linkedin} className="text-link" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </footer>
  );
}
