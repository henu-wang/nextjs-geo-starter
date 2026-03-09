/**
 * Home Page
 *
 * A minimal landing page demonstrating GEO components in action.
 */

import { FAQJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/geo-config";

const faqs = [
  {
    question: "What is GEO?",
    answer:
      "GEO (Generative Engine Optimization) is the practice of optimizing your website so that AI-powered search engines and large language models can accurately discover, understand, and cite your content.",
  },
  {
    question: "How does this starter help?",
    answer:
      "It provides pre-configured robots.txt with AI crawler rules, an llms.txt endpoint, JSON-LD structured data components, and AI crawler detection middleware — all ready to use out of the box.",
  },
  {
    question: "How do I verify my GEO setup?",
    answer:
      "Deploy your site and scan it at https://geoscoreai.com to get a detailed report on all GEO signals.",
  },
];

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <WebApplicationJsonLd
        name={SITE_CONFIG.name}
        description={SITE_CONFIG.description}
        url={SITE_CONFIG.url}
        applicationCategory="DeveloperApplication"
      />
      <FAQJsonLd items={faqs} />

      <h1>Next.js GEO Starter</h1>
      <p>
        This template includes everything you need to make your Next.js site
        visible to AI search engines. Edit <code>lib/geo-config.ts</code> to
        customize.
      </p>

      <h2>Included GEO Signals</h2>
      <ul>
        <li>robots.txt with explicit AI crawler rules</li>
        <li>llms.txt endpoint at <code>/llms.txt</code></li>
        <li>JSON-LD structured data (Organization, Article, FAQ, WebApplication)</li>
        <li>AI crawler detection middleware with logging</li>
      </ul>

      <h2>FAQ</h2>
      {faqs.map((faq) => (
        <details key={faq.question} style={{ marginBottom: "1rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>
            {faq.question}
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}

      <hr style={{ margin: "2rem 0" }} />
      <p>
        Verify your GEO setup at{" "}
        <a href="https://geoscoreai.com" target="_blank" rel="noopener">
          GEOScore AI
        </a>
      </p>
    </main>
  );
}
