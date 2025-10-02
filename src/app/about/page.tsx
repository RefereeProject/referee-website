"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Erik Schneider",
      role: "Founder & Executive Director",
      background: "Finance, cybersecurity, insider risk",
      education: [
        "BA in History - University of Virginia",
        "MBA - Vanderbilt University", 
        "MS in Computer Science - Technische Universiteit Eindhoven"
      ],
      additional: "Board member of Maxim Nyansa Ghana"
    }
  ];

  const advisors = [
    {
      name: "Dr. Marcus Thomas",
      role: "Postdoctoral Fellow at Mount Sinai Hospital",
      focus: "Computational science in immuno-oncology, computer science, statistical physics",
      goal: "Improve computational pipelines used to create personalized tumor vaccines"
    },
    {
      name: "Dr. Tim Peterson",
      background: "MIT and Harvard-trained, former WashU faculty",
      ventures: "Co-initiated VitaDAO, co-founded Healthspan and BIOIO", 
      focus: "Longevity therapeutics"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About The Referee Project
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Transform the research evaluation system fundamentally by applying a universal reliability score to papers, enhancing transparency, efficiency, and accountability in the review process.
        </p>
      </motion.div>

      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Mission</h2>
        <div className="bg-blue-50 rounded-lg p-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Adding quality and nuance to the scholarly record. The Referee Project is a non-profit stichting (foundation) registered in the Netherlands, dedicated to revolutionizing how research quality is evaluated and communicated.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Leadership</h2>
        <div className="grid gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{member.name}</h3>
              <p className="text-lg text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-700 mb-4">{member.background}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Education:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {member.education.map((edu, eduIndex) => (
                    <li key={eduIndex}>{edu}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 italic">{member.additional}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Advisory Board</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {advisors.map((advisor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{advisor.name}</h3>
              <p className="text-gray-700 mb-3">{advisor.role || advisor.background}</p>
              {advisor.focus && (
                <p className="text-gray-600 mb-2"><strong>Focus:</strong> {advisor.focus}</p>
              )}
              {advisor.goal && (
                <p className="text-gray-600 mb-2"><strong>Goal:</strong> {advisor.goal}</p>
              )}
              {advisor.ventures && (
                <p className="text-gray-600"><strong>Ventures:</strong> {advisor.ventures}</p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}