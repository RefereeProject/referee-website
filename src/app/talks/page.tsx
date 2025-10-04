"use client"

import { motion } from "framer-motion"
import { VideoCard } from "@/components/VideoCard"


const talks = [
  {
    id: 1,
    videoId: "-jipUr9b7_o",
    title: "The Referee Project: An Update with Sebastián Buriticá Arias",
    description: "Executive director Erik Schneider provides an update on the Referee Project in this conversation with Sebastián Buriticá Arias.",
    date: "2024",
    duration: "53:00",
    summary: `<h3>Core Summary</h3>
<p>The Referee Project aims to radically reform academic peer review by introducing an adversarial "bug bounty" model—similar to cybersecurity—where individuals are financially incentivized to find and report flaws in academic papers. Instead of relying solely on academics for peer review, the system would be open to anyone with relevant skills. Each paper would be given a transparent reliability score (0–100) based on the flaws discovered and their severity, making the trustworthiness of published research quantifiable and continuously improvable.</p>

<h3>Key Points and Details</h3>
<ul>
  <li><strong>Background & Motivation:</strong> Erik Schneider, who lives in the Netherlands and has a background in academia, finance, and cybersecurity, was inspired to tackle the flaws in peer review after hearing from researchers frustrated with the process. He points out that academic publishing is a $30 billion industry, yet authors often pay to publish, pay to read, and peer reviewers get nothing.</li>
  
  <li><strong>Problems in Peer Review:</strong> Peer review has become industrialized in the last 50 years, and journals play both a gatekeeping and profit-maximizing role. Rising numbers of retracted papers (58,000+) and estimates that up to 85% of biomedical research is wasted highlight issues of quality, duplication, and integrity. New threats include "paper mills" that sell authorship and the huge influx of AI-generated publications.</li>
  
  <li><strong>Referee Project's Approach:</strong> Adopts a "bug bounty" model from cybersecurity, develops a taxonomy of 250+ distinct research flaws, assigns each flaw a severity weight to calculate reliability scores, and allows challenge and appeal for continual improvement.</li>
  
  <li><strong>Incentives and Roles:</strong> Rewards attract both "makers" (creators of research) and "breakers" (critics/fraud-detectors), using a combination of AI for data extraction and statistical checking, and humans for domain judgment and oversight. The project envisions career pathways in academia for "breakers" akin to security auditors in tech.</li>
  
  <li><strong>Workflow Example:</strong> The MVP focuses on identifying statistical anomalies in published clinical trial papers, specifically implausible heartbeat ranges, using AI to extract and analyze data. The first public demonstration re-examines historic flawed studies that misinformed European medical guidelines.</li>
  
  <li><strong>Openness and Society Focus:</strong> The project serves society at large, including policymakers, doctors, and the public, by preventing waste of research funding and harm caused by unreliable findings. Anyone with expertise or interest can contribute, regardless of credentials.</li>
  
  <li><strong>Current Status & Involvement:</strong> The MVP is near completion, focused on a narrowly defined flaw type. Broader participation is welcomed—commitment and willingness to learn are more important than formal credentials.</li>
</ul>

<h3>Notable Quotes</h3>
<ul>
  <li>"Peer review is absolutely needed... the way it's implemented is flawed."</li>
  <li>"Truth is best discovered through adversarial processes like the Socratic method."</li>
  <li>"This project is for society, not just academia... So much public money is on the line."</li>
</ul>`
  },
  {
    id: 2,
    videoId: "5sY712uSv-s",
    title: "The Referee Project at DeSci Labs Forum",
    description: "Erik Schneider discusses the Referee Project with the DeSci Labs team, explaining how we're taking the peer out of peer review.",
    date: "2023",
    duration: "45:00",
    summary: `<h3>Key Points of the Referee Project</h3>
<ul>
  <li>The Referee Project seeks to "harden human knowledge by taking the peer out of peer review," addressing flaws in the current academic review system by redistributing the labor of reviewing and incentivizing error discovery with clear, structured mechanisms.</li>
  
  <li>Schneider draws on his experiences in finance and cybersecurity, proposing a distinction between "makers" (research producers) and "breakers" (those who excel at finding flaws in research). The project seeks to elevate and reward breakers—similar to ethical hackers in cybersecurity—by building a system that actively incentivizes finding errors in research.</li>
  
  <li>The proposed model functions like a bug bounty system, using a taxonomy of research flaws similar to the Common Weakness Enumeration in software security. All research goes directly to public pre-prints, with papers' reliability evolving over time via transparent, adversarial review and bounties for error discovery.</li>
  
  <li>Each paper is assigned a reliability score (1–100) based on claimed bounties and flaw categories, making its trustworthiness explicit. Schneider acknowledges this score will never be perfect but sees its imperfection and controversy as a way to involve the wider community in constant improvement.</li>
</ul>

<h3>Incentives and System Mechanics</h3>
<ul>
  <li>Bounties are paid in stablecoins or established cryptocurrencies, avoiding project-specific tokens, which Schneider views as risky and distracting.</li>
  
  <li>A potential future layer includes non-transferable "reputation tokens," which can be staked on papers as a public demonstration of belief in their reliability; if the paper's reliability falls, staked reputation is slashed.</li>
  
  <li>The protocol welcomes AI and bots as both reviewers and tools to scale error detection and review, though human oversight is expected at the outset.</li>
</ul>

<h3>System Focus and Challenges</h3>
<ul>
  <li>Initial focus will be on reviewing and correcting past research, where there are tens of thousands of unaddressed retractions and likely far more undetected issues.</li>
  
  <li>The project's design is inspired by the adversarial, public-by-default model in cybersecurity, positing that publicly exposing flaws leads to more robust systems. Schneider references retraction watch and other post-publication review platforms, noting the persistence and citation of flawed or retracted papers as evidence of the current system's shortcomings.</li>
  
  <li>Objections are anticipated around whether non-experts should be allowed to review specialized research, but Schneider argues that, as in cybersecurity, public adversarial review by granular specialists is essential and educational for the community. He acknowledges the risk of gaming the system but views these as features that incentivize continuous improvement through adversarial testing.</li>
</ul>

<h3>Limitations and Open Questions</h3>
<ul>
  <li>Schneider is aware that compressing paper quality to a single number (reliability score) is controversial and possibly demoralizing, yet sees this metric as necessary for accountability and transparency.</li>
  
  <li>He raises the problem of legitimate ambiguity: when many expert teams, given the same data and questions, reach widely divergent conclusions, as highlighted by a 2022 study involving dozens of research teams analyzing identical data on immigration attitudes. The project does not provide a solution here but recognizes this as a persistent meta-problem for all peer review approaches.</li>
</ul>`
  }
]

export default function TalksPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Recorded Talks
          </h1>
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
            Watch presentations and discussions about The Referee Project and our mission to transform research evaluation through transparency and adversarial review.
          </p>
        </motion.div>

        <div className="grid gap-16">
          {talks.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <VideoCard {...talk} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
