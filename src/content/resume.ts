export const education = {
  school: "Oregon State University",
  degree: "B.S. in Computer Science",
  // Put your actual graduation term here, e.g. "June 2026".
  graduation: "2026",
  location: "Corvallis, OR",
  // Only list classes you'd be happy to talk about.
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Databases",
    "Software Engineering",
    "Computer Networks",
    "Web Development",
  ],
};

// Jobs, internships, TA work, research. Leave empty and the section is hidden.
export const experience: {
  title: string;
  org: string;
  dates: string;
  points: string[];
}[] = [];

// Keep this to things you could answer interview questions about.
export const skills: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, Java, TypeScript, JavaScript, C, C++, SQL" },
  { label: "Web", items: "React, Next.js, Angular, Node.js, Flask, FastAPI, Spring, Tailwind CSS" },
  { label: "Data", items: "Pandas, NumPy, Plotly, Matplotlib, Tableau, Power BI" },
  { label: "Databases", items: "PostgreSQL, PostGIS, MySQL, MongoDB, DynamoDB" },
  { label: "Infrastructure", items: "AWS, Docker, Kubernetes, Terraform, GitLab CI, Git" },
];
