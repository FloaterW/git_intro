// Anything marked PLACEHOLDER was made up. Replace it before publishing.

export const siteConfig = {
  name: "Farad Wahab",
  tagline: "I build full-stack web apps and data tools.",
  description:
    "Farad Wahab is a computer science student at Oregon State University who builds full-stack web apps and data tools.",
  // Change this if you deploy somewhere else. It's used for the sitemap and link previews.
  url: "https://faradwahab.com",
  // Your OSU address will probably stop working after graduation. Swap in a personal one.
  email: "wahabf@oregonstate.edu",
  github: "https://github.com/floaterw",
  linkedin: "https://linkedin.com/in/faradwahab", // PLACEHOLDER: confirm the URL
  resumePdf: "/resume.pdf", // PLACEHOLDER: public/resume.pdf is a generated sample. Set to null to hide.
  photo: "/images/photo-placeholder.svg" as string | null, // PLACEHOLDER: swap for a real photo, or null
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
