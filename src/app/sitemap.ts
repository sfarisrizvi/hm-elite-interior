import type { MetadataRoute } from "next";

const BASE_URL = "https://hmeliteinteriors.co.uk";

const serviceSlugs = [
  "kitchen",
  "bedroom",
  "media-wall",
  "decor-wall",
  "walk-in-wardrobe",
  "study-offices",
  "loft-wardrobe",
  "shoe-rack",
  "understairs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core static routes
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/why-choose-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Service detail routes
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...mainRoutes, ...serviceRoutes];
}
