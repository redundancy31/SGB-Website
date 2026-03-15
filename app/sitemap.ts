import type { MetadataRoute } from "next";

const base = "https://www.sgbengineering.sg";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/certifications",
    "/safety-quality",
    "/contact",
    "/privacy-policy",
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
