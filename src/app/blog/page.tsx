import Link from "next/link";
import { getPosts } from "@/lib/content";

export const dynamic = "force-static";

// Summaries for each blog post
const blogSummaries: Record<string, string> = {
  "293": "Academia claims to value collegiality, yet the peer review system reveals a cutthroat reality marked by retaliation fears, competitive scooping, and reluctance to provide thorough reviews. Referee proposes removing the 'peer' from peer review, democratizing the process beyond credentialed gatekeepers to enable direct, unfiltered criticism that strengthens research evaluation.",
  "648": "At Referee, we embrace the hacker's mindset: anticipating and encouraging attempts to game the system makes it stronger. This living document explores potential attack vectors—from collusive reviewing to reputation laundering—and outlines robust countermeasures that build trust through adversarial resilience.",
  "751": "With academics spending 100 million hours annually on peer review yet still unable to keep pace with millions of new papers, AI agents offer the only scalable solution. By focusing AI on granular, specific research weaknesses rather than holistic reviews, Referee enables specialized detection that overcomes concerns about context, hallucinations, and subjective judgments."
};

export default function BlogIndexPage() {
  const posts = getPosts();
  
  return (
    <div className="py-12">
      {/* Header Section */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Insights and updates from The Referee Project — exploring the future of academic research evaluation.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="mt-16 grid gap-8 md:gap-12">
        {posts.map((post, index) => (
          <article key={post.id} className="group relative">
            <Link 
              href={`/blog/${post.slug || post.id}`}
              className="block"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 py-8 px-6 lg:px-8 -mx-6 lg:-mx-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-neutral-900 dark:to-purple-950/20 hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 transition-all duration-300 ease-out">
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {post.date && new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {index === 0 && (
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-4 leading-tight">
                    {post.title || post.slug || post.id}
                  </h2>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {blogSummaries[post.id] || post.excerpt || "Read this article to learn more about our perspective on academic research evaluation."}
                  </p>
                  
                  <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      Read article
                    </span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-500 dark:text-neutral-400">
            No blog posts available yet.
          </p>
        </div>
      )}
    </div>
  );
}


