import { cn } from "@/lib/utils";

/** Single category within a score breakdown */
interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
}

interface ScoreAnatomyProps {
  /** Overall reliability score (integer, no fake precision) */
  score: number;
  /** Per-category breakdown with individual scores and max possible */
  categories: ScoreCategory[];
  /** Total number of evidence references examined */
  evidenceCount: number;
  /** Number of checks that remain unresolved */
  unresolvedCount: number;
  /** Optional scoring-model version identifier */
  version?: string;
}

/**
 * Displays a score breakdown module showing an overall score,
 * per-category progress bars, evidence count, and unresolved items.
 * Designed to be embedded in landing or detail pages.
 */
export function ScoreAnatomy({
  score,
  categories,
  evidenceCount,
  unresolvedCount,
  version,
}: ScoreAnatomyProps) {
  // Derive max possible score from categories for the overall display
  const maxTotal = categories.reduce((sum, c) => sum + c.maxScore, 0);

  return (
    <div className="rounded-xl border border-border bg-card-bg p-5 space-y-5">
      {/* Overall score header */}
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-medium text-foreground-muted">
            Overall reliability score
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
            {score}
            <span className="text-lg font-normal text-foreground-muted">
              {" "}
              / {maxTotal}
            </span>
          </p>
        </div>

        {/* Evidence and unresolved counters */}
        <div className="text-right space-y-1">
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">
              {evidenceCount}
            </span>{" "}
            evidence refs
          </p>
          <p className="text-sm text-foreground-muted">
            <span
              className={cn(
                "font-semibold",
                unresolvedCount > 0
                  ? "text-amber-600"
                  : "text-foreground"
              )}
            >
              {unresolvedCount}
            </span>{" "}
            unresolved
          </p>
        </div>
      </div>

      {/* Category breakdown bars */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const pct =
            cat.maxScore > 0
              ? Math.round((cat.score / cat.maxScore) * 100)
              : 0;

          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{cat.name}</span>
                <span className="text-foreground-muted">
                  {cat.score} / {cat.maxScore}
                </span>
              </div>
              {/* Progress track */}
              <div className="mt-1 h-2 w-full rounded-full bg-primary-50/50">
                <div
                  className="h-2 rounded-full bg-primary-600 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Version provenance footer */}
      {version && (
        <p className="text-xs text-foreground-muted">
          Scoring model: {version}
        </p>
      )}
    </div>
  );
}
