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
export const HERO_EYEBROW = "Transparent scholarly evaluation infrastructure";

/** Hero headline */
export const HERO_HEADLINE =
  "Referee is research-integrity infrastructure for high-volume scholarly publishing.";

/** Hero subtitle */
export const HERO_SUBTITLE =
  "We turn scientific and technical evidence into machine-readable reliability scores through a transparent flaw taxonomy. The taxonomy shows where a paper is weak, what has been checked, and what still requires human judgment. Referee supports structured triage and targeted expert review rather than replacing peer review.";

/** Honest-limits disclaimer shown below hero CTAs */
export const HERO_DISCLAIMER =
  "Demo available today: dashboard and paper-checking workflow are live. False positives and coverage depth are still improving.";

/** Footer description — product-focused, no banned terms */
export const FOOTER_DESCRIPTION =
  "Research-integrity infrastructure for scholarly publishing.";

/** Homepage meta description */
export const HOME_META_DESCRIPTION =
  "Referee is research-integrity infrastructure for high-volume scholarly publishing, turning technical evidence into transparent, machine-readable reliability scores for structured triage.";

/** About page intro description */
export const ABOUT_INTRO_DESCRIPTION =
  "Referee is research-integrity infrastructure for scholarly publishing, built to make research reliability transparent, auditable, and machine-readable.";

/** About page mission statement — clinical, not manifesto */
export const ABOUT_MISSION =
  "Referee applies a structured flaw taxonomy to scholarly papers, producing transparent reliability scores that surface specific weaknesses and unresolved checks. The system is designed to support — not replace — expert review by making screening outputs inspectable, machine-readable, and auditable. The goal is practical: improve the consistency and traceability of intake evaluation at scale so that expert time is spent on substantive questions rather than preliminary screening.";

/** About page meta description */
export const ABOUT_META_DESCRIPTION =
  "Meet the team behind The Referee Project. Learn how Referee applies structured evaluation and transparent reliability scores to scholarly research.";
