"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MethodologyItem { title: string; content: string }

export function MethodologyAccordion({ items, className }: { items: MethodologyItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("card-flat", className)} style={{ padding: 0 }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.title} style={{ borderTop: idx === 0 ? 0 : "1px solid var(--border)" }}>
            <button
              type="button"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
              className="w-full text-left transition-colors"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px" }}
            >
              <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</span>
              <ChevronDown className="h-5 w-5 shrink-0 transition-transform" style={{ color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : undefined }} />
            </button>
            {isOpen ? <p style={{ padding: "0 20px 18px", fontSize: 14, lineHeight: 1.6, color: "var(--ink-muted)" }}>{item.content}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
