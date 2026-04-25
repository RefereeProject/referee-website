import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { findPostBySlug, getPosts, getSite } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import {
  buildArticleSchema,
  CANONICAL_SITE_NAME,
  serializeJsonLd,
} from "@/lib/structuredData";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug || p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlug(slug);
  if (!post) return { title: "Post" };
  return { title: post.title || slug, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await findPostBySlug(slug);
  if (!post) return notFound();

  const site = await getSite();
  const articleJsonLd = serializeJsonLd(
    buildArticleSchema({
      post,
      siteName: CANONICAL_SITE_NAME,
      siteUrl: site.link,
    }),
  );

  const safe = sanitizeHtml(post.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "class"],
      a: ["href", "name", "target", "rel", "class"],
      div: ["class"],
      span: ["class"],
      figure: ["class"],
      figcaption: ["class"],
      p: ["class"],
      pre: ["class"],
      code: ["class"],
    },
    /* Enforce rel=noopener noreferrer on all links for security */
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      }),
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <div className="container" style={{ paddingTop: 28 }}>
        <Link href="/blog" className="btn btn-secondary">
          ← Back to Blog
        </Link>
      </div>

      <PageIntro
        eyebrow="Blog"
        title={post.title || ""}
        description={post.excerpt || undefined}
      >
        {post.date ? (
          <time dateTime={post.date} className="text-sm text-foreground-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
      </PageIntro>

      <div className="container page-shell">
        <article className="content-card mx-auto max-w-4xl">
          <div
            className="prose prose-lg prose-referee max-w-none"
            dangerouslySetInnerHTML={{ __html: safe }}
          />
        </article>

        <section className="cta-block mx-auto max-w-4xl" style={{ marginTop: 48 }}>
          <p className="eyebrow"><span className="eyebrow-tick" style={{ background: "rgba(255,255,255,.4)" }} />More from the record</p>
          <h2>More from the blog</h2>
          <p>Continue reading essays on reliability metadata, research integrity, and transparent peer review.</p>
          <div style={{ marginTop: 28 }}>
            <Link href="/blog" className="btn btn-primary">Back to all posts <span className="arrow">→</span></Link>
          </div>
        </section>
      </div>
    </>
  );
}
