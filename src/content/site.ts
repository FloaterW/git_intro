// Values marked PLACEHOLDER are made up. See "Before publishing" in the README.

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  resumePdf: string | null;
  photo: string | null;
  graduation: string;
  location: string;
  availability: string;
  navLinks: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "Farad Wahab",
  tagline: "I build full-stack web apps and data tools.",
  description:
    "Farad Wahab is a computer science student at Oregon State University who builds full-stack web apps and data tools.",
  url: "https://faradwahab.com", // PLACEHOLDER: your real domain once deployed
  email: "wahabf@oregonstate.edu", // swap for a personal address before graduating
  github: "https://github.com/floaterw",
  linkedin: "https://linkedin.com/in/faradwahab", // PLACEHOLDER
  resumePdf: "/resume.pdf", // PLACEHOLDER: sample PDF
  photo: "/images/photo-placeholder.svg", // PLACEHOLDER
  graduation: "December 2026", // PLACEHOLDER
  location: "Corvallis, OR", // PLACEHOLDER
  availability: "Open to relocating or remote", // PLACEHOLDER
  navLinks: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "#contact" },
  ],
};
