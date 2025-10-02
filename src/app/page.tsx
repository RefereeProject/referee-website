import { Hero } from "@/components/Hero";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Hero />

      <section id="overview" className="mt-6 md:mt-8 space-y-4">
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
        <p className="font-semibold text-lg">Isn&apos;t it crucial to know the reliability of the research you rely on?</p>
      </section>

      <section className="mt-10 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">The Problem</h3>
          <p className="mt-3">
            The Referee Project addresses critical flaws in research evaluation and paper
            reliability communication. Academia&apos;s emphasis on publishing has skewed
            incentives, distorting the scholarly record. Meanwhile, the existing system
            offers only vague indicators of paper reliability—papers are labeled as published
            (trustworthy), retracted (untrustworthy), or unpublished (questionable). We aim to
            revolutionize this system by implementing a universal reliability score, underpinned
            by a standardized research weakness taxonomy and a dynamic bug bounty system.
          </p>
          <h4 className="mt-6 text-lg md:text-xl font-semibold">Academic Peer Review is Broken. Referee Can Fix It.</h4>
          <p className="mt-3">
            The current academic peer review system faces several significant issues that undermine
            its effectiveness and integrity:
          </p>
          <ul className="mt-4 list-disc pl-4 sm:pl-5 space-y-3 sm:space-y-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            <li><strong>Poor Incentives:</strong> There is a lack of incentives and motivation among peers to conduct thorough and diligent reviews.</li>
            <li><strong>Cultural Conflicts:</strong> Academia often lacks a culture of open criticism, which is crucial for rigorous scholarly discourse.</li>
            <li><strong>Opaque Criteria:</strong> Reviewers frequently apply their personal standards to evaluations, and the reviews remain confidential, adding to the opacity of the process.</li>
            <li><strong>Extended Delays:</strong> Researchers endure long wait times and numerous delays during the peer review process, causing significant setbacks in the dissemination of new findings.</li>
            <li><strong>Difficulty in Referee Recruitment:</strong> Editors often struggle to find appropriate referees, which leads to further delays and complications.</li>
            <li><strong>Superficial Review Focus:</strong> Referees may prioritize the aesthetics and perceived interest of a paper over its scientific merit, thus favoring subjective criteria over objective scientific validity.</li>
            <li><strong>Rejection of Innovative Research:</strong> Pioneering, risky, or interdisciplinary research is disproportionately likely to be rejected, which discourages innovative thinking and stifles the development of new ideas.</li>
            <li><strong>Negligence in Reviewing Technical Content:</strong> Referees frequently overlook thorough checks on mathematical equations or theoretical proofs, potentially missing critical errors.</li>
            <li><strong>Bias Influenced by Author&apos;s Reputation or Affiliation:</strong> The review process can be biased by the author&apos;s identity or institutional ties, perpetuating a system of status-based inequalities.</li>
            <li><strong>Lack of Transparency:</strong> The reluctance of journals to publish referee comments obscures the review process, making it difficult for the academic community and the public to gauge the credibility of research and the rigor with which it was reviewed. In addition, outsiders have to pour through the review narratives to understand and classify the problems with papers.</li>
          </ul>
          <h4 className="mt-6 text-lg md:text-xl font-semibold">Current Approaches</h4>
          <p className="mt-3">
            There are numerous initiatives aimed at addressing the problems highlighted previously,
            primarily through two approaches:
          </p>
          <ol className="mt-3 list-decimal pl-4 sm:pl-5 space-y-2 sm:space-y-1 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            <li>Incentivize referees by either paying them for their time or offering bounties for well-written holistic reviews</li>
            <li>Create communities to provide feedback collectively</li>
          </ol>
          <p className="mt-4">
            There&apos;s just one problem with these efforts: they&apos;re all echoes of the current system that
            doesn&apos;t work. And why doesn&apos;t the current system work? Because all the evidence suggests
            that most academics don&apos;t want to do the hard work of peer review.
          </p>
          <p className="mt-3">
            Even among those who take reviews seriously, few can be expected to master all aspects of a
            research paper, from statistical nuances to sampling procedures. This is precisely why peer
            reviews exist—to have another set of eyes catch potential flaws. Despite this, even the most
            diligent scrutiny can allow some errors to slip through, leading to the publication of papers
            with overlooked defects.
          </p>
          <p className="mt-3">
            A final flawed assumption of these initiatives is that only academics can conduct such reviews.
            The field of software security demonstrates that many non-academic individuals possess the
            motivation and capability to master complex systems, sometimes even surpassing academics in
            their expertise in specific cases.
          </p>
          <p className="mt-4 font-semibold text-lg">
            Let&apos;s stop relying solely on academics to solve this problem!
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">The Referee Solution</h3>
          <p className="mt-3">
            Referee&apos;s overall goal is to create a reliability score for academic papers using a
            standard taxonomy for research assessment and a targeted bug bounty approach to incentivize
            engagement. This model offers several superior benefits compared to traditional models,
            including the following:
          </p>

          <div className="mt-6 flex justify-center">
            <Image
              src="/Review-model.png"
              alt="Referee Review Model"
              width={800}
              height={400}
              className="rounded-lg shadow-lg w-full max-w-3xl h-auto"
              priority
            />
          </div>
          <ul className="mt-4 list-disc pl-4 sm:pl-5 space-y-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            <li>
              <strong>Market Theory of Value:</strong> Unlike traditional peer review that often operates
              on a labor theory of value (pay by the hour or by the paper), Referee&apos;s bug bounties are
              based on the market theory of value. This ensures that compensations are made only for
              results that add real value, rather than just effort.
            </li>
            <li>
              <strong>Common Research Weakness Enumeration (CRWE):</strong> Referee uses a tiered framework
              similar to cybersecurity&apos;s Common Weakness Enumeration (CWE), which brings multiple advantages:
              <ul className="mt-2 list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base">
                <li><strong>Targeted Bounties:</strong> Allows for bounties to be specifically set on the weaknesses deemed most critical, ensuring focused and effective reviewing.</li>
                <li><strong>Prevents Duplicate Claims:</strong> Reduces the risk of multiple claims for the same weakness, a common issue in early stages of bug-bounty systems.</li>
                <li><strong>Enhances Transparency:</strong> Improves the clarity and transparency of the review process, explaining clearly why a paper is considered unreliable.</li>
                <li><strong>Facilitates Large-Scale Studies:</strong> Supports reliable, large-scale studies to analyze common failings in research.</li>
                <li><strong>Universal Reliability Score:</strong> Enables the creation of a standardized score to assess the reliability of research papers.</li>
              </ul>
            </li>
            <li>
              <strong>Democratization of Knowledge Curation:</strong> Bug bounties democratize the process of
              knowledge curation, reducing the influence of status and traditional gatekeepers like prestigious
              institutions and journals. This opens up opportunities for a broader range of participants to
              contribute to the vetting process.
            </li>
            <li>
              <strong>Reliability Scoring System:</strong> Introduces a reliability score for papers that can be
              tracked and influenced by subsequent research. This feature ensures that ongoing research builds
              on a foundation that is scrutinized for accuracy and reliability.
            </li>
            <li>
              <strong>Rectifies Past Research:</strong> Unlike many DeSci projects that focus primarily on future
              research infrastructure, Referee prioritizes addressing existing problems in published research.
              This approach is crucial because much of the current academic challenges stem from past research
              inaccuracies and biases.
            </li>
            <li>
              <strong>Supplementary to Existing Metrics:</strong> Aims to supplement traditional academic metrics
              such as the h-index with a quality score that reflects the reliability and integrity of research,
              providing a more holistic view of a researcher&apos;s output.
            </li>
          </ul>
        </div>
      </section>

      <section id="newsletter" className="mt-10">
        <NewsletterSignup />
      </section>

      <section id="get-involved" className="mt-8 text-center">
        <a
          href="https://x.com/referee_project"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white shadow-lg transition-all duration-200 min-h-[48px] touch-manipulation text-center"
        >
          Follow updates on X
        </a>
      </section>
    </main>
  );
}
