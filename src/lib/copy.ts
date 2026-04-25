/**
 * Copy constants module for The Referee Project.
 *
 * Centralises preferred terminology, banned terms, tone guidelines,
 * and reusable copy strings so every page speaks with one voice.
 *
 * Guidelines derived from PRD §6, §11, §13.
 */

// ---------------------------------------------------------------------------
// Preferred terminology — use these phrases in place of ad-hoc alternatives
// ---------------------------------------------------------------------------
export const PREFERRED_TERMS = {
  /** The numeric output Referee produces for a paper */
  reliabilityScore: "transparent reliability score",
  /** The per-paper output record */
  scholarlyRecord: "scholarly record",
  /** Describes auditability of the system's outputs */
  inspectable: "inspectable",
  /** What Referee produces — not a "grade" or "rating" */
  structuredEvaluation: "structured evaluation",
  /** Qualifier for claims — grounded in evidence, not opinion */
  evidenceBacked: "evidence-backed",
  /** Output format characteristic */
  machineReadable: "machine-readable",
  /** The categorical weakness framework */
  flawTaxonomy: "flaw taxonomy",
  /** Acronym for the weakness enumeration system */
  crwe: "CRWE (Common Research Weakness Enumeration)",
} as const;

// ---------------------------------------------------------------------------
// Banned hero / primary-messaging terms
// ---------------------------------------------------------------------------
export const BANNED_HERO_TERMS = [
  "founder-led",
  "pre-seed",
  "startup",
] as const;

// ---------------------------------------------------------------------------
// Tone guidelines — clinical, serious, technical, restrained
// ---------------------------------------------------------------------------
export const TONE_GUIDELINES = {
  voice: "clinical and technical",
  register: "serious, restrained — never hype or manifesto-like",
  precision:
    "Do not claim '300+' anything without specifying what. Be exact about what the system checks.",
  avoid: [
    "hype language",
    "manifesto / movement framing",
    "nonprofit-movement language",
    "vague superlatives",
  ],
} as const;

// ---------------------------------------------------------------------------
// Reusable copy strings
// ---------------------------------------------------------------------------

/** Short tagline for meta descriptions and compact contexts */
export const TAGLINE =
  "Research-integrity infrastructure for high-volume scholarly publishing";

/** Hero eyebrow — replaces the banned "Founder-led, pre-seed..." line */
export const HERO_EYEBROW = "Adding quality and nuance to the scholarly record";

/** Hero headline */
export const HERO_HEADLINE =
  "Referee is research-integrity infrastructure for high-volume scholarly publishing.";

/** Hero subtitle */
export const HERO_SUBTITLE =
  "We turn scientific and technical evidence into machine-readable reliability scores through a transparent flaw taxonomy. The taxonomy shows where a paper is weak and what has been checked. Referee supports structured triage by making screening outputs inspectable, reproducible, and auditable.";

/** Honest-limits disclaimer shown below hero CTAs */
export const HERO_DISCLAIMER =
  "Demo available today: dashboard and paper-checking workflow are live. False positives and coverage depth are still improving.";

/** Footer description — product-focused, no banned terms */
export const FOOTER_DESCRIPTION =
  "Adding quality and nuance to the scholarly record.";

/** Homepage meta description */
export const HOME_META_DESCRIPTION =
  "Referee is research-integrity infrastructure for high-volume scholarly publishing, turning technical evidence into transparent, machine-readable reliability scores for structured triage.";

/** About page intro description */
export const ABOUT_INTRO_DESCRIPTION =
  "Referee is research-integrity infrastructure for scholarly publishing, built to make research reliability transparent, auditable, and machine-readable.";

/** About page mission statement — clinical, not manifesto */
export const ABOUT_MISSION =
  "Referee applies a structured flaw taxonomy to scholarly papers, producing transparent reliability scores that surface specific weaknesses. The system makes screening outputs inspectable, machine-readable, and auditable. The goal is practical: improve the consistency and traceability of intake evaluation at scale.";

/** About page meta description */
export const ABOUT_META_DESCRIPTION =
  "Meet the team behind The Referee Project. Learn how Referee applies structured evaluation and transparent reliability scores to scholarly research.";

// ---------------------------------------------------------------------------
// CRWE taxonomy version constants — single source of truth for marketing copy.
// Update these when the CRWE source of truth (in /Volumes/HomeX/erikschneider/crwe)
// publishes a new version so every page stays in sync.
// ---------------------------------------------------------------------------

/** Current published CRWE taxonomy version, prefixed with `v`. */
export const CRWE_VERSION_LABEL = "v2.1";

/**
 * Number of top-level categories in CRWE v2.1: six core categories (1–6)
 * plus five method modules (M1–M5). Surfaces in the homepage taxonomy
 * section and the footer bottom row. The legacy export name is preserved
 * so existing imports continue to compile; public-facing copy now reads
 * "top-level categories" per stakeholder request.
 */
export const CRWE_TOP_LEVEL_GROUPS = 11;
/** Preferred semantic alias used by new call sites. */
export const CRWE_TOP_LEVEL_CATEGORIES = CRWE_TOP_LEVEL_GROUPS;

/** Total leaf-level structured checks in CRWE v2.1 (verified against `taxonomy/2.1/leaf-index.json`). */
export const CRWE_LEAF_CHECKS = 300;

// ---------------------------------------------------------------------------
// Primary call-to-action copy — `See a scored paper` is the high-EV action,
// `Book a walkthrough` is secondary. Centralised so every page agrees.
// ---------------------------------------------------------------------------

/**
 * Public demo URL exposing the curated scored-papers experience. The
 * marketing site links here for the primary CTA. When the demo is moved or
 * rebranded, update this constant; do not hardcode the URL elsewhere.
 */
export const DEMO_URL = "https://demo.referee-project.com";

/** Primary CTA label — drives traffic to the curated scored-paper demo. */
export const CTA_PRIMARY_LABEL = "See a scored paper";

/** Primary CTA destination — the public demo. */
export const CTA_PRIMARY_HREF = DEMO_URL;

/** Secondary CTA label — for prospects who want a guided walkthrough. */
export const CTA_SECONDARY_LABEL = "Book a walkthrough";

/** Secondary CTA destination — pre-filled mail to Erik. */
export const CTA_SECONDARY_HREF =
  "mailto:erik@referee-project.com?subject=Referee%20walkthrough%20request";
