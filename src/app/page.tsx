import type { Metadata } from "next";
import Image from "next/image";
import { Hero, ScoreCard } from "@/components/Hero";
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

export const metadata: Metadata = {
  title: "Referee | A transparent reliability score for every scholarly paper",
  description: HOME_META_DESCRIPTION,
  openGraph: { title: "Referee | A transparent reliability score for every scholarly paper", description: HOME_META_DESCRIPTION, type: "website", siteName: "Referee", images: [{ url: "/Referee_new_logo.png", width: 512, height: 512, alt: "Referee logo" }] },
  twitter: { card: "summary", title: "Referee | A transparent reliability score for every scholarly paper", description: HOME_META_DESCRIPTION, images: ["/Referee_new_logo.png"] },
};

const steps = [
  ["01", "Ingest", "Manuscript and supplementary materials are parsed into structured screening context — text, tables, figures, references, methods.", "Input: manuscript.pdf · hash: sha256/…"],
  ["02", "Map", "Claims are mapped to categories in the CRWE flaw taxonomy. Each claim becomes a checkable assertion with provenance.", "Output: claim graph · 248 nodes"],
  ["03", "Check", "Structured checks run against each claim — statistical sanity, reproducibility, citation integrity, transparency, and methodology.", "Output: 47 evidence refs · 3 unresolved"],
  ["04", "Preserve", "A versioned, machine-readable reliability score is written to the record, with the full evidence trail attached and re-derivable.", `Output: score.json · ${CRWE_VERSION_LABEL} · 72/100`],
] as const;

// CRWE v2.1 surface — six core categories (1–6) plus five method modules (M1–M5),
// totalling eleven top-level categories and 300 leaf checks. Leaf counts come from
// crwe/taxonomy/2.1/leaf-index.json and stay in sync with `CRWE_LEAF_CHECKS`.
const taxonomy = [
  ["CRWE-01", "Data integrity", "Operational definitions, data sources, missingness, transformations, and merge rules.", "Core", "55 checks"],
  ["CRWE-02", "Study design", "Research questions, sampling frames, randomization, identification strategy, and preregistration.", "Core", "76 checks"],
  ["CRWE-03", "Statistical specification", "Model choice, assumption checks, multiplicity correction, missing-data handling, and uncertainty reporting.", "Core", "45 checks"],
  ["CRWE-04", "Reporting consistency", "Internal coherence between abstract, methods, and results; calibrated claims and limitations.", "Core", "29 checks"],
  ["CRWE-05", "Figures & evidence linkage", "Axis labelling, axis truncation, citation backing for headline claims, and use of retracted sources.", "Core", "14 checks"],
  ["CRWE-06", "Reproducibility & availability", "Data and code availability, software/environment specs, persistent identifiers, and execution success.", "Core", "24 checks"],
  ["CRWE-M1", "Predictive modelling", "Train/validation splits, leakage, hyperparameter procedure, evaluation metrics, and architecture disclosure.", "Module", "16 checks"],
  ["CRWE-M2", "Systematic review & meta-analysis", "Search reproducibility, data extraction, risk-of-bias assessment, model choice, and sensitivity analyses.", "Module", "14 checks"],
  ["CRWE-M3", "Simulation & numerical modelling", "Governing equations, solver and discretization choices, and verification/validation evidence.", "Module", "9 checks"],
  ["CRWE-M4", "Formal & theoretical work", "Definition discipline, lemma dependencies, and step-by-step proof correctness.", "Module", "9 checks"],
  ["CRWE-M5", "Qualitative research", "Sampling strategy, coding procedures, and interpretive transparency for qualitative inquiry.", "Module", "9 checks"],
] as const;

const audiences = [
  ["J", "Journals & publishers", "Unify fragmented integrity checks; expose what was evaluated and what remains open.", "Editorial intake"],
  ["C", "Conference organizers", "Triage submissions when volume outpaces reviewer capacity, without lowering the bar.", "Program chairs"],
  ["F", "Funders & policy teams", "Assess research reliability before funding decisions, with an auditable evidence chain.", "Grant review"],
  ["R", "Research organizations", "Run structured evaluation at scale; preserve transparent records of weakness and uncertainty.", "Internal review"],
  ["D", "Diligence teams", "Evaluate scholarly claims behind investment, biotech, and enterprise R&D decisions.", "Due diligence"],
  ["L", "Libraries & archives", "Attach machine-readable reliability metadata to the works you preserve and surface.", "Curation"],
] as const;

