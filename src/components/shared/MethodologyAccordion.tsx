"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MethodologyItem {
  title: string;
  content: string;
}

interface MethodologyAccordionProps {
  /** List of methodology sections to render */
  items: MethodologyItem[];
  /** Optional additional CSS classes on the wrapper */
  className?: string;
}

/**
 * Accordion component for methodology details.
 * Only one item can be open at a time — clicking an open item closes it.
 * Uses CSS grid for smooth height transitions without JavaScript measurement.
 */
export function MethodologyAccordion({
  items,
  className,
}: MethodologyAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Toggle the clicked item; close if already open */
  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card-bg divide-y divide-border overflow-hidden",
        className
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div key={item.title}>
            {/* Trigger button — full-width, accessible */}
            <button
              type="button"
              onClick={() => handleToggle(idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-primary-50/50"
            >
              <span className="text-sm font-semibold text-foreground sm:text-base">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Collapsible content — CSS grid transition for smooth height */}
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-foreground-muted">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
