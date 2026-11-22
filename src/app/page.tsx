import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText, FlaskConical, Landmark, LibraryBig, Presentation, SearchCheck, type LucideIcon } from "lucide-react";
import { Hero, ScoreCard } from "@/components/Hero";
import { SectionHead } from "@/components/shared/SectionHead";
import { SOCIAL_IMAGE } from "@/lib/brand";
import {
  CRWE_LEAF_CHECKS,
  CRWE_TOP_LEVEL_GROUPS,
  CRWE_VERSION_LABEL,
  CTA_PRIMARY_HREF,
  CTA_PRIMARY_LABEL,
  CTA_SECONDARY_HREF,
  CTA_SECONDARY_LABEL,
  HOME_META_DESCRIPTION,
} from "@/lib/copy";

const PAGE_TITLE = "Referee | A transparent reliability score for every scholarly paper";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: HOME_META_DESCRIPTION,
  // Setting openGraph/twitter here replaces the root layout's objects, so the
  // shared preview image has to be passed again (see src/lib/brand.ts).
  openGraph: { title: PAGE_TITLE, description: HOME_META_DESCRIPTION, type: "website", siteName: "Referee", images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: HOME_META_DESCRIPTION, images: [SOCIAL_IMAGE.url] },
};

const problemToday = [
  "Reviewer judgments vary; criteria are rarely declared.",
  "Findings live in private comment threads, not the record.",
  "No category-level breakdown; no traceable evidence chain.",
  "Limitations are footnotes, not first-class outputs.",
  "Two papers with identical flaws may receive opposite verdicts.",
] as const;

const problemReferee = [
  "Every check maps to an explicit CRWE flaw category.",
  "Findings link back to the source passage that produced them.",
  "Category vector exposes strengths and weaknesses, not a single grade.",
  "Unresolved items are surfaced — uncertainty becomes part of the output.",
  "Same evidence, same taxonomy version — versioned, inspectable, and re-derivable.",
] as const;

const anatomy = [
  { label: "Aggregate score", body: "Composite of category-level points. Never the only thing visible — always paired with the vector that produced it." },
  { label: "Category vector", body: "The five-axis decomposition with explicit denominators." },
  { label: "Evidence references", body: "Each finding links to the passage, table, figure, or supplementary file that produced it." },
  { label: "Unresolved items", body: "Checks that did not run, did not converge, or fell out of scope. Made visible — never hidden." },
  { label: "Provenance", body: "Taxonomy version, scoring-model version, timestamp, and input hash — so any score can be reproduced." },
] as const;

const steps = [
  { n: "01", title: "Ingest", body: "Manuscript and supplementary materials are parsed into structured screening context — text, tables, figures, references, methods.", output: "Input: manuscript.pdf · hash: sha256/…" },
  { n: "02", title: "Map", body: "Claims are mapped to categories in the CRWE flaw taxonomy. Each claim becomes a checkable assertion with provenance.", output: "Output: claim graph · 248 nodes" },
  { n: "03", title: "Check", body: "Structured checks run against each claim — statistical sanity, reproducibility, citation integrity, transparency, and methodology.", output: "Output: 47 evidence refs · 3 unresolved" },
  { n: "04", title: "Preserve", body: "A versioned, machine-readable reliability score is written to the record, with the full evidence trail attached and re-derivable.", output: `Output: score.json · ${CRWE_VERSION_LABEL} · 72/100` },
] as const;

// CRWE v2.1 surface — six core categories (1–6) plus five method modules (M1–M5),
// totalling eleven top-level categories and 300 leaf checks. Leaf counts come from
// crwe/taxonomy/2.1/leaf-index.json and stay in sync with `CRWE_LEAF_CHECKS`.
const taxonomy = [
  { id: "CRWE-01", name: "Data integrity", scope: "Operational definitions, data sources, missingness, transformations, and merge rules.", group: "Core", checks: 55 },
  { id: "CRWE-02", name: "Study design", scope: "Research questions, sampling frames, randomization, identification strategy, and preregistration.", group: "Core", checks: 76 },
  { id: "CRWE-03", name: "Statistical specification", scope: "Model choice, assumption checks, multiplicity correction, missing-data handling, and uncertainty reporting.", group: "Core", checks: 45 },
  { id: "CRWE-04", name: "Reporting consistency", scope: "Internal coherence between abstract, methods, and results; calibrated claims and limitations.", group: "Core", checks: 29 },
  { id: "CRWE-05", name: "Figures & evidence linkage", scope: "Axis labelling, axis truncation, citation backing for headline claims, and use of retracted sources.", group: "Core", checks: 14 },
  { id: "CRWE-06", name: "Reproducibility & availability", scope: "Data and code availability, software/environment specs, persistent identifiers, and execution success.", group: "Core", checks: 24 },
  { id: "CRWE-M1", name: "Predictive modelling", scope: "Train/validation splits, leakage, hyperparameter procedure, evaluation metrics, and architecture disclosure.", group: "Module", checks: 16 },
  { id: "CRWE-M2", name: "Systematic review & meta-analysis", scope: "Search reproducibility, data extraction, risk-of-bias assessment, model choice, and sensitivity analyses.", group: "Module", checks: 14 },
  { id: "CRWE-M3", name: "Simulation & numerical modelling", scope: "Governing equations, solver and discretization choices, and verification/validation evidence.", group: "Module", checks: 9 },
  { id: "CRWE-M4", name: "Formal & theoretical work", scope: "Definition discipline, lemma dependencies, and step-by-step proof correctness.", group: "Module", checks: 9 },
  { id: "CRWE-M5", name: "Qualitative research", scope: "Sampling strategy, coding procedures, and interpretive transparency for qualitative inquiry.", group: "Module", checks: 9 },
] as const;