function SectionHead({ num, label, title, lead }: { num: string; label: string; title: React.ReactNode; lead?: string }) {
  return <div className="section-head"><div className="label"><span className="num">§{num}</span>{label}</div><div><h2>{title}</h2>{lead ? <p className="lead">{lead}</p> : null}</div></div>;
}

function AnatomyRow({ tag, label, body }: { tag: string; label: string; body: string }) {
  return <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, paddingBottom: 18, borderBottom: "1px solid var(--border)" }}><div className="mono" style={{ fontSize: 11, letterSpacing: ".14em", color: "var(--primary-800)", paddingTop: 3 }}>{tag}</div><div><div className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{label}</div><div style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.55 }}>{body}</div></div></div>;
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="section" id="why"><div className="container"><SectionHead num="01" label="The Problem" title="The scholarly record asks for too much trust, and offers too little evidence." lead="Peer review preserves a verdict — accept, reject, revise — but the reasoning behind that verdict is rarely written down, and almost never machine-readable. Reliability becomes folklore." />
        <div className="compare"><div className="compare-col opaque"><div className="compare-head">Today · Opaque review</div><h3>The verdict survives.<br />The reasoning does not.</h3><ul><li>Reviewer judgments vary; criteria are rarely declared.</li><li>Findings live in private comment threads, not the record.</li><li>No category-level breakdown; no traceable evidence chain.</li><li>Limitations are footnotes, not first-class outputs.</li><li>Two papers with identical flaws may receive opposite verdicts.</li></ul></div><div className="compare-col transparent"><div className="compare-head">Referee · Structured transparency</div><h3>Verdict and evidence,<br />preserved together.</h3><ul><li>Every check maps to an explicit CRWE flaw category.</li><li>Findings link back to the source passage that produced them.</li><li>Category vector exposes strengths and weaknesses, not a single grade.</li><li>Unresolved items are surfaced — uncertainty becomes part of the output.</li><li>Same evidence, same taxonomy version — versioned, inspectable, and re-derivable.</li></ul></div></div>
      </div></section>

      <section className="section" id="anatomy" style={{ background: "var(--surface)" }}><div className="container"><SectionHead num="02" label="Anatomy of a Score" title={<>The score is an <em style={{ fontStyle: "italic" }}>instrument</em>, not a verdict.</>} lead="A reliability score is a data object: a number, a category vector, an evidence count, an unresolved-item list, a taxonomy version, and a hash of the input. It is meant to be inspected, challenged, and re-derived — not believed." />
        <div className="anatomy-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 32, alignItems: "start" }}><ScoreCard audit /><div style={{ display: "grid", gap: 18 }}><AnatomyRow tag="01" label="Aggregate score" body="Composite of category-level points. Never the only thing visible — always paired with the vector that produced it." /><AnatomyRow tag="02" label="Category vector" body="The five-axis decomposition with explicit denominators." /><AnatomyRow tag="03" label="Evidence references" body="Each finding links to the passage, table, figure, or supplementary file that produced it." /><AnatomyRow tag="04" label="Unresolved items" body="Checks that did not run, did not converge, or fell out of scope. Made visible — never hidden." /><AnatomyRow tag="05" label="Provenance" body="Taxonomy version, scoring-model version, timestamp, and input hash — so any score can be reproduced." /></div></div>
      </div></section>

      <section className="section" id="method"><div className="container"><SectionHead num="03" label="Method" title={<>From <em style={{ fontStyle: "italic" }}>manuscript</em> to inspectable score in four deterministic steps.</>} lead="The pipeline is built so that any step can be paused, audited, or re-run. No black box. No proprietary AI judgment without a traceable evidence chain." />
        <div className="steps">{steps.map(([n, title, body, out]) => <div className="step" key={n}><div className="step-num">Step {n}</div><h4>{title}</h4><p>{body}</p><div className="step-output"><strong>{out}</strong></div></div>)}</div>
      </div></section>

      <section className="section" id="taxonomy" style={{ background: "var(--surface-muted)" }}><div className="container"><SectionHead num="04" label="The CRWE Taxonomy" title="A common taxonomy of research weakness — versioned, public, challengeable." lead={`The Common Research Weakness Enumeration (CRWE) is the spine of every Referee score. ${CRWE_TOP_LEVEL_GROUPS} top-level categories — six core categories and five method modules — and ${CRWE_LEAF_CHECKS} structured checks, with an open mechanism for proposing additions.`} />
        <p className="mono" style={{ margin: "14px 0 18px 248px", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Current version · <strong style={{ color: "var(--ink)" }}>{CRWE_VERSION_LABEL}</strong> · {CRWE_LEAF_CHECKS} structured checks across {CRWE_TOP_LEVEL_GROUPS} top-level categories</p>
        <div className="taxonomy"><div className="taxonomy-head"><div>ID</div><div>Category · scope</div><div>Group</div><div>Checks</div></div>{taxonomy.map(([id, name, desc, group, checks]) => <div className="taxonomy-row" key={id}><div className="taxonomy-id">{id}</div><div className="taxonomy-name"><strong>{name}</strong><span>{desc}</span></div><div className="taxonomy-points">{group}</div><div className="taxonomy-checks">{checks}</div></div>)}</div>
      </div></section>

      <section className="section" id="audience"><div className="container"><SectionHead num="05" label="Who It Serves" title="Built for institutions that make consequential decisions about scholarship." />
        <div className="audience">{audiences.map(([mark, title, body, tag]) => <article className="card-flat" key={title}><div className="aud-icon">{mark}</div><h4>{title}</h4><p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.55, marginTop: 6 }}>{body}</p><div className="aud-tag">{tag}</div></article>)}</div>
      </div></section>

      <section className="section" id="status"><div className="container"><SectionHead num="06" label="Honest Limits" title="What works today, and what is still imperfect." lead="Referee normalizes uncertainty. The same restraint we ask of published work, we ask of ourselves. This is the current state of the system, written plainly." />
        <div className="status-grid"><div className="status-col card-flat card-tint"><h3>Working today</h3><ul className="status-list"><li><span className="status-tag">Live</span><span>Curated scored-paper experience with the full evidence trail.</span></li><li><span className="status-tag">Live</span><span>Structured scoring against CRWE {CRWE_VERSION_LABEL} flaw categories.</span></li><li><span className="status-tag">Live</span><span>Machine-readable output with evidence links.</span></li><li><span className="status-tag">Live</span><span>Versioned scores with full provenance.</span></li></ul></div><div className="status-col card-flat"><h3>Still improving</h3><ul className="status-list improving"><li><span className="status-tag">WIP</span><span>Coverage breadth across research domains.</span></li><li><span className="status-tag">WIP</span><span>False-positive reduction in edge cases.</span></li><li><span className="status-tag">WIP</span><span>Additional flaw categories under development.</span></li><li><span className="status-tag">WIP</span><span>API access for integration partners.</span></li></ul></div></div>
      </div></section>

      <section className="section" id="about" style={{ background: "var(--surface)" }}><div className="container"><SectionHead num="07" label="Stewardship" title="Built by people who care about the standing of the record." />
        <div className="founder"><Image className="founder-portrait" src="/Erik_Schneider.png" alt="Portrait of Erik Schneider" width={240} height={300} /><div><h3>Erik Schneider</h3><div className="credential">Founder · UVA · Vanderbilt MBA · TU/e MS</div><div className="founder-quote">“The verdict deserves the same scrutiny as the science. Until we preserve the reasoning, we are reading conclusions on faith.”</div><p>Erik leads product vision, architecture, and implementation. His background spans finance, cybersecurity, and insider risk — fields where the cost of an unverified claim is paid in real decisions.</p><p style={{ marginTop: 14 }}><a href="/about" className="link-detail">Read more about the project</a></p></div></div>
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}><div className="credential">Advisor</div><div className="founder"><Image className="founder-portrait" src="/Marcus_Thomas.jpg" alt="Portrait of Dr. Marcus Thomas" width={240} height={300} /><div><h3>Dr. Marcus Thomas</h3><div className="credential">Computational Scientist · Research Associate, Memorial Sloan Kettering Cancer Center</div><p>Dr. Thomas’s work at the intersection of immuno-oncology, computer science, and statistical physics informs Referee’s approach to evidence chains in clinical research — where the cost of a hidden flaw is paid by patients in trials.</p></div></div></div>
      </div></section>

      <section className="section" id="demo"><div className="container"><div className="cta-block"><p className="eyebrow"><span className="eyebrow-tick" style={{ background: "rgba(255,255,255,.4)" }} />Curated demo</p><h2>See a real paper, scored against CRWE {CRWE_VERSION_LABEL}.</h2><p>Walk a curated paper end-to-end: the category vector, the evidence trail, and what is still unresolved. Then book a guided walkthrough if you want to see how the same record fits your editorial intake or triage workflow.</p><div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}><a className="btn btn-primary" href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL} <span className="arrow">→</span></a><a className="btn btn-secondary" href={CTA_SECONDARY_HREF}>{CTA_SECONDARY_LABEL}</a></div><div className="mono" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.18)", display: "flex", gap: 32, flexWrap: "wrap", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}><span>Editorial intake</span><span>Conference triage</span><span>API roadmap</span></div></div></div></section>
    </>
  );
}
