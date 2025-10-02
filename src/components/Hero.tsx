"use client";
import { motion } from "motion/react";
import { ColourfulText } from "./ColourfulText";
import { AuroraBackground } from "./aurora-background";

export function Hero() {
  return (
    <AuroraBackground className="min-h-[80vh]">
      <div className="mx-auto max-w-4xl text-center relative z-10 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <ColourfulText text="The Referee Project" className="text-gray-900" />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-gray-700 text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto"
        >
          A new paradigm for evaluating research quality through rigorous, systematic analysis
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#get-involved"
            className="rounded-full px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white shadow-lg transition-colors duration-200 font-semibold"
          >
            Get Involved
          </a>
          <a
            href="#overview"
            className="rounded-full px-8 py-3 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 transition-colors duration-200 font-semibold"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}


