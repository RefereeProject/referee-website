"use client"

interface VideoEmbedProps {
  videoId: string
  title: string
}

/**
 * YouTube video embed component with responsive aspect ratio
 * Uses native iframe for best performance and compatibility
 */
export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-200/60 shadow-sm">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
