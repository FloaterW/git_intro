import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/about",
    "/resume",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
