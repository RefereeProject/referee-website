import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  /** Ordered list of steps to display */
  steps: Step[];
  /** Optional additional CSS classes on the wrapper */
  className?: string;
}

/**
 * Numbered step-by-step process visualization.
 * Each step shows a circled number, title, and description.
 * Renders in a responsive grid (1-col mobile, up to 4-col on large screens).
 */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {steps.map((step, idx) => (
        <article
          key={step.title}
          className="rounded-xl border border-border bg-card-bg p-5"
        >
          {/* Step number badge */}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
            {idx + 1}
          </span>

          <h3 className="mt-3 text-base font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-foreground-muted">
            {step.description}
          </p>
        </article>
      ))}
    </div>
  );
}
