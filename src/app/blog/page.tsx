import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Blog — The Referee Project",
  description:
    "Insights and updates from The Referee Project — exploring the future of academic research evaluation.",
};

export const dynamic = "force-static";

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="py-6 md:py-10">
      <PageIntro
        eyebrow="Blog"
        title="Insights and updates"
        description="Exploring the future of academic research evaluation, research integrity, and transparent peer review."
      />

      {/* Posts list */}
      <section className="mt-12 md:mt-16 space-y-6">
        {posts.map((post, index) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug || post.id}`} className="block">
              <div className="rounded-xl border border-border bg-card-bg p-5 sm:p-6 hover:border-primary-200 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-foreground-muted">
                    {post.date && new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {index === 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border border-primary-200 bg-primary-50 text-primary-700">
                      Latest
                    </span>
                  ) : null}
                </div>

                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary-600 transition-colors duration-200">
                  {post.title || post.slug || post.id}
                </h2>

                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                  {post.excerpt || "Read this article to learn more about our perspective on academic research evaluation."}
                </p>

                <p className="mt-4 text-sm font-medium text-primary-600">
                  Read article →
                </p>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-border bg-card-bg p-8 text-center">
          <p className="text-foreground-muted">No blog posts available yet.</p>
        </div>
      ) : null}
    </div>
  );
}
