"use client";

import { useState } from "react";

export function ComparisonToggle() {
  const [showTransparent, setShowTransparent] = useState(false);

  return (
    <div className="card-flat">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <span className="tag">Opaque review</span>
        <button
          type="button"
          role="switch"
          aria-checked={showTransparent}
          aria-label="Toggle between opaque review and transparent score"
          onClick={() => setShowTransparent((prev) => !prev)}
          className="transition-colors"
          style={{
            width: 52,
            height: 28,
            border: "1px solid var(--ink)",
            background: showTransparent ? "var(--primary-700)" : "var(--surface-muted)",
            padding: 3,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: 20,
              height: 20,
              background: "var(--surface)",
              border: "1px solid var(--ink)",
              transform: showTransparent ? "translateX(23px)" : "translateX(0)",
              transition: "transform .18s ease",
            }}
          />
        </button>
        <span className="tag tag-primary">Transparent score</span>
      </div>

      <div className="compare" style={{ marginTop: 22 }}>
        <div className={`compare-col opaque ${showTransparent ? "opacity-45" : ""}`}>
          <div className="compare-head">Traditional peer review</div>
          <h3>Hidden evaluation</h3>
          <ul>
            <li>Vague accept/reject with no structured rationale.</li>
            <li>Criteria vary between reviewers with no shared taxonomy.</li>
            <li>No evidence trail linking judgments to source material.</li>
          </ul>
        </div>
        <div className={`compare-col transparent ${showTransparent ? "" : "opacity-60"}`}>
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
