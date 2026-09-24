// Values marked PLACEHOLDER are made up. See "Before publishing" in the README.

export interface Education {
  school: string;
  degree: string;
  graduation: string;
  location: string;
  gpa: string | null;
  coursework: string[];
}

export interface Job {
  title: string;
  org: string;
  dates: string;
  points: string[];
}

export const education: Education = {
  school: "Oregon State University",
  degree: "B.S. in Computer Science",
  graduation: "Expected June 2028", // PLACEHOLDER
  location: "Corvallis, OR",
  gpa: "3.6", // PLACEHOLDER: set to null to hide
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Databases",
    "Software Engineering",
  ],
};

// Leave empty to hide the Experience sections.
export const experience: Job[] = [
  {
    // PLACEHOLDER: whole entry
    title: "Software Engineering Intern",
    org: "Willamette Data Co.",
    dates: "Summer 2025",
    points: [
      "Built an internal React dashboard that replaced a weekly spreadsheet report, saving the operations team about 4 hours a week.",
      "Moved 3 nightly data jobs from cron scripts to a Python pipeline with retries and alerts; failed runs went from about one a week to none.",
    ],
  },
  {
    // PLACEHOLDER: whole entry
    title: "Teaching Assistant, Data Structures",
    org: "Oregon State University",
    dates: "2024 – 2025",
    points: [
      "Ran weekly lab sections of about 30 students and held office hours.",
      "Wrote autograder tests for two of the course's programming assignments.",
    ],
  },
];

export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, Java, TypeScript, C++, SQL" },
  { label: "Frameworks", items: "React, Next.js, Node.js, Spring Boot, FastAPI" },
  { label: "Data", items: "PostgreSQL, PostGIS, Pandas, Plotly" },
  { label: "Tools", items: "Git, Docker, AWS (S3, EC2), Linux" },
];
