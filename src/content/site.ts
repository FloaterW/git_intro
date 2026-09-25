// Values marked PLACEHOLDER are made up. See "Before publishing" in the README.

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  sourceRepo: string;
  resumePdf: string | null;
  photo: string | null;
  graduation: string;
  lookingFor: string;
  location: string;
  availability: string;
  currently: string | null;
  navLinks: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "Farad Wahab",
  // Draft headline. Alternatives if this doesn't sound like you:
  //   "I build full-stack apps and like the problems where being slightly wrong isn't OK."
  //   "Full-stack developer who likes concurrency bugs, messy data and fast search."
  tagline: "I build full-stack apps, and I care most about the parts that have to be right.",
  description:
    "Farad Wahab is a computer science student at Oregon State University who builds full-stack web apps and data tools.",
  url: "https://faradwahab.com", // PLACEHOLDER: your real domain once deployed
  email: "wahabf@oregonstate.edu", // swap for a personal address before graduating
  github: "https://github.com/floaterw",
  linkedin: "https://linkedin.com/in/faradwahab", // PLACEHOLDER
  sourceRepo: "https://github.com/floaterw/portfolio", // PLACEHOLDER: this site's repo
  resumePdf: "/resume.pdf", // PLACEHOLDER: sample PDF
  photo: "/images/photo-placeholder.svg", // PLACEHOLDER
  graduation: "June 2028", // PLACEHOLDER
  lookingFor: "a software engineering internship for summer 2027", // PLACEHOLDER
  location: "Corvallis, OR", // PLACEHOLDER
  availability: "Open to relocating or remote", // PLACEHOLDER
  currently: null, // Set to a short real line, e.g. what you are building this month, to show it
  navLinks: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "#contact" },
  ],
};
