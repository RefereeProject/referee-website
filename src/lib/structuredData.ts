import type { WPEntry } from "@/lib/content";

type StructuredDataObject = Record<string, unknown>;

export const CANONICAL_SITE_NAME = "Referee";

type OrganizationInput = {
  name: string;
  description?: string;
  siteUrl?: string;
  logoPath?: string;
};

type ArticleInput = {
  post: WPEntry;
  siteName: string;
  siteUrl?: string;
};

type FAQInput = {
  siteUrl?: string;
  faqs: Array<{ question: string; answer: string }>;
};

function normalizeText(value?: string): string | undefined {
  if (!value) return undefined;
  const stripped = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return stripped.length > 0 ? stripped : undefined;
}

function normalizeBaseUrl(siteUrl?: string): string | undefined {
  if (!siteUrl) return undefined;
  try {
    const normalized = new URL(siteUrl);
    return normalized.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeDate(value?: string): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) {
    return match[1];
  }

  return undefined;
}

export function serializeJsonLd(data: StructuredDataObject): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function buildOrganizationSchema(input: OrganizationInput): StructuredDataObject {
  const siteUrl = normalizeBaseUrl(input.siteUrl);
  const description = normalizeText(input.description);
  const schema: StructuredDataObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: normalizeText(input.name) ?? CANONICAL_SITE_NAME,
  };

  if (description) {
    schema.description = description;
  }

  if (siteUrl) {
    schema["@id"] = `${siteUrl}#organization`;
    schema.url = siteUrl;

    if (input.logoPath) {
      schema.logo = joinUrl(siteUrl, input.logoPath);
    }
  }

  return schema;
}

export function buildArticleSchema(input: ArticleInput): StructuredDataObject {
  const siteUrl = normalizeBaseUrl(input.siteUrl);
  const slugOrId = input.post.slug || input.post.id;
  const articleUrl = siteUrl ? joinUrl(siteUrl, `/blog/${slugOrId}`) : undefined;
  const headline = normalizeText(input.post.title) ?? slugOrId;
  const description = normalizeText(input.post.excerpt);
  const datePublished = normalizeDate(input.post.date);

  const organization: StructuredDataObject = {
    "@type": "Organization",
    name: normalizeText(input.siteName) ?? CANONICAL_SITE_NAME,
  };

  if (siteUrl) {
    organization.url = siteUrl;
  }

  const schema: StructuredDataObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    author: organization,
    publisher: organization,
  };

  if (articleUrl) {
    schema["@id"] = `${articleUrl}#article`;
    schema.url = articleUrl;
    schema.mainEntityOfPage = articleUrl;
  }

  if (description) {
    schema.description = description;
  }

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  return schema;
}

export function buildFaqPageSchema(input: FAQInput): StructuredDataObject {
  const siteUrl = normalizeBaseUrl(input.siteUrl);

  const mainEntity = input.faqs
    .map((faq) => ({
      question: normalizeText(faq.question),
      answer: normalizeText(faq.answer),
    }))
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

  const schema: StructuredDataObject = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  if (siteUrl) {
    schema["@id"] = `${siteUrl}/faq#faq`;
    schema.url = `${siteUrl}/faq`;
  }

  return schema;
}
