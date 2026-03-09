/**
 * Central GEO (Generative Engine Optimization) Configuration
 *
 * This file defines all AI crawler user-agents, structured data defaults,
 * and llms.txt content. Edit this single file to customize GEO behavior
 * across your entire application.
 */

// ---------------------------------------------------------------------------
// AI Crawler Definitions
// ---------------------------------------------------------------------------

export interface AICrawler {
  /** User-agent token used in robots.txt rules */
  userAgent: string;
  /** Human-readable name of the crawler / AI system */
  name: string;
  /** The company or product that operates this crawler */
  operator: string;
}

/**
 * Known AI crawlers as of early 2026.
 * Add or remove entries here; robots.ts and middleware.ts read from this list.
 */
export const AI_CRAWLERS: AICrawler[] = [
  { userAgent: "GPTBot", name: "GPTBot", operator: "OpenAI" },
  { userAgent: "ChatGPT-User", name: "ChatGPT-User", operator: "OpenAI" },
  { userAgent: "OAI-SearchBot", name: "OAI-SearchBot", operator: "OpenAI" },
  { userAgent: "Google-Extended", name: "Google-Extended", operator: "Google" },
  { userAgent: "Googlebot", name: "Googlebot", operator: "Google" },
  { userAgent: "anthropic-ai", name: "ClaudeBot", operator: "Anthropic" },
  { userAgent: "ClaudeBot", name: "ClaudeBot", operator: "Anthropic" },
  { userAgent: "Bytespider", name: "Bytespider", operator: "ByteDance" },
  { userAgent: "PerplexityBot", name: "PerplexityBot", operator: "Perplexity" },
  { userAgent: "Applebot-Extended", name: "Applebot-Extended", operator: "Apple" },
  { userAgent: "cohere-ai", name: "Cohere", operator: "Cohere" },
  { userAgent: "Meta-ExternalAgent", name: "Meta-ExternalAgent", operator: "Meta" },
];

/**
 * User-agent substrings used by middleware to detect AI crawlers at runtime.
 * Kept lowercase for case-insensitive matching.
 */
export const AI_CRAWLER_PATTERNS: string[] = AI_CRAWLERS.map((c) =>
  c.userAgent.toLowerCase()
);

// ---------------------------------------------------------------------------
// Structured Data Defaults (JSON-LD)
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  /** Canonical origin — no trailing slash */
  url: "https://example.com",
  name: "My GEO-Optimized Site",
  description: "A Next.js site built with GEO best practices.",
  logo: "https://example.com/logo.png",
  language: "en",
  /** Social / same-as links shown in Organization schema */
  socialLinks: [
    "https://x.com/yourhandle",
    "https://github.com/yourhandle",
  ],
};

// ---------------------------------------------------------------------------
// llms.txt Content
// ---------------------------------------------------------------------------

/**
 * Returns the plain-text content served at /llms.txt.
 * Follows the llms.txt proposed specification (https://llmstxt.org).
 */
export function getLlmsTxtContent(): string {
  return `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About

${SITE_CONFIG.name} is a web application built with Next.js. This file
provides concise, machine-readable context so that large language models
can better understand and represent this site.

## Main Sections

- [Home](${SITE_CONFIG.url}/)
- [Blog](${SITE_CONFIG.url}/blog)
- [Docs](${SITE_CONFIG.url}/docs)

## Key Facts

- Built with Next.js and React
- Follows GEO (Generative Engine Optimization) best practices
- Structured data provided via JSON-LD on every page

## Contact

- Website: ${SITE_CONFIG.url}
`;
}
