"use client";
import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "./aurora-background";
import { HERO_EYEBROW, HERO_DISCLAIMER } from "@/lib/copy";

const fadeUpMotion = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } };
const noMotion = { initial: {}, animate: {} };

/**
 * Hero section (LP-1) for the landing page.
 * Centers messaging on the transparent reliability score as a product,
 * with primary CTA (book demo) and secondary CTA (how scoring works).
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = prefersReducedMotion ? noMotion : fadeUpMotion;

  return (
    <AuroraBackground className="min-h-[68vh]">
      <div className="mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-12 sm:py-16">
        {/* Eyebrow — from copy system */}
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.5 }}
          className="text-sm sm:text-base font-semibold tracking-wide uppercase text-primary-700"
        >
          {HERO_EYEBROW}
        </motion.p>

        {/* Headline — score-as-product framing */}
        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.05 }}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
        >
          A transparent reliability score for every scholarly paper
        </motion.h1>

        {/* Subhead — structured evaluation, machine-readable, inspectable */}
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          className="mt-6 text-foreground-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
        >
          Referee evaluates papers across structured categories using the CRWE
          flaw taxonomy. Every score is machine-readable, version-tracked, and
          backed by inspectable evidence — so you can see exactly what was
          checked and what remains open.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="mailto:erik@referee-project.com?subject=Referee%20demo%20request"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
            aria-label="Book a demo via email"
          >
            Book a demo
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            How scoring works
          </a>
        </motion.div>

        {/* Honest-limits disclaimer */}
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={prefersReducedMotion ? undefined : { duration: 0.85, delay: 0.2 }}
          className="mt-5 text-sm text-foreground-muted"
        >
          {HERO_DISCLAIMER}
        </motion.p>
      </div>
    </AuroraBackground>
  );
}
