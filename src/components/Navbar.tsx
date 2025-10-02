"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-blue-200/30 bg-white/80 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-blue-700 tracking-tight flex items-center gap-2">
          <Image
            src="/Referee_new_logo.png"
            alt="Referee Project Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span>The Referee Project</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-medium">
          <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-3 sm:px-0 -mx-3 sm:mx-0 rounded-lg active:bg-gray-100 min-h-[44px] flex items-center">
            About
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-3 sm:px-0 -mx-3 sm:mx-0 rounded-lg active:bg-gray-100 min-h-[44px] flex items-center">
            Blog
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-3 sm:px-0 -mx-3 sm:mx-0 rounded-lg active:bg-gray-100 min-h-[44px] flex items-center">
            FAQ
          </Link>
          <Link href="/talks" className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-3 sm:px-0 -mx-3 sm:mx-0 rounded-lg active:bg-gray-100 min-h-[44px] flex items-center">
            Talks
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}


