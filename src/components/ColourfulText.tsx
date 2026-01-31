"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ColourfulTextProps {
  text: string;
  className?: string;
}

/* Static animation variants hoisted to module scope to avoid re-allocation */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const childVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const wordClassName =
  "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent font-bold";

export function ColourfulText({ text, className }: ColourfulTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <div
        style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
        className={cn("", className)}
      >
        {words.map((word, idx) => (
          <span style={{ marginRight: "8px" }} key={idx} className={wordClassName}>
            {word}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("", className)}
    >
      {words.map((word, idx) => (
        <motion.span
          variants={childVariants}
          style={{ marginRight: "8px" }}
          key={idx}
          className={wordClassName}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
