import {
  CRWE_LEAF_CHECKS,
  CRWE_VERSION_LABEL,
  CTA_PRIMARY_HREF,
  CTA_PRIMARY_LABEL,
  CTA_SECONDARY_HREF,
  CTA_SECONDARY_LABEL,
} from "@/lib/copy";

// Illustrative category vector for the sample reliability report.
// These rows use real CRWE v2.1 top-level category names from the taxonomy
// (shown as a subset so the hero card stays legible).
const categories = [
  { name: "Data integrity", got: 0, max: 55, level: "low" },
  { name: "Study design", got: 38, max: 76, level: "med" },
  { name: "Statistical specification", got: 23, max: 45, level: "med" },
  { name: "Reporting consistency", got: 15, max: 29, level: "med" },
  { name: "Reproducibility & availability", got: 1, max: 24, level: "low" },
] as const;

/**
 * Sample reliability report. Rendered twice on the home page: in the hero,
 * and (with `audit`) in the "Anatomy of a Score" section, where it also
 * shows the provenance block.
 */
export function ScoreCard({ audit = false }: { audit?: boolean }) {
  return (
    <article className="score-card" aria-label="Sample reliability score (illustrative)">
      <header className="score-card-header">
        <div className="score-card-stamp">
          <strong>Reliability Report · Illustrative</strong><br />
          DOI 10.1056/NEJM199912093412402 · NEJM · Dec 9, 1999
        </div>
        <span className="score-card-status">Reviewed</span>
      </header>
      <div className="score-card-body">
        <div className="score-headline">
          <div className="score-title">
            “The effect of <em>bisoprolol</em> on perioperative mortality and myocardial infarction in high-risk patients undergoing vascular surgery”
          </div>
          <div className="score-number-wrap">
            {/* `low` colours the number like the low bars below it. */}
            <div className="score-number low">5</div>
            <div className="score-denom">/ 100</div>
            <div className="score-confidence">Known flawed paper</div>
          </div>
        </div>
        <div className="score-divider">CRWE v2.1 Category Vector · Illustrative</div>
        <div className="score-cats">
          {categories.map((cat) => {
            const pct = Math.round((cat.got / cat.max) * 100);
            return (
              <div key={cat.name}>
                <div className="score-cat">
                  <div className="score-cat-name">{cat.name}</div>
                  <div className="score-cat-val">{cat.got}/{cat.max}</div>
                </div>
                {/* The width comes from the data, so it stays an inline style. */}
                <div className={`score-cat-bar ${cat.level}`}><span style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>
        <div className="score-evidence">
          <span><strong>47</strong> evidence refs</span>
          <span><strong className="is-warning">3</strong> unresolved</span>
          <a href="#anatomy">Inspect ↗</a>
        </div>
        {audit ? (
          <div className="score-audit">
            <div>checked: 2026-04-23T14:22:08Z</div>
            <div>scope: methodology, statistics, reproducibility, transparency, citations</div>
            <div>out-of-scope: novelty assessment, peer-review of theoretical contribution</div>
            <div>hash: sha256/9a3c…b7f2</div>
          </div>
        ) : null}
      </div>
      <div className="score-card-footer">
        <span>CRWE-taxonomy <span className="hash">{CRWE_VERSION_LABEL}</span></span>
        <span>score: <span className="hash">5/100</span></span>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        {/* The direct children of .hero-copy rise in one after another
            (see the staggered animation-delay rules in globals.css). */}
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="tag tag-primary">CRWE {CRWE_VERSION_LABEL}</span>
          </p>
          <h1>A transparent reliability score for <em>every</em> scholarly paper.</h1>
          <p className="hero-tagline">Adding quality and nuance to the scholarly record.</p>
          <p className="hero-lede">
            Referee evaluates manuscripts against the CRWE flaw taxonomy and produces versioned, machine-readable reliability scores with inspectable evidence — built for editorial intake, conference triage, and integration into existing scholarly workflows.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL} <span className="arrow" aria-hidden="true">→</span></a>
            <a className="btn btn-secondary" href={CTA_SECONDARY_HREF}>{CTA_SECONDARY_LABEL}</a>
          </div>
          <dl className="hero-facts">
            <div><dt>Taxonomy</dt><dd>CRWE {CRWE_VERSION_LABEL}</dd></div>
            <div><dt>Checks</dt><dd>{CRWE_LEAF_CHECKS} structured</dd></div>
            <div><dt>Output</dt><dd>Versioned & re-derivable</dd></div>
          </dl>
        </div>

        <div className="hero-visual">
          <p className="eyebrow hero-visual-label">Illustrative report</p>
          {/* .bracket-frame draws the logo's sky brackets around the card. The
              card resets itself to light-surface colours (see the role tokens
              in globals.css), so it reads correctly on the navy hero. */}
          <div className="bracket-frame">
            <ScoreCard />
          </div>
        </div>
      </div>
    </section>
  );
}
