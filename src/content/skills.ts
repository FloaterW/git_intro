export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Flask", "FastAPI", "Spring", "Java", "Python", "C", "C++"],
  },
  {
    label: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Plotly", "Matplotlib", "Tableau", "Power BI", "SQL"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "PostGIS", "MongoDB", "MySQL", "DynamoDB"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GitLab CI", "Git"],
  },
  {
    label: "Tools",
    skills: ["VS Code", "Figma", "JIRA"],
  },
];
