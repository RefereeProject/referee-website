const categories = [
  { name: "Methodology", got: 18, max: 25, level: "high" },
  { name: "Statistical validity", got: 15, max: 20, level: "high" },
  { name: "Reproducibility", got: 12, max: 15, level: "high" },
  { name: "Transparency", got: 14, max: 20, level: "med" },
  { name: "Citation integrity", got: 13, max: 20, level: "med" },
] as const;

export function ScoreCard({ audit = false }: { audit?: boolean }) {
  return (
    <article className="score-card" aria-label="Sample reliability score">
      <header className="score-card-header">
        <div className="score-card-stamp">
          <strong>Reliability Report</strong><br />
          REF-2026-0418 · Climate Sci. · J. of Atm. Studies
        </div>
        <span className="score-card-status">Reviewed</span>
      </header>
      <div className="score-card-body">
        <div className="score-headline">
          <div className="score-title">
            “On <em>multidecadal</em> sea-surface temperature attribution in the North Atlantic”
          </div>
          <div className="score-number-wrap">
            <div className="score-number">72</div>
            <div className="score-denom">/ 100</div>
            <div className="score-confidence">Confidence · 0.84</div>
          </div>
        </div>
        <div className="score-divider">Category Vector</div>
        <div className="score-cats">
          {categories.map((cat) => {
            const pct = Math.round((cat.got / cat.max) * 100);
            return (
              <div key={cat.name}>
                <div className="score-cat">
                  <div className="score-cat-name">{cat.name}</div>
                  <div className="score-cat-val">{cat.got}/{cat.max}</div>
                </div>
                <div className={`score-cat-bar ${cat.level}`}><span style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>
        <div className="score-evidence">
          <span><strong style={{ color: "var(--ink)" }}>47</strong> evidence refs</span>
          <span><strong style={{ color: "var(--warning)" }}>3</strong> unresolved</span>
          <a href="#anatomy">Inspect ↗</a>
        </div>
        {audit ? (
          <div className="mono" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed var(--border-strong)", fontSize: 10, lineHeight: 1.7, color: "var(--text-muted)", letterSpacing: ".02em" }}>
            <div>checked: 2026-04-23T14:22:08Z</div>
            <div>scope: methodology, statistics, reproducibility, transparency, citations</div>
            <div>oo-scope: novelty assessment, peer-review of theoretical contribution</div>
            <div>hash: sha256/9a3c…b7f2</div>
          </div>
        ) : null}
      </div>
      <div className="score-card-footer">
        <span>CRWE-taxonomy <span className="hash">v0.4.1</span></span>
        <span>methodology: <span className="hash">18/25</span></span>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" style={{ padding: "64px 0 48px", borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, rgba(243,247,244,.55) 0%, rgba(250,249,244,1) 60%)" }}>
      <div className="container">
        <div className="hero-doi" style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
          <span className="tag tag-primary">CRWE v0.4.1</span>
          <span className="eyebrow">Adding quality and nuance to the scholarly record</span>
          <span className="eyebrow" style={{ marginLeft: "auto" }}>Demo live</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(320px,1fr)", gap: 64, alignItems: "start" }} className="hero-grid">
          <div>
            <p className="eyebrow"><span className="eyebrow-tick" />Research-integrity infrastructure</p>
            <h1 style={{ marginTop: 8 }}>A transparent reliability score for <em style={{ color: "var(--primary-800)" }}>every</em> scholarly paper.</h1>
            <p className="lede-serif" style={{ marginTop: 24, maxWidth: 560 }}>
              Referee evaluates manuscripts against the CRWE flaw taxonomy and produces versioned, machine-readable reliability scores with inspectable evidence — built for editorial intake, conference triage, and integration into existing scholarly workflows.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="mailto:erik@referee-project.com?subject=Referee%20demo%20request">Book a demo <span className="arrow">→</span></a>
              <a className="btn btn-secondary" href="#method">How scoring works</a>
            </div>
            <div className="mono" style={{ marginTop: 32, paddingTop: 18, borderTop: "1px solid var(--border)", display: "flex", gap: 32, flexWrap: "wrap", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span>Status · <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Demo live</strong></span>
              <span>Taxonomy · <strong style={{ color: "var(--ink)", fontWeight: 500 }}>CRWE v0.4.1</strong></span>
              <span>Output · <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Versioned &amp; re-derivable</strong></span>
            </div>
          </div>
          <div><ScoreCard /></div>
        </div>
      </div>
    </section>
  );
}
