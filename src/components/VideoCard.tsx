"use client";

import dynamic from "next/dynamic";
import { Calendar, Clock } from "lucide-react";
import { VideoEmbed } from "./VideoEmbed";

const ExpandableSummary = dynamic(() => import("./ExpandableSummary").then((m) => m.ExpandableSummary));

interface VideoCardProps {
  videoId: string;
  title: string;
  date?: string;
  duration?: string;
  summary: string;
  description?: string;
}

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
