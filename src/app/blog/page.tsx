import Link from "next/link";
import { getPosts } from "@/lib/content";

export const dynamic = "force-static";

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
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 py-8 px-6 lg:px-8 -mx-6 lg:-mx-8 rounded-2xl border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-all duration-300 ease-out">
                
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
                  
                  {post.excerpt && (
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
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


