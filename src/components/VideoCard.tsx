"use client"

import dynamic from "next/dynamic"
import { VideoEmbed } from "./VideoEmbed"
import { Calendar, Clock } from "lucide-react"

const ExpandableSummary = dynamic(
  () => import("./ExpandableSummary").then((m) => m.ExpandableSummary),
)

interface VideoCardProps {
  videoId: string
  title: string
  date?: string
  duration?: string
  summary: string
  description?: string
}

/**
 * Card component displaying a YouTube video with expandable summary
 * Includes hover effects and metadata display
 */
export function VideoCard({ videoId, title, date, duration, summary, description }: VideoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-5 sm:p-6">
      <VideoEmbed videoId={videoId} title={title} />

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>

        {description ? (
          <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
            {description}
          </p>
        ) : null}

        {(date || duration) ? (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-foreground-muted">
            {date ? (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{date}</span>
              </div>
            ) : null}
            {duration ? (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{duration}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <ExpandableSummary summary={summary} />
      </div>
    </div>
  )
}
