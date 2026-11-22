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
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="disclosure-trigger"
      >
        {/* The chevron flips via the [aria-expanded] rule in globals.css. */}
        <ChevronDown aria-hidden="true" size={18} />
        <span>{isOpen ? "Hide" : "Show"} talk summary</span>
      </button>

      {isOpen ? (
        <div id={contentId} className="disclosure-panel">
          <div
            className="prose prose-lg prose-referee max-w-none"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      ) : null}
    </div>
  );
}
