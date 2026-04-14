import { cn } from "@/lib/utils";

interface AudienceCardProps {
  /** Audience segment title */
  title: string;
  /** Short description of the audience and their use case */
  description: string;
  /** Lucide-react icon element passed as a React node */
  icon: React.ReactNode;
}

/**
 * Card representing a target audience segment.
 * Accepts a pre-rendered icon (typically a lucide-react component)
 * so consumers control icon choice and sizing.
 */
export function AudienceCard({ title, description, icon }: AudienceCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card-bg p-5">
      {/* Icon rendered at a consistent size via the wrapper */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50/50 text-primary-600">
        {icon}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{description}</p>
    </article>
  );
}

interface AudienceCardGridProps {
  /** Array of audience items to render */
  items: AudienceCardProps[];
  /** Optional additional CSS classes on the grid wrapper */
  className?: string;
}

/**
 * Renders an array of AudienceCard components in a responsive grid.
 * Defaults to a 3-column layout at the md breakpoint.
 */
export function AudienceCardGrid({ items, className }: AudienceCardGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((item) => (
        <AudienceCard key={item.title} {...item} />
      ))}
    </div>
  );
}
