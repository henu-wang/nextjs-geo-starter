/**
 * Next.js robots.txt Route Handler
 *
 * Generates a robots.txt that explicitly allows known AI crawlers.
 * The crawler list is driven by `lib/geo-config.ts` so you only
 * need to maintain it in one place.
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from "next";
import { AI_CRAWLERS, SITE_CONFIG } from "@/lib/geo-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_CONFIG.url;

  // Build per-crawler allow rules so each AI bot is explicitly permitted.
  const aiCrawlerRules = AI_CRAWLERS.map((crawler) => ({
    userAgent: crawler.userAgent,
    allow: "/",
    // Block paths you want to hide from AI (uncomment as needed):
    // disallow: ["/admin", "/api/internal"],
  }));

  return {
    rules: [
      // Default rule — allow everything for all bots
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/internal/"],
      },
      // Explicit AI crawler rules
      ...aiCrawlerRules,
    ],
    sitemap: `${siteUrl}/sitemap.xml`,

    // Optional: point bots to llms.txt (non-standard but increasingly adopted)
    // @ts-expect-error — Next.js types do not include `host` yet
    host: siteUrl,
  };
}
