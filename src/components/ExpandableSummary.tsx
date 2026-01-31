"use client"

import { useState, useId } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ExpandableSummaryProps {
  summary: string
  initialOpen?: boolean
}

/**
 * Accordion component for displaying expandable video summaries
 * Features smooth animations and keyboard accessibility
 * Uses useId() for unique IDs when multiple instances render on the same page
 * Respects prefers-reduced-motion for accessibility
 */
export function ExpandableSummary({ summary, initialOpen = false }: ExpandableSummaryProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const contentId = useId()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300 w-full text-left group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="w-5 h-5 text-foreground-muted group-hover:text-primary-600" />
        </motion.div>
        <span className="font-medium text-foreground-secondary group-hover:text-primary-600">
          {isOpen ? "Hide" : "Show"} Talk Summary
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={contentId}
            initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-lg bg-background-secondary border border-border">
              <div
                className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h3:text-xl prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-foreground-secondary prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:my-4 prose-li:my-2 prose-li:text-foreground-secondary max-w-none"
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
