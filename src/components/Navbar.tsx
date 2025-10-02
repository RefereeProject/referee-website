"use client";
import Link from "next/link";
import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-blue-200/30 bg-white/80 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-blue-700 tracking-tight">
          The Referee Project
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-700 transition-colors">
            Blog
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-700 transition-colors">
            FAQ
          </Link>
          <Link href="/talks" className="text-gray-700 hover:text-blue-700 transition-colors">
            Talks
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}


