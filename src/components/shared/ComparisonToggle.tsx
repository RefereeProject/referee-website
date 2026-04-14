"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive toggle comparing opaque peer review with Referee's transparent scoring.
 * Used on the landing page (LP-5) to visually demonstrate the difference between
 * traditional hidden review and structured, evidence-backed evaluation output.
 */
export function ComparisonToggle() {
  const [showTransparent, setShowTransparent] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card-bg p-5 sm:p-6">
      {/* Toggle control */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            !showTransparent ? "text-foreground" : "text-foreground-muted"
          )}
        >
          Opaque review
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={showTransparent}
          aria-label="Toggle between opaque review and transparent score"
          onClick={() => setShowTransparent((prev) => !prev)}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border border-border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            showTransparent ? "bg-primary-600" : "bg-foreground-muted/30"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
              showTransparent ? "translate-x-[22px]" : "translate-x-[3px]"
            )}
          />
        </button>

        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            showTransparent ? "text-foreground" : "text-foreground-muted"
          )}
        >
          Transparent score
        </span>
      </div>

      {/* Panels */}
      <div className="relative mt-5 min-h-[260px] sm:min-h-[240px]">
        {/* Opaque review panel */}
        <div
          aria-hidden={showTransparent}
          className={cn(
            "absolute inset-0 transition-all duration-300",
            showTransparent
              ? "pointer-events-none translate-x-[-8px] opacity-0"
              : "translate-x-0 opacity-100"
          )}
        >
          <div className="rounded-lg border border-border bg-foreground-muted/5 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Traditional peer review
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Hidden evaluation
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground-muted/60" aria-hidden="true">&#x2715;</span>
                <span>Vague accept/reject with no structured rationale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground-muted/60" aria-hidden="true">&#x2715;</span>
                <span>Criteria vary between reviewers with no shared taxonomy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground-muted/60" aria-hidden="true">&#x2715;</span>
                <span>No evidence trail linking judgments to source material</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground-muted/60" aria-hidden="true">&#x2715;</span>
                <span>Unresolved issues are not tracked or surfaced</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transparent score panel */}
        <div
          aria-hidden={!showTransparent}
          className={cn(
            "absolute inset-0 transition-all duration-300",
            showTransparent
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-[8px] opacity-0"
          )}
        >
          <div className="rounded-lg border border-primary-200 bg-primary-50/50 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
              Referee score output
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Structured transparency
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-600" aria-hidden="true">&#x2713;</span>
                <span>
                  Numeric score with category breakdown
                  <span className="ml-1.5 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-600">
                    72/100
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-600" aria-hidden="true">&#x2713;</span>
                <span>Every check maps to the CRWE flaw taxonomy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-600" aria-hidden="true">&#x2713;</span>
                <span>47 evidence items linked to source material</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary-600" aria-hidden="true">&#x2713;</span>
                <span>3 unresolved items explicitly flagged for expert review</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
