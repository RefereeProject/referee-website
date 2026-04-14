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
    <div className="rounded-2xl border-2 border-primary-200 bg-card-bg p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Overall score header — designed as a standalone, screenshot-worthy artifact */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
            Referee Score
          </p>
          <p className="text-sm font-medium text-foreground-muted mt-1">
            Overall reliability score
          </p>
          <p className="mt-2 text-6xl sm:text-7xl font-extrabold tracking-tighter text-primary-600">
            {score}
            <span className="text-2xl sm:text-3xl font-normal text-foreground-muted">
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

      {/* Version provenance footer — helps establish the score as a traceable artifact */}
      {version && (
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-foreground-muted">
            Scoring model: {version}
          </p>
        </div>
      )}
    </div>
  );
}
