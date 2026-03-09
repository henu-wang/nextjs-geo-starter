/**
 * Reusable JSON-LD Structured Data Components
 *
 * Drop these into any page or layout to emit schema.org structured data
 * that AI engines and traditional search engines both consume.
 *
 * Usage:
 *   import { OrganizationJsonLd, ArticleJsonLd } from "@/components/JsonLd";
 *   <OrganizationJsonLd />
 *   <ArticleJsonLd title="My Post" ... />
 */

import { SITE_CONFIG } from "@/lib/geo-config";

// ---------------------------------------------------------------------------
// Helper — renders a <script type="application/ld+json"> tag
// ---------------------------------------------------------------------------

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: SITE_CONFIG.logo,
        description: SITE_CONFIG.description,
        sameAs: SITE_CONFIG.socialLinks,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Article
// ---------------------------------------------------------------------------

interface ArticleProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = SITE_CONFIG.name,
  image,
}: ArticleProps) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: { "@type": "Person", name: authorName },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          logo: { "@type": "ImageObject", url: SITE_CONFIG.logo },
        },
        ...(image ? { image } : {}),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// WebApplication
// ---------------------------------------------------------------------------

interface WebAppProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}

export function WebApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory = "Utility",
}: WebAppProps) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory,
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }}
    />
  );
}
