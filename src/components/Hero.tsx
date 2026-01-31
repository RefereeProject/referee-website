"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ColourfulText } from "./ColourfulText";
import { AuroraBackground } from "./aurora-background";

/* Static animation config hoisted to module scope */
const fadeUpMotion = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } };
const noMotion = { initial: {}, animate: {} };

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = prefersReducedMotion ? noMotion : fadeUpMotion;

  return (
    <AuroraBackground className="min-h-[80vh]">
      <div className="mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6">
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <ColourfulText text="The Referee Project" className="text-foreground" />
        </motion.div>
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          className="mt-6 text-foreground-secondary text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto"
        >
          A new paradigm for evaluating research quality through rigorous, systematic analysis
        </motion.p>
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#get-involved"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Get Involved
          </a>
          <a
            href="#overview"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
