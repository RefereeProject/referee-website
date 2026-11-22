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
  type LucideIcon,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { MethodologyAccordion } from "@/components/shared/MethodologyAccordion";
import { StatusCallout } from "@/components/shared/StatusCallout";
import { CTABlock } from "@/components/shared/CTABlock";
import { SOCIAL_IMAGE } from "@/lib/brand";
import { cn } from "@/lib/utils";

const aboutDescription =
  "Learn why Referee exists and how transparent reliability scoring works for scholarly publishing.";

export const metadata: Metadata = {
  title: "About — Referee",
  description: aboutDescription,
  // Setting openGraph/twitter here replaces the root layout's objects, so the
  // shared preview image has to be passed again (see src/lib/brand.ts).
  openGraph: {
    title: "About — Referee",
    description: aboutDescription,
    type: "website",
    siteName: "Referee",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Referee",
    description: aboutDescription,
    images: [SOCIAL_IMAGE.url],
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
 * One person: portrait beside their name, role, bio and LinkedIn link.
 *
 * Uses the `.founder` layout from the home page "Stewardship" section, which
 * moves the portrait above the text on narrow screens.
 */
function Profile({ person }: { person: PersonProfile }) {
  return (
    <div className="founder">
      {/* Same intrinsic size and `sizes` as the home page, which shows these
          portraits at the same 220px width, so both pages request the same
          image files and the browser can reuse its cached copy. */}
      <Image className="founder-portrait" src={person.image} alt={person.name} width={240} height={300} sizes="220px" />
      <div>
        <h3>{person.name}</h3>
        <div className="credential">{person.role}</div>
        <p>{person.bio}</p>
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm mt-5">
          <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </div>
  );
}

type IconCardData = { icon: LucideIcon; title: string; description: string };

/** Icon tile, title and a short description in a white card. */
function IconCard({ icon: Icon, title, description, className }: IconCardData & { className?: string }) {
  return (
    <article className={cn("card-flat", className)}>
      {/* No size classes on the icon: `.aud-icon svg` in globals.css sizes it,
          and a utility here would override that rule. */}
      <div className="aud-icon"><Icon aria-hidden="true" /></div>
      <h4>{title}</h4>
      {/* Same type size, leading and colour as the audience cards on the home
          page. That rule is scoped to `.audience`, so it is repeated here. */}
      <p className="mt-1.5 text-[0.90625rem] leading-[1.6] text-ink-muted">{description}</p>
    </article>
  );
}

/**
 * Responsive grid of icon cards, used by the problem, "what Referee adds",
 * transparency and "what Referee is not" sections.
 *
 * `columns` is the count on wide screens. Pass 4 for a set of four cards so
 * they share one row, and 3 for a set of five (a row of three, then two).
 * Four cards in three columns would strand one card on the last row.
 *
 * The three-column variant is built on six grid tracks so the last row can
 * be filled: each card spans two tracks, and in a set of five the last two
 * span three tracks each. Without that, five cards leave an empty slot at
 * the end of the second row.
 */
function IconCardGrid({ cards, columns }: { cards: IconCardData[]; columns: 3 | 4 }) {
  if (columns === 4) {
    return (
      <div className="section-body grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <IconCard key={card.title} {...card} />)}
      </div>
    );
  }

  // How many cards are left over on the last row of three (0, 1 or 2).
  const remainder = cards.length % 3;

  return (
    <div className="section-body grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {cards.map((card, idx) => {
        const isLast = idx === cards.length - 1;
        const inLastRow = remainder > 0 && idx >= cards.length - remainder;
        return (
          <IconCard
            key={card.title}
            {...card}
            className={cn(
              // Last-row cards share the full width between them.
              inLastRow ? (remainder === 2 ? "lg:col-span-3" : "lg:col-span-6") : "lg:col-span-2",
              // In the two-column tablet layout an odd final card would sit
              // alone beside a gap, so it takes the whole row there.
              isLast && cards.length % 2 === 1 && "sm:col-span-2",
            )}
          />
        );
      })}
    </div>
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
      >
        {/* The actions sit inside the navy band, as they do in the home hero.
            `.page-intro` is a navy surface, so the buttons take their on-navy
            colours from the role tokens in globals.css. `.hero-actions` brings
            the hero's top margin, which collapses with the wrapper's smaller
            one, so the gap above the buttons matches the hero. */}
        <div className="hero-actions">
          <a href="mailto:erik@referee-project.com?subject=Explore%20Referee%20scores" className="btn btn-primary" aria-label="Explore scored papers via email">
            Explore scored papers <span className="arrow" aria-hidden="true">→</span>
          </a>
          <Link href="/#method" className="btn btn-secondary">
            How scoring works
          </Link>
        </div>
      </PageIntro>

      {/* Layout: each block below is a full-width `.section` band holding one
          `.container`, the same rhythm as the home page. Backgrounds alternate
          so neighbouring bands read as separate blocks. The icon-card grids
          sit on the paper (default) and muted bands, where white cards stand
          out. The white `section-surface` bands hold the long-form text and,
          as on the home page, the status cards. */}

      {/* AP-2: Problem with current scholarly record */}
      <section id="problem" className="section">
        <div className="container">
          <div className="section-head">
            <h2>The problem with the current scholarly record</h2>
          </div>
          <IconCardGrid cards={problemCards} columns={4} />
        </div>
      </section>

      {/* AP-3: What Referee adds */}
      <section id="what-referee-adds" className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>What Referee adds</h2>
            <p className="lead">
              Referee produces a structured evaluation record for every paper it
              scores. Each record captures what was checked, what was found, and what
              remains open — in a format that is both human-readable and
              machine-readable.
            </p>
          </div>
          <IconCardGrid cards={featureItems} columns={3} />
        </div>
      </section>

      {/* AP-4: What transparency means here */}
      <section id="transparency" className="section">
        <div className="container">
          <div className="section-head">
            <h2>What transparency means here</h2>
          </div>
          <IconCardGrid cards={transparencyCards} columns={3} />
        </div>
      </section>

      {/* AP-5: How the score works */}
      <section id="method" className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>How the score works</h2>
          </div>
          <ProcessSteps steps={howItWorksSteps} columns={5} className="section-body" />

          {/* Heading in the first column, accordion across the other two, so
              the answers keep a readable line length instead of running the
              full width of the container. Stacks below the `lg` breakpoint. */}
          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-10">
            <h3>Methodology details</h3>
            <MethodologyAccordion items={methodologyItems} className="lg:col-span-2" />
          </div>
        </div>
      </section>

      {/* AP-6: What Referee is not */}
      <section id="not" className="section">
        <div className="container">
          <div className="section-head">
            <h2>What Referee is not</h2>
          </div>
          <IconCardGrid cards={notItems} columns={4} />
        </div>
      </section>

      {/* AP-7: Why this project has this shape */}
      <section id="origins" className="section section-surface">
        <div className="container">
          <div className="section-head">
            <h2>Why this project has this shape</h2>
            <p className="lead">
              Referee&apos;s design draws on ideas from fields where structured
              weakness enumeration and audit trails are standard practice, not
              optional extras.
            </p>
          </div>
          {/* Long-form copy: `.measure` caps the line length so the paragraphs
              stay comfortable to read on wide screens. */}
          <div className="section-body measure grid gap-5 leading-7">
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
        </div>
      </section>

      {/* AP-8: Founder, with the advisor below a divider in the same band */}
      <section id="founder" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Who built this</h2>
          </div>
          <div className="section-body">
            <Profile person={founder} />
          </div>
          <div className="founder-divider">
            {/* A label, not a heading, as on the home page: each person's
                name below is already the heading for their entry. */}
            <p className="eyebrow mb-5">Advisor</p>
            <div className="grid gap-10">
              {advisors.map((advisor) => (
                <Profile key={advisor.name} person={advisor} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AP-9: Current state and next step */}
      <section id="status" className="section section-surface">
        <div className="container">
          <div className="section-head">
            <h2>Where the project stands</h2>
          </div>
          <div className="section-body">
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
          </div>
          {/* Closing invitation. Set at lead size so it reads as a statement
              of its own instead of a footnote to the two cards above. */}
          <p className="lead mt-8">
            We are actively seeking collaborators, operators, and advisors who want
            to help build the infrastructure for transparent scholarly evaluation.
            If that sounds like you, get in touch.
          </p>
        </div>
      </section>

      {/* AP-10: Final CTA */}
      <section id="contact" className="section">
        <div className="container">
          <CTABlock
            heading="See the score in action"
            description="Walk a curated paper end-to-end, then book a walkthrough if you want to talk through how Referee could fit your editorial intake or triage workflow."
            primaryHref="https://demo.referee-project.com"
            primaryLabel="See a scored paper"
            secondaryHref="mailto:erik@referee-project.com?subject=Referee%20walkthrough%20request"
            secondaryLabel="Book a walkthrough"
          />
        </div>
      </section>
    </>
  );
}
