"use client";
import { motion } from "motion/react";
import { ColourfulText } from "./ColourfulText";
import { AuroraBackground } from "./aurora-background";

export function Hero() {
  return (
    <AuroraBackground className="min-h-[80vh]">
      <div className="mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <ColourfulText text="The Referee Project" className="text-gray-900" />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto"
        >
          A new paradigm for evaluating research quality through rigorous, systematic analysis
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#get-involved"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white shadow-lg transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Get Involved
          </a>
          <a
            href="#overview"
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center touch-manipulation"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}


