"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableSummaryProps {
  summary: string;
  initialOpen?: boolean;
}

export function ExpandableSummary({ summary, initialOpen = false }: ExpandableSummaryProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const contentId = useId();

  return (
    <div style={{ marginTop: 24 }}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="card-flat w-full text-left transition-colors"
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px" }}
      >
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 transition-transform"
          style={{ color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : undefined }}
        />
        <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink)" }}>
          {isOpen ? "Hide" : "Show"} talk summary
        </span>
      </button>

      {isOpen ? (
        <div id={contentId} className="card-flat" style={{ marginTop: 12 }}>
          <div
            className="prose prose-lg prose-referee max-w-none"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      ) : null}
    </div>
  );
}
