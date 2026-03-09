# Next.js GEO Starter

A production-ready Next.js starter template with built-in **GEO (Generative Engine Optimization)** — everything you need to make your site discoverable by AI-powered search engines like ChatGPT, Perplexity, Google AI Overviews, and more.

## Why GEO Matters

Traditional SEO optimizes for Google's link-based index. GEO goes further: it ensures AI crawlers can **access, understand, and accurately cite** your content. As AI-generated answers replace traditional search results, sites without proper GEO signals risk becoming invisible.

This starter gives you a head start with zero configuration.

## What's Included

- **robots.txt with AI Crawler Rules** — Explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and 8 other AI crawlers. Managed from a single config file.
- **llms.txt API Route** — Serves a machine-readable summary of your site at `/llms.txt`, following the [llms.txt specification](https://llmstxt.org). Helps LLMs understand your site's purpose and structure.
- **JSON-LD Structured Data Components** — Drop-in React components for Organization, Article, FAQ, and WebApplication schemas. Renders `<script type="application/ld+json">` tags that both traditional and AI search engines consume.
- **AI Crawler Detection Middleware** — Identifies AI bot visits in real time, tags responses with an `X-AI-Crawler` header, and logs crawler activity for monitoring.
- **Central GEO Configuration** — One file (`lib/geo-config.ts`) controls the crawler list, site metadata, structured data defaults, and llms.txt content.

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/henu-wang/nextjs-geo-starter.git
cd nextjs-geo-starter

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the starter in action. Visit [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt) and [http://localhost:3000/llms.txt](http://localhost:3000/llms.txt) to inspect the generated GEO files.

## File Structure

```
nextjs-geo-starter/
├── app/
│   ├── layout.tsx            # Root layout with Organization JSON-LD
│   ├── page.tsx              # Home page with FAQ + WebApp JSON-LD
│   ├── robots.ts             # robots.txt with AI crawler rules
│   └── llms.txt/
│       └── route.ts          # /llms.txt API route
├── components/
│   └── JsonLd.tsx            # Reusable JSON-LD components
├── lib/
│   └── geo-config.ts         # Central GEO configuration
├── middleware.ts              # AI crawler detection middleware
├── package.json
└── tsconfig.json
```

## Customization Guide

### 1. Update Site Information

Open `lib/geo-config.ts` and edit the `SITE_CONFIG` object:

```typescript
export const SITE_CONFIG = {
  url: "https://yoursite.com",
  name: "Your Site Name",
  description: "Your site description.",
  logo: "https://yoursite.com/logo.png",
  language: "en",
  socialLinks: ["https://x.com/you", "https://github.com/you"],
};
```

This single change updates your robots.txt, llms.txt, JSON-LD, and metadata across the entire site.

### 2. Edit llms.txt Content

In the same file, modify the `getLlmsTxtContent()` function to describe your site's sections, key facts, and contact information.

### 3. Add JSON-LD to Any Page

```tsx
import { ArticleJsonLd, FAQJsonLd } from "@/components/JsonLd";

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        title="How to Optimize for AI Search"
        description="A guide to GEO best practices."
        url="https://yoursite.com/blog/geo-guide"
        datePublished="2026-01-15"
        authorName="Jane Doe"
      />
      <article>
        <h1>How to Optimize for AI Search</h1>
        {/* ... */}
      </article>
    </>
  );
}
```

### 4. Manage AI Crawlers

Add or remove crawlers in the `AI_CRAWLERS` array in `lib/geo-config.ts`. The robots.txt and middleware automatically pick up changes.

### 5. Block Specific Paths from AI Crawlers

Uncomment the `disallow` line in `app/robots.ts` and list paths you want to hide:

```typescript
disallow: ["/admin", "/api/internal"],
```

## Verify Your Setup

After deploying your site, scan it at **[GEOScore AI](https://geoscoreai.com)** to get a detailed report covering:

- robots.txt AI crawler configuration
- llms.txt presence and content quality
- JSON-LD structured data validation
- Overall GEO readiness score

Use the [GEO Tools](https://geoscoreai.com/tools) page for individual signal checks — robots.txt analyzer, llms.txt validator, and structured data inspector.

## Supported AI Crawlers

| Crawler | Operator | Purpose |
|---------|----------|---------|
| GPTBot | OpenAI | Training & search |
| ChatGPT-User | OpenAI | Real-time browsing |
| OAI-SearchBot | OpenAI | SearchGPT |
| Google-Extended | Google | AI Overviews |
| ClaudeBot | Anthropic | Training & search |
| PerplexityBot | Perplexity | AI search |
| Bytespider | ByteDance | Training |
| Applebot-Extended | Apple | Apple Intelligence |
| Meta-ExternalAgent | Meta | Meta AI |
| cohere-ai | Cohere | Training |

## Learn More

- [GEOScore AI](https://geoscoreai.com) — Scan and score your site's GEO readiness
- [llms.txt Specification](https://llmstxt.org) — The proposed standard for LLM-readable site descriptions
- [Next.js Documentation](https://nextjs.org/docs) — Framework documentation
- [Schema.org](https://schema.org) — Structured data vocabulary

## License

MIT License. See [LICENSE](LICENSE) for details.
