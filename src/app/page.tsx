import { Hero } from "@/components/Hero";
import { CardStack, type Card } from "@/components/CardStack";
import { getSite } from "@/lib/content";
import Image from "next/image";

export default function Home() {
  const site = getSite();
  const items: Card[] = [
    {
      id: 1,
      name: "Erik Schneider",
      designation: "Founder",
      content: (
        <p>
          {site.description ||
            "Adding quality and nuance to the scholarly record."}
        </p>
      ),
    },
    {
      id: 2,
      name: "The Referee Project",
      designation: "Mission",
      content: (
        <p>
          A pre-seed project focused on elevating research evaluation with
          modern tools.
        </p>
      ),
    },
    {
      id: 3,
      name: "Blog",
      designation: "Notes",
      content: <p>Short posts with updates and ideas.</p>,
    },
  ];

  return (
    <div className="py-6 md:py-10">
      <Hero />
      <section id="overview" className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <Image
            src="/Referee_new_logo.png"
            alt="Referee Logo"
            width={640}
            height={640}
            className="w-full h-auto rounded-xl border border-neutral-200/60 dark:border-neutral-800/60"
            priority
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Overview</h2>
          <p>
            The Referee Project is a non-profit initiative that develops reliability
            scores for research papers, ranging from 0 to 100. We calculate these
            scores using a detailed taxonomy of research weaknesses. Moreover, a bug
            bounty program motivates individuals to identify flaws in these papers.
            Each identified weakness becomes part of the metadata, clarifying why a
            paper received its specific score. Users can easily access this metadata
            through APIs. This transparency helps researchers and others understand
            the strengths and limitations of various studies.
          </p>
          <p className="font-medium">Isn’t it crucial to know the reliability of the research you rely on?</p>
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6 md:gap-10 items-start">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">The Problem</h3>
          <p className="mt-3">
            The Referee Project addresses critical flaws in research evaluation and paper
            reliability communication. Academia’s emphasis on publishing has skewed
            incentives, distorting the scholarly record. Meanwhile, the existing system
            offers only vague indicators of paper reliability. We aim to revolutionize this
            system by implementing a universal reliability score, underpinned by a
            standardized research weakness taxonomy and a dynamic bug bounty system.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Poor Incentives</li>
            <li>Cultural Conflicts</li>
            <li>Opaque Criteria</li>
            <li>Extended Delays</li>
            <li>Difficulty in Referee Recruitment</li>
            <li>Superficial Review Focus</li>
            <li>Rejection of Innovative Research</li>
            <li>Negligence in Reviewing Technical Content</li>
            <li>Bias by Author Reputation or Affiliation</li>
            <li>Lack of Transparency</li>
          </ul>
        </div>
        <div>
          <Image
            src="/retractions.png"
            alt="Retractions graphic"
            width={900}
            height={700}
            className="w-full h-auto rounded-xl border border-neutral-200/60 dark:border-neutral-800/60"
          />
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6 md:gap-10 items-start">
        <div>
          <Image
            src="/Academic Library.png"
            alt="Academic library"
            width={900}
            height={700}
            className="w-full h-auto rounded-xl border border-neutral-200/60 dark:border-neutral-800/60"
          />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">The Referee Solution</h3>
          <p className="mt-3">
            Referee’s overall goal is to create a reliability score for academic papers
            using a standard taxonomy and a targeted bug bounty approach. This model
            offers several superior benefits compared to traditional models.
          </p>
          <ul className="mt-4 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Market Theory of Value</li>
            <li>Common Research Weakness Enumeration (CRWE)</li>
            <li>Targeted Bounties and Duplicate-claim Prevention</li>
            <li>Enhanced Transparency and Large-Scale Studies</li>
            <li>Universal Reliability Score</li>
            <li>Democratization of Knowledge Curation</li>
            <li>Reliability Scoring influenced by subsequent research</li>
            <li>Rectifies Past Research</li>
            <li>Supplementary to existing metrics like h-index</li>
          </ul>
        </div>
      </section>

      <div className="mt-10 flex items-center justify-center">
        <CardStack items={items} />
      </div>
      <section id="get-involved" className="mt-12 text-center">
        <a
          href="https://x.com/referee_project"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white shadow-lg transition-colors duration-200"
        >
          Follow updates on X
        </a>
      </section>
    </div>
  );
}
