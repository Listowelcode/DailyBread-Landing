import type { MetadataRoute } from "next";

// ⚠️ ASSUMPTION: replace with your real production domain.
const SITE_URL = "https://dailybread.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/#rhythm`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Note: /profile and /auth/verify are private, per-subscriber magic-link
    // pages with no stable indexable content, so they're intentionally
    // excluded from the sitemap.
  ];
}
