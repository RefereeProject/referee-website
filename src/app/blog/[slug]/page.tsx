import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { findPostBySlug, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug || p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) return { title: "Post" };
  return { title: post.title || slug, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) return notFound();
  const safe = sanitizeHtml(post.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      a: ["href", "name", "target", "rel"],
      '*': ["style", "class"],
    },
  });

  return (
    <div className="py-8 lg:py-12">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200 group"
        >
          <svg className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>

        {post.date && (
          <div className="mt-6 flex items-center justify-center text-neutral-600">
            <time dateTime={post.date} className="text-sm font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto">
        <div 
          className="prose prose-lg prose-neutral prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-code:text-sm prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:pl-6 prose-blockquote:py-1 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: safe }} 
        />
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
