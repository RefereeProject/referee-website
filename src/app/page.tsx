import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BookOpen, Users, Landmark, Building2, Search } from "lucide-react";
import {
  ScoreAnatomy,
  ProcessSteps,
  ProofCardGrid,
  AudienceCardGrid,
  StatusCallout,
  FounderTeaser,
  CTABlock,
} from "@/components/shared";
import { HOME_META_DESCRIPTION } from "@/lib/copy";

const Hero = dynamic(() => import("@/components/Hero").then((m) => m.Hero));

export const metadata: Metadata = {
  title: "Referee | A transparent reliability score for every scholarly paper",
  description: HOME_META_DESCRIPTION,
};

// ---------------------------------------------------------------------------
// Static data for shared components
// ---------------------------------------------------------------------------

/** LP-3: Sample score categories for the anatomy visualization */
const SCORE_CATEGORIES = [
  { name: "Methodology", score: 18, maxScore: 25 },
  { name: "Statistical validity", score: 15, maxScore: 20 },
  { name: "Reproducibility", score: 12, maxScore: 15 },
  { name: "Transparency", score: 14, maxScore: 20 },
  { name: "Citation integrity", score: 13, maxScore: 20 },
];

/** LP-4: Steps describing how the score is produced */
const PROCESS_STEPS = [
  {
    title: "Ingest paper evidence",
    description:
      "Referee analyzes submission materials and creates structured screening context.",
  },
  {
    title: "Run structured checks",
    description:
      "Checks map to categories in the CRWE flaw taxonomy covering methodology, statistics, reproducibility, and more.",
  },
  {
    title: "Record evidence and open items",
    description:
      "System logs what\u2019s been checked, what\u2019s unresolved, and what needs expert judgment.",
  },
  {
    title: "Compute and preserve score",
    description:
      "Outputs become a versioned, machine-readable reliability score tied to concrete evidence.",
  },
];

/** LP-5: Trust proof pillars */
const PROOF_ITEMS = [
  {
    title: "Defined taxonomy",
    description:
      "Every check maps to explicit flaw categories in the CRWE framework \u2014 not ad-hoc opinion.",
    category: "Structure",
  },
  {
    title: "Transparent calculation",
    description:
      "Scoring rules are documented and versioned. The same evidence produces the same score.",
    category: "Reproducibility",
  },
  {
    title: "Stored evidence",
    description:
      "Each finding links to source evidence and unresolved items, so reviewers can inspect the reasoning.",
    category: "Auditability",
  },
  {
    title: "Versioned output",
    description:
      "Scores include provenance: when computed, which taxonomy version, what was in scope.",
    category: "Traceability",
  },
];

