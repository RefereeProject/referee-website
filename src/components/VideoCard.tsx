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
    <div className="group rounded-2xl border border-transparent hover:border-border hover:bg-card-hover transition-all duration-300 p-6 -m-6">
      <VideoEmbed videoId={videoId} title={title} />

      <div className="mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-lg text-foreground-muted leading-relaxed">
            {description}
          </p>
        )}

        {(date || duration) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground-muted">
            {date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
          </div>
        )}

        <ExpandableSummary summary={summary} />
      </div>
    </div>
  )
}
