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
    <>
      <PageIntro
        eyebrow="Blog"
        title="Insights and updates"
        description="Exploring the future of academic research evaluation, research integrity, and transparent peer review."
      />

      <div className="container page-shell">
        <section style={{ display: "grid", gap: 18 }}>
          {posts.map((post, index) => (
            <article key={post.id}>
              <Link href={`/blog/${post.slug || post.id}`} className="card-flat block" style={{ textDecoration: "none" }}>
                <div className="mono" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  <span>
                    {post.date && new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {index === 0 ? <span className="tag tag-primary">Latest</span> : null}
                </div>
                <h2>{post.title || post.slug || post.id}</h2>
                <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.6 }}>
                  {post.excerpt || "Read this article to learn more about our perspective on academic research evaluation."}
                </p>
                <p className="link-detail" style={{ display: "inline-block", marginTop: 16 }}>Read article →</p>
              </Link>
            </article>
          ))}
        </section>

        {posts.length === 0 ? (
          <div className="card-flat" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--ink-muted)" }}>No blog posts available yet.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
