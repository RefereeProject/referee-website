"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

/**
 * About page component featuring team bio cards with profile images
 * Uses Framer Motion for smooth animations and Next.js Image for optimized loading
 */
export default function AboutPage() {
  // Founder information with comprehensive bio
  const founder = {
    name: "Erik Schneider",
    role: "Founder & Executive Director",
    image: "/Erik_Schneider.png",
    bio: "Erik has an eclectic background spanning finance, cybersecurity, and insider risk. He is the executive director of the Referee Project. A KPMG and Signpost Six alumnus, he holds a BA in history from the University of Virginia, an MBA from Vanderbilt University, and an MS in computer science from Technische Universiteit Eindhoven. In addition to his commercial projects, Erik is a board member of Maxim Nyansa Ghana, an NGO creating IT opportunities in Africa.",
  };

  // Advisory board members with research and technical expertise
  const advisors = [
    {
      name: "Dr. Marcus Thomas",
      role: "Computational Scientist",
      image: "/Marcus_Thomas.jpg",
      bio: "Dr. Thomas is a computational scientist working as a postdoctoral fellow at Mount Sinai Hospital in NYC. His work at the intersection of immuno-oncology, computer science and statistical physics aims to improve the computational pipelines used to create personalized tumor vaccines for cancer patients in clinical trials.",
    },
  ];

  // Stagger animation for cards appearing sequentially
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About The Referee Project
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform the research evaluation system fundamentally by applying a universal reliability score to papers, enhancing transparency, efficiency, and accountability in the review process.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-24"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-12 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-blue-50 leading-relaxed max-w-4xl">
                Adding quality and nuance to the scholarly record. The Referee Project is a non-profit stichting (foundation) registered in the Netherlands, dedicated to revolutionizing how research quality is evaluated and communicated.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Leadership
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={cardVariants}>
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Image */}
                    <div className="shrink-0">
                      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden ring-4 ring-blue-100 shadow-xl group-hover:ring-blue-200 transition-all duration-300">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 160px, 192px"
                        />
                      </div>
                    </div>

                    {/* Bio Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {founder.name}
                        </h3>
                        <p className="text-lg font-medium text-blue-700 mb-4">
                          {founder.role}
                        </p>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-lg">
                        {founder.bio}
                      </p>

                      {/* Optional social links - can be added later */}
                      <div className="flex gap-3 pt-4">
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200">
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Advisory Board Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Advisors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advisors bring a wealth of research and technical expertise to the project. They are instrumental in building the common enumeration of research weaknesses and reliability score.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {advisors.map((advisor, index) => (
              <motion.div key={index} variants={cardVariants}>
                <div className="group h-full relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />

                  <div className="p-6 md:p-8 flex flex-col h-full">
                    {/* Profile Image */}
                    <div className="mb-6">
                      <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden ring-4 ring-gray-100 shadow-lg group-hover:ring-blue-100 transition-all duration-300">
                        <Image
                          src={advisor.image}
                          alt={advisor.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="128px"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {advisor.name}
                      </h3>
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                        {advisor.role}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm flex-1">
                      {advisor.bio}
                    </p>

                    {/* Optional contact - can be activated later */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm font-medium">
                        <Mail className="w-4 h-4" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Bottom CTA Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 px-8 py-6 border border-blue-200">
            <p className="text-lg text-gray-700 mb-4">
              Interested in joining our mission?
            </p>
            <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get In Touch
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
