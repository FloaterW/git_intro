import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getAllSlugs } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = ["", "/projects", "/about", "/resume"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectPages = getAllSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...projectPages];
}