/** LP-6: Audience segments with lucide-react icons */
const AUDIENCE_ITEMS = [
  {
    title: "Journals & publishers",
    description:
      "Unify fragmented integrity checks and improve visibility into what has been evaluated.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Conference organizers",
    description:
      "Create structured intake triage when submission volume outpaces reviewer capacity.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Funders & policy teams",
    description:
      "Assess reliability of research before funding decisions with auditable evidence.",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    title: "Research organizations",
    description:
      "Run structured evaluation at scale with transparent records of potential weaknesses.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Diligence teams",
    description:
      "Evaluate scholarly claims behind investment, biotech, and enterprise R&D decisions.",
    icon: <Search className="h-5 w-5" />,
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="py-6 md:py-10">
      {/* LP-1: Hero */}
      <Hero />

      {/* LP-2: Why this needs to exist */}
      <section id="why-exists" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          The scholarly record asks too much trust
        </h2>
        <p className="max-w-4xl text-foreground-secondary">
          Opaque peer review hides key judgments about methodology, data
          integrity, and reproducibility. Reliability should be visible, yet
          there is no structured way to inspect what was checked, what was
          missed, or how confident the evaluation actually is.
        </p>

        {/* Gap visualization: current state */}
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card-bg p-5 text-center">
            <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">
              Today
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Paper submission
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Manuscripts enter the pipeline with no structured reliability
              metadata attached.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5 text-center">
            <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">
              Black box
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              Opaque review process
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Evaluation criteria vary by reviewer, and the reasoning is
              rarely preserved in machine-readable form.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card-bg p-5 text-center">
            <p className="text-sm font-medium text-foreground-muted uppercase tracking-wide">
              Result
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              No structured output
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Accept/reject decisions leave no inspectable record of what was
              checked or what weaknesses remain.
            </p>
          </article>
        </div>

        {/* Referee's approach */}
        <p className="text-sm font-medium text-foreground-muted pt-2">
          Referee&apos;s approach:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-primary-200 bg-primary-50/50 p-5 text-center">
            <h3 className="text-lg font-semibold text-foreground">Paper</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Submission materials enter Referee with full-text and metadata
              context.
            </p>
          </article>
          <article className="rounded-xl border border-primary-200 bg-primary-50/50 p-5 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Structured checks
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Each paper runs through categorized flaw checks tied to the CRWE
              taxonomy.
            </p>
          </article>
          <article className="rounded-xl border border-primary-200 bg-primary-50/50 p-5 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Transparent score
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              A versioned, machine-readable reliability score with inspectable
              evidence and open items.
            </p>
          </article>
        </div>
      </section>

      {/* LP-3: Anatomy of a Referee score */}
      <section id="score-anatomy" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Anatomy of a Referee score
        </h2>
        <ScoreAnatomy
          score={72}
          categories={SCORE_CATEGORIES}
          evidenceCount={47}
          unresolvedCount={3}
          version="CRWE-taxonomy v0.4.1"
        />
        <p className="max-w-4xl text-foreground-secondary">
          A score of 72/100 means the paper cleared most structured checks but
          has identifiable gaps: methodology is strong at 18/25, while
          transparency (14/20) and citation integrity (13/20) flag areas that
          need further inspection. Three items remain unresolved and require
          expert judgment before the score is final. Every number links back to
          the specific evidence that produced it.
        </p>
      </section>

      {/* LP-4: How the score is produced */}
      <section
        id="how-it-works"
        className="mt-12 md:mt-16 space-y-6 scroll-mt-24"
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          How the score is produced
        </h2>
        <ProcessSteps steps={PROCESS_STEPS} />

        {/* Workflow diagram */}
        <div className="mt-2 rounded-xl border border-border bg-card-bg p-4 sm:p-5">
          <Image
            src="/Review-model.png"
            alt="Referee workflow from evidence checks to structured evaluation output"
            width={1200}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          <p className="mt-3 text-sm text-foreground-muted">
            End-to-end workflow: from paper ingestion through structured checks
            to a versioned reliability score with full evidence provenance.
          </p>
        </div>
      </section>

      {/* LP-5: Why the score deserves trust */}
      <section id="trust" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Why the score deserves trust
        </h2>
        <ProofCardGrid items={PROOF_ITEMS} className="md:grid-cols-2" />
      </section>

      {/* LP-6: Who it helps */}
      <section id="audience" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Who it helps
        </h2>
        <AudienceCardGrid items={AUDIENCE_ITEMS} />
        <p className="text-sm text-foreground-muted max-w-4xl">
          Future expansion includes investment due diligence, pharma and
          biotech scouting, grant allocation, and enterprise R&amp;D decisions.
        </p>
      </section>

      {/* LP-7: Product state and honest limits */}
      <section id="status" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Where the product stands today
        </h2>
        <StatusCallout
          title="Current status"
          working={[
            "Live demo with dashboard and paper-checking workflow",
            "Structured scoring across CRWE flaw categories",
            "Machine-readable output with evidence links",
            "Versioned scores with full provenance",
          ]}
          improving={[
            "Coverage breadth across research domains",
            "False-positive reduction in edge cases",
            "Additional flaw categories under development",
            "API access for integration partners",
          ]}
        />
      </section>

      {/* LP-8: Founder teaser */}
      <section id="founder" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Built by someone who cares about the problem
        </h2>
        <FounderTeaser
          name="Erik Schneider"
          image="/Erik_Schneider.png"
          tagline="Erik built Referee because he saw that the gap between what gets published and what's actually reliable keeps growing — and the tools to close it didn't exist. He owns the vision, architecture, and implementation end to end."
          link="/about"
        />
      </section>

      {/* LP-9: Final CTA block */}
      <section id="book-demo" className="mt-12 md:mt-16 mb-8">
        <CTABlock
          heading="See the score in action"
          description="Walk through a live paper evaluation. We'll show you the dashboard, the scoring process, and be transparent about what's ready and what's still improving."
          primaryHref="mailto:erik@referee-project.com?subject=Referee%20demo%20request"
          primaryLabel="Book a demo"
          secondaryHref="#how-it-works"
          secondaryLabel="How scoring works"
        />
      </section>
    </div>
  );
}
