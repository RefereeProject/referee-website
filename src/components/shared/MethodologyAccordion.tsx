"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MethodologyItem { title: string; content: string }

export function MethodologyAccordion({ items, className }: { items: MethodologyItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // One stable prefix per accordion, so each button can name the panel it
  // controls even when several accordions are on the same page.
  const baseId = useId();

  return (
    <div className={cn("accordion", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `${baseId}-panel-${idx}`;
        return (
          <div className="accordion-item" key={item.title}>
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.title}</span>
              {/* The chevron flips via the [aria-expanded] rule in globals.css. */}
              <ChevronDown size={20} aria-hidden="true" />
            </button>
            {/* `hidden` keeps the panel in the DOM so aria-controls stays valid. */}
            <p id={panelId} className="accordion-panel" hidden={!isOpen}>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
