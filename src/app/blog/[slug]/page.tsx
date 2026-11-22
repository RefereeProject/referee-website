import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { findPostBySlug, getPosts, getSite } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import { SOCIAL_IMAGE } from "@/lib/brand";
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

  const title = post.title || slug;
  return {
    title,
    description: post.excerpt,
    // Without this, a post inherits the root layout's Open Graph object and
    // is announced to link previews as type "website". Setting openGraph
    // here replaces the root object entirely (Next.js merges metadata
    // shallowly), so the site name and the shared preview image are passed
    // again. The Twitter card is a separate key and is still inherited.
    openGraph: {
      type: "article",
      siteName: "Referee",
      title,
      description: post.excerpt,
      images: [SOCIAL_IMAGE],
    },
  };
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
      {/* Slim strip between the site header and the title band. It sits in
          the same `.article` column as the title and body below, so all
          three share one left edge. The negative margin cancels the ghost
          button's side padding, so its label lines up with that edge while
          keeping a full-size hover target. */}
      <div className="container py-2">
        <div className="article">
          <Link href="/blog" className="btn btn-ghost btn-sm -ml-3.5">
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* PageIntro is a navy band, so the date uses `.meta`: it takes its
          colour from the role tokens, which turn pale blue on navy. A fixed
          dark text utility would be unreadable there. */}
      <PageIntro
        eyebrow="Blog"
        title={post.title || ""}
        description={post.excerpt || undefined}
        width="article"
      >
        {post.date ? (
          <time dateTime={post.date} className="meta">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
      </PageIntro>

      <div className="container page-shell">
        {/* The text sits straight on the paper background, in the `.article`
            reading column. `max-w-none` drops the typography plugin's own
            65ch cap so that column sets the line length. `wrap-break-word`
            lets a long unbroken string (a pasted URL, say) wrap on a phone
            instead of widening the page; code blocks and tables are not
            affected and scroll sideways inside the column. */}
        <article className="article">
          <div
            className="prose prose-lg prose-referee max-w-none wrap-break-word"
            dangerouslySetInnerHTML={{ __html: safe }}
          />
        </article>

        <section className="cta-block mx-auto mt-12 max-w-4xl sm:mt-16">
          <p className="eyebrow"><span className="eyebrow-tick" />More from the record</p>
          <h2>More from the blog</h2>
          <p>Continue reading essays on reliability metadata, research integrity, and transparent peer review.</p>
          <div className="cta-actions">
            <Link href="/blog" className="btn btn-primary">Back to all posts <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </section>
      </div>
    </>
  );
}