// The bars in the taxonomy table compare rows with each other, so they are
// scaled to the largest category rather than to the 300-check total (which
// would leave every bar tiny).
const maxChecks = Math.max(...taxonomy.map((row) => row.checks));

const audiences: readonly { icon: LucideIcon; title: string; body: string; tag: string }[] = [
  { icon: BookOpenText, title: "Journals & publishers", body: "Unify fragmented integrity checks; expose what was evaluated and what remains open.", tag: "Editorial intake" },
  { icon: Presentation, title: "Conference organizers", body: "Triage submissions when volume outpaces reviewer capacity, without lowering the bar.", tag: "Program chairs" },
  { icon: Landmark, title: "Funders & policy teams", body: "Assess research reliability before funding decisions, with an auditable evidence chain.", tag: "Grant review" },
  { icon: FlaskConical, title: "Research organizations", body: "Run structured evaluation at scale; preserve transparent records of weakness and uncertainty.", tag: "Internal review" },
  { icon: SearchCheck, title: "Diligence teams", body: "Evaluate scholarly claims behind investment, biotech, and enterprise R&D decisions.", tag: "Due diligence" },
  { icon: LibraryBig, title: "Libraries & archives", body: "Attach machine-readable reliability metadata to the works you preserve and surface.", tag: "Curation" },
];

const statusLive = [
  "Curated scored-paper experience with the full evidence trail.",
  `Structured scoring against CRWE ${CRWE_VERSION_LABEL} flaw categories.`,
  "Machine-readable output with evidence links.",
  "Versioned scores with full provenance.",
] as const;

