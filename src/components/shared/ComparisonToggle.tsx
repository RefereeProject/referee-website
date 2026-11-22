"use client";

import { useState } from "react";

export function ComparisonToggle() {
  const [showTransparent, setShowTransparent] = useState(false);

  return (
    <div className="card-flat">
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <span className="tag">Opaque review</span>
        {/* The track and thumb are styled from aria-checked in globals.css
            (.switch), so the visual state can never drift from the state
            announced to assistive technology. */}
        <button
          type="button"
          role="switch"
          aria-checked={showTransparent}
          aria-label="Toggle between opaque review and transparent score"
          onClick={() => setShowTransparent((prev) => !prev)}
          className="switch"
        >
          <span aria-hidden="true" className="switch-thumb" />
        </button>
        <span className="tag tag-primary">Transparent score</span>
      </div>

      {/* The unselected column is quietened with .is-dimmed rather than by
          lowering its opacity, which would push its text below AA contrast. */}
      <div className="compare mt-6">
        <div className={`compare-col opaque ${showTransparent ? "is-dimmed" : ""}`}>
          <div className="compare-head">Traditional peer review</div>
          <h3>Hidden evaluation</h3>
          <ul>
            <li>Vague accept/reject with no structured rationale.</li>
            <li>Criteria vary between reviewers with no shared taxonomy.</li>
            <li>No evidence trail linking judgments to source material.</li>
          </ul>
        </div>
        <div className={`compare-col transparent ${showTransparent ? "" : "is-dimmed"}`}>
          <div className="compare-head">Referee score output</div>
          <h3>Structured transparency</h3>
          <ul>
            <li>Numeric score with category breakdown: <span className="tag tag-evidence">72/100</span></li>
            <li>Every check maps to the CRWE flaw taxonomy.</li>
            <li>47 evidence items linked to source material.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
