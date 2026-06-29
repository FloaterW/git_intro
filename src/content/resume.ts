export const resumeData = {
  education: {
    school: "Oregon State University",
    degree: "Bachelor of Science in Computer Science",
    expected: "2026", // TODO: Confirm graduation date
    location: "Corvallis, OR",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Databases",
      "Software Engineering",
      "Computer Networks",
      "Web Development",
    ], // TODO: Update with actual relevant coursework
  },
  experience: [
    // TODO: Add work experience entries
    // {
    //   title: "Software Engineering Intern",
    //   company: "Company Name",
    //   period: "Summer 2025",
    //   location: "City, State",
    //   highlights: [
    //     "Description of work and impact",
    //   ],
    // },
  ] as {
    title: string;
    company: string;
    period: string;
    location: string;
    highlights: string[];
  }[],
  // TODO: Add resume.pdf to /public directory
  resumeAvailable: false,
};
