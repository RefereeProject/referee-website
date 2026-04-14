import { cn } from "@/lib/utils";

interface ProofCardProps {
  /** Evidence title */
  title: string;
  /** Short description of what this evidence shows */
  description: string;
  /** CRWE or flaw category label */
  category: string;
  /** Optional evidence type (e.g. "statistical", "methodological") */
  type?: string;
}

/**
 * Displays a single piece of evidence or proof with a category badge.
 * Intended for use inside ProofCardGrid or standalone in detail views.
 */
export function ProofCard({ title, description, category, type }: ProofCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card-bg p-5">
      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-block rounded-full bg-primary-50/50 px-3 py-0.5 text-xs font-medium text-primary-600">
          {category}
        </span>
        {type && (
          <span className="inline-block rounded-full border border-border px-3 py-0.5 text-xs font-medium text-foreground-muted">
            {type}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{description}</p>
    </article>
  );
}

interface ProofCardGridProps {
  /** Array of proof items to render */
  items: ProofCardProps[];
  /** Optional additional CSS classes on the grid wrapper */
  className?: string;
}

/**
 * Renders an array of ProofCard components in a responsive grid.
 * Defaults to a 1-col / 2-col / 3-col layout at sm / md / lg breakpoints.
 */
export function ProofCardGrid({ items, className }: ProofCardGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <ProofCard key={item.title} {...item} />
      ))}
    </div>
  );
}
