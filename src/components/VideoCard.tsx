import { Calendar, Clock } from "lucide-react";
// Imported directly, not through next/dynamic. The lazy wrapper rendered a
// different component tree on the server than in the browser, which changed
// the id that ExpandableSummary generates with useId() and caused a
// hydration mismatch on its aria-controls attribute. The component is tiny,
// so lazy-loading it saved nothing.
import { ExpandableSummary } from "./ExpandableSummary";
import { VideoEmbed } from "./VideoEmbed";

interface VideoCardProps {
  videoId: string;
  title: string;
  date?: string;
  duration?: string;
  summary: string;
  description?: string;
}

/**
 * One recorded talk: the embed, its title and facts, and a collapsible
 * summary. This is a Server Component; only ExpandableSummary, which holds
 * the open/closed state, runs in the browser.
 */
export function VideoCard({ videoId, title, date, duration, summary, description }: VideoCardProps) {
  return (
    <article className="card-flat">
      <VideoEmbed videoId={videoId} title={title} />
      <div className="mt-6">
        {/* An h2 for the document outline, sized down because it sits inside
            a card rather than opening a page section. */}
        <h2 className="text-2xl leading-snug md:text-[1.75rem]">{title}</h2>
        {description ? <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{description}</p> : null}
        {date || duration ? (
          <div className="meta-row mt-3.5">
            {date ? <span><Calendar className="h-4 w-4" aria-hidden="true" />{date}</span> : null}
            {duration ? <span><Clock className="h-4 w-4" aria-hidden="true" />{duration}</span> : null}
          </div>
        ) : null}
        <ExpandableSummary summary={summary} />
      </div>
    </article>
  );
}
