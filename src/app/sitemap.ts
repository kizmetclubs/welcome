import type { MetadataRoute } from "next";
import { CITY_SLUGS } from "@/content/pilot";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...CITY_SLUGS.map((city) => ({
      url: `${base}/${city}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