const statusImproving = [
  "Coverage breadth across research domains.",
  "False-positive reduction in edge cases.",
  "Additional flaw categories under development.",
  "API access for integration partners.",
] as const;

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="why">
        <div className="container">
          <SectionHead
            index={1}
            label="The Problem"
            title="The scholarly record asks for too much trust, and offers too little evidence."
            lead="Peer review preserves a verdict — accept, reject, revise — but the reasoning behind that verdict is rarely written down, and almost never machine-readable. Reliability becomes folklore."
          />
          <div className="compare section-body">
            <div className="compare-col opaque">
              <div className="compare-head">Today · Opaque review</div>
              <h3>The verdict survives.<br />The reasoning does not.</h3>
              <ul>{problemToday.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="compare-col transparent">
              <div className="compare-head">Referee · Structured transparency</div>
              <h3>Verdict and evidence,<br />preserved together.</h3>
              <ul>{problemReferee.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-surface" id="anatomy">
        <div className="container">
          <SectionHead
            index={2}
            label="Anatomy of a Score"
            title={<>The score is an <em>instrument</em>, not a verdict.</>}
            lead="A reliability score is a data object: a number, a category vector, an evidence count, an unresolved-item list, a taxonomy version, and a hash of the input. It is meant to be inspected, challenged, and re-derived — not believed."
          />
          <div className="anatomy-grid section-body">
            <ScoreCard audit />
            <ol className="anatomy-list">
              {anatomy.map((row, idx) => (
                <li className="anatomy-row" key={row.label}>
                  <span className="cite" aria-hidden="true">{idx + 1}</span>
                  <div>
                    <h3>{row.label}</h3>
                    <p>{row.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="method">
        <div className="container">
          <SectionHead
            index={3}
            label="Method"
            title={<>From <em>manuscript</em> to inspectable score in four deterministic steps.</>}
            lead="The pipeline is built so that any step can be paused, audited, or re-run. No black box. No proprietary AI judgment without a traceable evidence chain."
          />
          <div className="steps section-body">
            {steps.map((step) => (
              <div className="step" key={step.n}>
                <div className="step-num">Step {step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
                <div className="step-output"><strong>{step.output}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="taxonomy">
        <div className="container">
          <SectionHead
            index={4}
            label="The CRWE Taxonomy"
            headingId="taxonomy-heading"
            title="A common taxonomy of research weakness — versioned, public, challengeable."
            lead={`The Common Research Weakness Enumeration (CRWE) is the spine of every Referee score. ${CRWE_TOP_LEVEL_GROUPS} top-level categories — six core categories and five method modules — and ${CRWE_LEAF_CHECKS} structured checks, with an open mechanism for proposing additions.`}
          />
          <p className="taxonomy-meta section-body">
            Current version · <strong>{CRWE_VERSION_LABEL}</strong> · {CRWE_LEAF_CHECKS} structured checks across {CRWE_TOP_LEVEL_GROUPS} top-level categories
          </p>
          {/* A real table, so screen readers can read it by row and column.
              The explicit ARIA roles look redundant but are needed: on
              phones the CSS turns each row into a stacked card
              (display: grid), and browsers stop exposing table semantics for
              elements whose display is no longer table-*. The roles keep
              them. */}
          <div className="taxonomy mt-4">
            <table role="table" aria-labelledby="taxonomy-heading">
              <thead role="rowgroup">
                <tr role="row">
                  <th role="columnheader" scope="col">ID</th>
                  <th role="columnheader" scope="col">Category · scope</th>
                  <th role="columnheader" scope="col">Group</th>
                  <th role="columnheader" scope="col">Checks</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {taxonomy.map((row) => (
                  <tr role="row" key={row.id}>
                    <td role="cell" className="taxonomy-id">{row.id}</td>
                    <td role="cell" className="taxonomy-name"><strong>{row.name}</strong><span>{row.scope}</span></td>
                    <td role="cell" className="taxonomy-group"><span className={row.group === "Core" ? "tag tag-primary" : "tag"}>{row.group}</span></td>
                    <td role="cell" className="taxonomy-checks">
                      {row.checks} checks
                      <span className="taxonomy-bar" aria-hidden="true">
                        <span style={{ width: `${Math.round((row.checks / maxChecks) * 100)}%` }} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="audience">
        <div className="container">
          <SectionHead index={5} label="Who It Serves" title="Built for institutions that make consequential decisions about scholarship." />
          <div className="audience section-body">
            {audiences.map(({ icon: Icon, title, body, tag }) => (
              <article className="card-flat" key={title}>
                <div className="aud-icon"><Icon aria-hidden="true" /></div>
                <h4>{title}</h4>
                <p>{body}</p>
                <div className="aud-tag">{tag}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface" id="status">
        <div className="container">
          <SectionHead
            index={6}
            label="Honest Limits"
            title="What works today, and what is still imperfect."
            lead="Referee normalizes uncertainty. The same restraint we ask of published work, we ask of ourselves. This is the current state of the system, written plainly."
          />
          <div className="status-grid section-body">
            <div className="status-col card-flat card-tint">
              <h3>Working today</h3>
              <ul className="status-list">
                {statusLive.map((item) => <li key={item}><span className="status-tag">Live</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="status-col card-flat">
              <h3>Still improving</h3>
              <ul className="status-list improving">
                {statusImproving.map((item) => <li key={item}><span className="status-tag">WIP</span><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionHead index={7} label="Stewardship" title="Built by people who care about the standing of the record." />
          <div className="founder section-body">
            <Image className="founder-portrait" src="/Erik_Schneider.png" alt="Portrait of Erik Schneider" width={240} height={300} sizes="220px" />
            <div>
              <h3>Erik Schneider</h3>
              <div className="credential">Founder · UVA · Vanderbilt MBA · TU/e MS</div>
              <blockquote className="founder-quote">“The verdict deserves the same scrutiny as the science. Until we preserve the reasoning, we are reading conclusions on faith.”</blockquote>
              <p>Erik leads product vision, architecture, and implementation. His background spans finance, cybersecurity, and insider risk — fields where the cost of an unverified claim is paid in real decisions.</p>
              <p style={{ marginTop: 14 }}><Link href="/about" className="link-detail">Read more about the project</Link></p>
            </div>
          </div>
          <div className="founder-divider">
            <p className="eyebrow" style={{ marginBottom: 20 }}>Advisor</p>
            <div className="founder">
              <Image className="founder-portrait" src="/Marcus_Thomas.jpg" alt="Portrait of Dr. Marcus Thomas" width={240} height={300} sizes="220px" />
              <div>
                <h3>Dr. Marcus Thomas</h3>
                <div className="credential">Computational Scientist · Research Associate, Memorial Sloan Kettering Cancer Center</div>
                <p>Dr. Thomas’s work at the intersection of immuno-oncology, computer science, and statistical physics informs Referee’s approach to evidence chains in clinical research — where the cost of a hidden flaw is paid by patients in trials.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="demo" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-block">
            <p className="eyebrow"><span className="eyebrow-tick" />Curated demo</p>
            <h2>See a real paper, scored against CRWE {CRWE_VERSION_LABEL}.</h2>
            <p>Walk a curated paper end-to-end: the category vector, the evidence trail, and what is still unresolved. Then book a guided walkthrough if you want to see how the same record fits your editorial intake or triage workflow.</p>
            <div className="cta-actions">
              <a className="btn btn-primary" href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL} <span className="arrow" aria-hidden="true">→</span></a>
              <a className="btn btn-secondary" href={CTA_SECONDARY_HREF}>{CTA_SECONDARY_LABEL}</a>
            </div>
            <div className="cta-meta"><span>Editorial intake</span><span>Conference triage</span><span>API roadmap</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
