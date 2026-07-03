export const siteConfig = {
  name: "Farad Wahab",
  title: "Farad Wahab — Software Engineer",
  description:
    "Final-year computer science student at Oregon State University building full-stack applications, data tools, and practical interfaces.",
  url: "https://faradwahab.com", // TODO: Update with actual domain once deployed
  email: "wahabf@oregonstate.edu",
  github: "https://github.com/floaterw",
  linkedin: "https://linkedin.com/in/faradwahab", // TODO: Confirm LinkedIn URL
  resumeUrl: "/resume.pdf",
  location: "Oregon",
  university: "Oregon State University",
  degree: "Computer Science",
  gradYear: "2026",
  navLinks: [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
