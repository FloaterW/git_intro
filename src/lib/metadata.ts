import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image.png",
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title ?? siteConfig.tagline }],
    },
  };
}
