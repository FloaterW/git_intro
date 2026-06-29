import type { SkillGroup as SkillGroupType } from "@/content/skills";

interface SkillGroupProps {
  group: SkillGroupType;
}

export default function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "var(--space-sm)",
        }}
      >
        {group.label}
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-xs)",
        }}
      >
        {group.skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-bg-alt)",
              padding: "0.25rem 0.625rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
