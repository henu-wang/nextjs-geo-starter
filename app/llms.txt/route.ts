/**
 * /llms.txt API Route
 *
 * Serves a plain-text file that helps large language models understand
 * your site's purpose, structure, and key content. The content is
 * defined centrally in `lib/geo-config.ts`.
 *
 * Specification: https://llmstxt.org
 *
 * This route is static by default (generated at build time). If you
 * need dynamic content, remove the `force-static` directive below.
 */

import { getLlmsTxtContent } from "@/lib/geo-config";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const content = getLlmsTxtContent();

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
