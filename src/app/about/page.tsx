import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  EyeOff,
  Shuffle,
  Lock,
  Puzzle,
  BarChart3,
  Layers,
  Search,
  FileCheck,
  BookOpen,
  Target,
  Link2,
  HelpCircle,
  ClipboardList,
  GitBranch,
  ShieldX,
  Microscope,
  Wrench,
  Box,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { MethodologyAccordion } from "@/components/shared/MethodologyAccordion";
import { StatusCallout } from "@/components/shared/StatusCallout";
import { CTABlock } from "@/components/shared/CTABlock";

const aboutDescription =
  "Learn why Referee exists and how transparent reliability scoring works for scholarly publishing.";

export const metadata: Metadata = {
  title: "About — Referee",
  description: aboutDescription,
  openGraph: {
    title: "About — Referee",
    description: aboutDescription,
    type: "website",
    siteName: "Referee",
    images: [{ url: "/Referee_new_logo.png", width: 512, height: 512, alt: "Referee logo" }],
  },
  twitter: {
    card: "summary",
    title: "About — Referee",
    description: aboutDescription,
    images: ["/Referee_new_logo.png"],
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type PersonProfile = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

const founder: PersonProfile = {
  name: "Erik Schneider",
  role: "Founder",
  image: "/Erik_Schneider.png",
  bio: "Erik Schneider built Referee because he saw that scholarly publishing lacks the structured evaluation tools that other high-stakes fields take for granted. His background spans cybersecurity, insider risk, and financial services — fields where audit trails and structured weakness enumeration are standard practice. He owns the vision, system architecture, and implementation end to end, building the core platform in Rust.",
  linkedin: "https://www.linkedin.com/in/erikschneider1/",
};

const advisors: PersonProfile[] = [
  {
    name: "Dr. Marcus Thomas",
    role: "Computational Scientist",
    image: "/Marcus_Thomas.jpg",
    bio: "Dr. Thomas is a computational scientist working as a Research Associate at Memorial Sloan Kettering Cancer Center in NYC. His work at the intersection of immuno-oncology, computer science and statistical physics aims to improve the computational pipelines used to create personalized tumor vaccines for cancer patients in clinical trials.",
    linkedin: "https://www.linkedin.com/in/marcus-thomas-a8359477/",
  },
];

/** AP-2 problem cards */
const problemCards = [
  {
    icon: EyeOff,
    title: "Hidden behind trust",
    description:
      "Readers inherit published conclusions without seeing the reliability work that did or didn't happen behind them.",
  },
  {
    icon: Shuffle,
    title: "Inconsistent review",
    description:
      "Peer review quality varies enormously — same paper, different reviewers, different outcomes. There is no shared standard for what was checked.",
  },
  {
    icon: Lock,
    title: "Opaque judgments",
    description:
      "Key decisions about methodology, statistics, and reproducibility are made behind closed doors with no structured record.",
  },
  {
    icon: Puzzle,
    title: "Scattered information",
    description:
      "When reliability problems surface, the evidence is fragmented across PubPeer, social media, retraction notices, and informal expert knowledge.",
  },
];

/** AP-3 feature items */
const featureItems = [
  {
    icon: BarChart3,
    title: "Transparent reliability score",
    description: "An integer score tied to concrete evidence.",
  },
  {
    icon: Layers,
    title: "Structured weakness categories",
    description: "Checks mapped to the CRWE flaw taxonomy.",
  },
  {
    icon: Search,
    title: "Machine-readable and human-readable",
    description: "Outputs work for both humans and automated systems.",
  },
  {
    icon: FileCheck,
    title: "Checked vs. unresolved",
    description:
      "Clear distinction between what has been evaluated and what remains open.",
  },
  {
    icon: BookOpen,
    title: "Reusable evaluation record",
    description:
      "The scoring output is a persistent, versionable artifact.",
  },
];

/** AP-4 transparency dimensions */
const transparencyCards = [
  {
    icon: Target,
    title: "Category transparency",
    description:
      "Every check maps to named flaw categories, not hidden criteria.",
  },
  {
    icon: Link2,
    title: "Evidence transparency",
    description:
      "Findings link to source evidence, not just conclusions.",
  },
  {
    icon: HelpCircle,
    title: "Gap transparency",
    description:
      "Unresolved items are recorded explicitly, not hidden.",
  },
  {
    icon: ClipboardList,
    title: "Scoring transparency",
    description:
      "The rules that produce the score are documented and versioned.",
  },
  {
    icon: GitBranch,
    title: "Revision transparency",
    description:
      "Scores include provenance: when, which version, what was in scope.",
  },
];

/** AP-5 process steps */
const howItWorksSteps = [
  {
    title: "Ingest and structure",
    description:
      "Paper materials are parsed into a structured screening context.",
  },
  {
    title: "Map to flaw taxonomy",
    description:
      "Content is evaluated against CRWE categories covering methodology, statistics, reproducibility, transparency, and citation integrity.",
  },
  {
    title: "Run structured checks",
    description:
      "Each category generates checks with pass/fail/unresolved outcomes and linked evidence.",
  },
  {
    title: "Record and preserve",
    description:
      "Results form a versioned evaluation record: what was checked, what was found, what remains open.",
  },
  {
    title: "Score and publish",
    description:
      "A reliability score is computed from the evaluation record with full provenance.",
  },
];

/** AP-5b methodology accordion items */
const methodologyItems = [
  {
    title: "Versioned taxonomy",
    content:
      "The CRWE flaw taxonomy is version-controlled. Each release adds, refines, or deprecates categories with a changelog. Scores reference the exact taxonomy version used.",
  },
  {
    title: "Evidence schemas",
    content:
      "Every finding follows a structured schema: source location in the paper, flaw category, severity assessment, and supporting evidence. This makes findings comparable across papers.",
  },
  {
    title: "Deterministic enrichment",
    content:
      "The screening pipeline applies the same checks in the same order to every paper. Human reviewers add judgment; the system adds consistency.",
  },
  {
    title: "Audit trail",
    content:
      "Every step — from ingestion through scoring — is logged with timestamps, input hashes, and version identifiers. The full evaluation history is preserved.",
  },
  {
    title: "Score vectors",
    content:
      "The reliability score is not a single magic number. It decomposes into category scores, each backed by specific checks, creating a vector that shows exactly where reliability is strong or weak.",
  },
];

/** AP-6 "what referee is not" items */
const notItems = [
  {
    icon: ShieldX,
    title: "Not a citation or prestige score",
    description:
      "Referee measures structural reliability, not impact, popularity, or journal reputation.",
  },
  {
    icon: Microscope,
    title: "Not a black-box oracle",
    description:
      "Every score can be inspected. If you disagree with a finding, you can see exactly what it's based on.",
  },
  {
    icon: Wrench,
    title: "Not a substitute for all human judgment",
    description:
      "Referee flags and records — it doesn't make final accept/reject decisions.",
  },
  {
    icon: Box,
    title: "Not a generic workflow tool",
    description:
      "This is purpose-built for scholarly reliability evaluation, not adapted from project management or CMS software.",
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

/**
 * Profile card for founder and advisors.
 * Stacked on mobile, side-by-side on md+.
 */
function PersonCard({ person }: { person: PersonProfile }) {
  return (
    <div className="founder card-flat">
      <Image
        src={person.image}
        alt={person.name}
        width={176}
        height={220}
        className="founder-portrait"
        style={{ width: 176 }}
      />
      <div>
        <h3>{person.name}</h3>
        <div className="credential">{person.role}</div>
        <p>{person.bio}</p>
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 16 }}>
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
      </div>
    </div>
  );
}

/**
 * Generic icon card used by AP-2, AP-3, AP-4, and AP-6 sections.
 * Renders a lucide icon, title, and description in a bordered card.
 */
function IconCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <article className="card-flat">
      <div className="aud-icon"><Icon className="h-4 w-4" /></div>
      <h4>{title}</h4>
      <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.55 }}>{description}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Referee"
        title="Why a transparent reliability score needs to exist"
        description="The scholarly record has no structured, inspectable way to communicate what was checked and what remains uncertain. Referee adds a transparent reliability layer — mapping every check to an explicit flaw category so the output can be audited, not just trusted."
      />

      <div className="container page-shell">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <a href="mailto:erik@referee-project.com?subject=Explore%20Referee%20scores" className="btn btn-primary" aria-label="Explore scored papers via email">
          Explore scored papers <span className="arrow">→</span>
        </a>
        <Link href="/#method" className="btn btn-secondary">
          How scoring works
        </Link>
      </div>

      {/* AP-2: Problem with current scholarly record */}
      <section id="problem" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          The problem with the current scholarly record
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {problemCards.map((card) => (
            <IconCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* AP-3: What Referee adds */}
      <section id="what-referee-adds" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          What Referee adds
        </h2>
        <p className="text-foreground-secondary leading-relaxed max-w-3xl">
          Referee produces a structured evaluation record for every paper it
          scores. Each record captures what was checked, what was found, and what
          remains open — in a format that is both human-readable and
          machine-readable.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item) => (
            <IconCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* AP-4: What transparency means here */}
      <section id="transparency" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          What transparency means here
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transparencyCards.map((card) => (
            <IconCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* AP-5: How the score works */}
      <section id="method" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          How the score works
        </h2>
        {/* ProcessSteps defaults to lg:grid-cols-4; override for 5 steps */}
        <ProcessSteps
          steps={howItWorksSteps}
          className="lg:grid-cols-5"
        />

        {/* Methodology details accordion */}
        <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8">
          Methodology details
        </h3>
        <MethodologyAccordion items={methodologyItems} />
      </section>

      {/* AP-6: What Referee is not */}
      <section id="not" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          What Referee is not
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {notItems.map((item) => (
            <IconCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* AP-7: Why this project has this shape */}
      <section id="origins" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Why this project has this shape
        </h2>
        <div className="content-card" style={{ display: "grid", gap: 16 }}>
          <p>
            Referee&apos;s design draws on ideas from fields where structured
            weakness enumeration and audit trails are standard practice, not
            optional extras.
          </p>
          <p>
            In cybersecurity, the Common Weakness Enumeration (CWE) gives every
            known software flaw a name, a definition, and a place in a taxonomy.
            That shared language lets different teams talk about the same
            problems without ambiguity. Referee applies the same principle to
            scholarly reliability — mapping evaluation checks to named flaw
            categories so the output is explicit and comparable.
          </p>
          <p>
            From compliance and financial services comes the idea of the audit
            trail: a structured, timestamped record of what was reviewed, by
            whom, and what was concluded. Referee&apos;s evaluation records
            follow the same logic — every score carries provenance so it can be
            verified independently.
          </p>
          <p>
            The approach also borrows from software-quality practices where
            review is decomposed into specific, testable checks rather than
            holistic judgment. Instead of asking &ldquo;is this paper
            good?&rdquo; Referee asks a series of concrete questions — about
            methodology, statistics, reproducibility, transparency, and citation
            integrity — and records the answers individually.
          </p>
        </div>
      </section>

      {/* AP-8: Founder */}
      <section id="founder" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Who built this
        </h2>
        <PersonCard person={founder} />
      </section>

      {/* Advisors (compact) */}
      <section className="mt-8 space-y-5">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Advisor
        </h3>
        {advisors.map((advisor) => (
          <PersonCard key={advisor.name} person={advisor} />
        ))}
      </section>

      {/* AP-9: Current state and next step */}
      <section id="status" className="mt-12 md:mt-16 space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Where the project stands
        </h2>
        <StatusCallout
          title="Current status"
          working={[
            "Curated scored-paper experience with the full evidence trail",
            "Structured scoring against the CRWE v2.1 flaw taxonomy",
            "Core platform built in Rust for reliability and performance",
            "Machine-readable output with evidence links",
          ]}
          improving={[
            "Coverage breadth across research domains",
            "False-positive calibration",
            "Additional flaw categories under development",
            "API access for integration partners",
          ]}
        />
        <p className="text-foreground-secondary leading-relaxed">
          We are actively seeking collaborators, operators, and advisors who want
          to help build the infrastructure for transparent scholarly evaluation.
          If that sounds like you, get in touch.
        </p>
      </section>

      {/* AP-10: Final CTA */}
      <section id="contact" className="mt-12 md:mt-16 mb-8">
        <CTABlock
          heading="See the score in action"
          description="Walk a curated paper end-to-end, then book a walkthrough if you want to talk through how Referee could fit your editorial intake or triage workflow."
          primaryHref="https://demo.referee-project.com"
          primaryLabel="See a scored paper"
          secondaryHref="mailto:erik@referee-project.com?subject=Referee%20walkthrough%20request"
          secondaryLabel="Book a walkthrough"
        />
      </section>
      </div>
    </>
  );
}
