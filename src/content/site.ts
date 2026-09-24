export const siteConfig = {
  name: "Farad Wahab",
  description:
    "Farad Wahab is a computer science student at Oregon State University who builds full-stack web apps and data tools.",
  // Change this if you deploy somewhere else. It's used for the sitemap and link previews.
  url: "https://faradwahab.com",
  // Your OSU address will probably stop working after graduation. Swap in a personal one.
  email: "wahabf@oregonstate.edu",
  github: "https://github.com/floaterw",
  // Double-check this is your real LinkedIn URL.
  linkedin: "https://linkedin.com/in/faradwahab",
  // Drop resume.pdf into /public and set this to true.
  resumePdf: false,
  // Drop a photo into /public (e.g. /me.jpg) and put its path here.
  photo: null as string | null,
  gradYear: "2026",
  navLinks: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "#contact" },
  ],
};
