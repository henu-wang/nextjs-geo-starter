/**
 * AI Crawler Detection & Logging Middleware
 *
 * Runs on every request. When the visitor is an AI crawler it:
 *   1. Adds an `X-AI-Crawler` response header with the bot name.
 *   2. Logs the visit so you can monitor AI traffic.
 *   3. Optionally serves a different response (e.g. a simplified page).
 *
 * The crawler list is maintained in `lib/geo-config.ts`.
 */

import { NextRequest, NextResponse } from "next/server";
import { AI_CRAWLER_PATTERNS, AI_CRAWLERS } from "@/lib/geo-config";

/**
 * Detect which AI crawler (if any) is making the request.
 * Returns the matching crawler's user-agent token, or null.
 */
function detectAICrawler(userAgent: string): string | null {
  const ua = userAgent.toLowerCase();
  for (let i = 0; i < AI_CRAWLER_PATTERNS.length; i++) {
    if (ua.includes(AI_CRAWLER_PATTERNS[i])) {
      return AI_CRAWLERS[i].userAgent;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = detectAICrawler(userAgent);

  // Clone the response so we can add headers
  const response = NextResponse.next();

  if (crawler) {
    // Tag the response so downstream logic or analytics can identify AI visits
    response.headers.set("X-AI-Crawler", crawler);

    // Log AI crawler visits (replace with your analytics service in production)
    console.log(
      JSON.stringify({
        event: "ai_crawler_visit",
        crawler,
        path: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
      })
    );
  }

  return response;
}

/**
 * Match all routes except static assets and Next.js internals.
 * Adjust the matcher if you want to narrow the scope.
 */
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico   (favicon)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
