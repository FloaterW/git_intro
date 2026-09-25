import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

// Pages that set openGraph replace the root layout's, so the share image is passed explicitly.
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
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title ? `${title} by ${siteConfig.name}` : siteConfig.name}: ${description}`,
        },
      ],
    },
  };
}
