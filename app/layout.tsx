/**
 * Root Layout
 *
 * Injects site-wide JSON-LD structured data (Organization schema) and
 * sets default metadata. Every page inherits this layout automatically.
 */

import type { Metadata } from "next";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/geo-config";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.language,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE_CONFIG.language}>
      <head>
        {/* Site-wide Organization structured data for AI and search engines */}
        <OrganizationJsonLd />

        {/* Point crawlers to llms.txt via a <link> tag */}
        <link rel="author" type="text/plain" href="/llms.txt" />
      </head>
      <body>{children}</body>
    </html>
  );
}
