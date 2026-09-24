import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { siteConfig } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        background: "#fbfaf7",
        borderBottom: "14px solid #2f5a9e",
        color: "#1f1d1a",
      }}
    >
      <div style={{ fontSize: 30, color: "#57524b" }}>{`${siteConfig.name} · Projects`}</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>{project.title}</div>
      <div style={{ fontSize: 34, color: "#57524b", marginTop: 20, lineHeight: 1.35 }}>
        {project.summary}
      </div>
      <div style={{ fontSize: 26, color: "#736d64", marginTop: 36 }}>
        {project.stack.join(" · ")}
      </div>
    </div>,
    size,
  );
}
