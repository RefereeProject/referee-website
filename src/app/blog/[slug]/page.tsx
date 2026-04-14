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
      <div className="py-6 md:py-10">
      {/* Back navigation */}
      <div className="mb-6">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors duration-200 text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Page intro with aurora treatment */}
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

      {/* Article content */}
      <article className="mt-12 md:mt-16 max-w-4xl mx-auto">
        <div className="rounded-xl border border-border bg-card-bg p-6 sm:p-8 md:p-10">
          <div
            className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:leading-relaxed prose-p:text-foreground-secondary prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-sm prose-code:bg-background-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50/50 prose-blockquote:pl-6 prose-blockquote:py-1 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: safe }}
          />
        </div>
      </article>

      {/* Footer CTA */}
      <section className="mt-12 md:mt-16 mb-8 rounded-xl border border-border bg-primary-50/50 p-6 sm:p-8 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">More from the blog</h2>
        <div className="mt-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold min-h-[48px]"
          >
            Back to all posts
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
