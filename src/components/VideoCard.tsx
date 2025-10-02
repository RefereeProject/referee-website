"use client"

import { VideoEmbed } from "./VideoEmbed"
import { ExpandableSummary } from "./ExpandableSummary"
import { Calendar, Clock } from "lucide-react"

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
    <div className="group rounded-2xl border border-transparent hover:border-neutral-200/60 hover:bg-neutral-50/50 transition-all duration-300 p-6 -m-6">
      <VideoEmbed videoId={videoId} title={title} />

      <div className="mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          {title}
        </h2>

        {description && (
          <p className="mt-3 text-lg text-neutral-600 leading-relaxed">
            {description}
          </p>
        )}

        {(date || duration) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500">
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
