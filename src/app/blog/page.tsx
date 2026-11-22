import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { cn } from "@/lib/utils";
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
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {posts.map((post, index) => {
              // getPosts returns posts newest first, so the first entry is
              // the latest one. On wide screens it becomes a full-width lead
              // card with the title beside the excerpt; the others fill a
              // two-column grid. Below `lg` every card is one stacked column.
              const isLatest = index === 0;

              return (
                // `flex` lets the card stretch to the height of its grid row,
                // so two cards side by side end level whatever their length.
                <article key={post.id} className={cn("flex", isLatest && "lg:col-span-2")}>
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className={cn(
                      "card-flat card-link flex min-w-0 flex-1 flex-col",
                      isLatest && "lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-12",
                    )}
                  >
                    <div className={cn("meta-row items-center", isLatest && "lg:col-span-2")}>
                      {post.date ? (
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      ) : null}
                      {isLatest ? <span className="tag tag-primary">Latest</span> : null}
                    </div>

                    {/* h2 is the correct level under the page's h1, but a bare
                        h2 is the 44px section heading, so it is scaled down to
                        a card title here. */}
                    <h2
                      className={cn(
                        "mt-3 text-2xl leading-tight tracking-[-0.012em]",
                        isLatest && "lg:text-[2rem] lg:leading-[1.15]",
                      )}
                    >
                      {post.title || post.slug || post.id}
                    </h2>

                    <div className="mt-3 flex flex-1 flex-col">
                      {/* max-w keeps the excerpt at a comfortable line length
                          when the card itself is much wider (tablet widths). */}
                      <p
                        className={cn(
                          "max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-muted",
                          isLatest && "lg:text-base",
                        )}
                      >
                        {post.excerpt || "Read this article to learn more about our perspective on academic research evaluation."}
                      </p>
                      {/* The whole card is the link, so this line is only a
                          visual cue. It reacts when any part of the card is
                          hovered (the `.card-link:hover .link-detail` rule in
                          globals.css), and `mt-auto` pins it to the bottom so
                          the cues line up across a row. */}
                      <p className="link-detail mt-auto self-start pt-4">
                        Read article →
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="card-flat text-center">
            <p className="text-ink-muted">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
