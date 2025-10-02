"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"

interface ExpandableSummaryProps {
  summary: string
  initialOpen?: boolean
}

/**
 * Accordion component for displaying expandable video summaries
 * Features smooth animations and keyboard accessibility
 */
export function ExpandableSummary({ summary, initialOpen = false }: ExpandableSummaryProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  // Parse summary into sections (separated by ### headers)
  const sections = summary.split('\n###').map(s => s.trim()).filter(Boolean)

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="summary-content"
        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-neutral-200/60 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 w-full text-left group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-600 group-hover:text-blue-600" />
        </motion.div>
        <span className="font-medium text-neutral-700 group-hover:text-blue-700">
          {isOpen ? "Hide" : "Show"} Talk Summary
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="summary-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="mt-4 p-6 rounded-lg bg-neutral-50/80 border border-neutral-200/60"
            >
              {sections.map((section, index) => {
                // Check if section starts with a header
                const lines = section.split('\n')
                const hasHeader = lines[0].startsWith('#')
                const header = hasHeader ? lines[0].replace(/^#+\s*/, '').trim() : null
                const content = hasHeader ? lines.slice(1).join('\n') : section

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.05, duration: 0.2 }}
                    className={index > 0 ? "mt-6" : ""}
                  >
                    {header && (
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                        {header}
                      </h3>
                    )}
                    <div 
                      className="prose prose-neutral prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: content
                          .split('\n')
                          .map(line => {
                            // Convert markdown-style bullets to HTML
                            if (line.trim().startsWith('- ')) {
                              return `<li>${line.trim().substring(2)}</li>`
                            }
                            // Handle bold text
                            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            return line ? `<p>${line}</p>` : ''
                          })
                          .join('')
                          .replace(/<li>/g, '<ul class="list-disc pl-5 space-y-1"><li>')
                          .replace(/<\/li>(?![\s\S]*<li>)/g, '</li></ul>')
                      }}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
