// Anything marked PLACEHOLDER was made up. Replace it before publishing.

export const education = {
  school: "Oregon State University",
  degree: "B.S. in Computer Science",
  graduation: "December 2026", // PLACEHOLDER
  location: "Corvallis, OR",
  gpa: "3.6", // PLACEHOLDER: remove the line entirely if you'd rather not list it
  coursework: ["Data Structures", "Algorithms", "Operating Systems", "Databases", "Software Engineering"],
};

// Jobs, internships, TA work, research. Leave empty and the section is hidden.
export const experience: {
  title: string;
  org: string;
  dates: string;
  points: string[];
}[] = [
  {
    // PLACEHOLDER: whole entry
    title: "Software Engineering Intern",
    org: "Willamette Data Co.",
    dates: "Jun – Sep 2025",
    points: [
      "Built an internal React dashboard that replaced a weekly spreadsheet report for the operations team.",
      "Moved three nightly data jobs from cron scripts to a scheduled Python pipeline with retries and alerts.",
    ],
  },
  {
    // PLACEHOLDER: whole entry
    title: "Undergraduate Teaching Assistant, Data Structures",
    org: "Oregon State University",
    dates: "Sep 2024 – Jun 2025",
    points: [
      "Ran weekly lab sections of about 30 students and held office hours.",
      "Wrote autograder tests for two of the course's programming assignments.",
    ],
  },
];

// Keep this to things you could answer interview questions about.
export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, Java, TypeScript, C++, SQL" },
  { label: "Frameworks", items: "React, Next.js, Node.js, Spring Boot, FastAPI" },
  { label: "Data", items: "PostgreSQL, PostGIS, Pandas, Plotly" },
  { label: "Tools", items: "Git, Docker, AWS (S3, EC2), Linux" },
];
