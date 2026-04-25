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
      <div style={{ marginTop: 24 }}>
        <h2>{title}</h2>
        {description ? <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.6 }}>{description}</p> : null}
        {date || duration ? (
          <div className="mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 18, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {date ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Calendar className="h-4 w-4" aria-hidden="true" />{date}</span> : null}
            {duration ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Clock className="h-4 w-4" aria-hidden="true" />{duration}</span> : null}
          </div>
        ) : null}
        <ExpandableSummary summary={summary} />
      </div>
    </article>
  );
}
