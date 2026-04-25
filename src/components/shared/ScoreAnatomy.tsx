interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
}

interface ScoreAnatomyProps {
  score: number;
  categories: ScoreCategory[];
  evidenceCount: number;
  version?: string;
}

function levelForPercent(percent: number) {
  if (percent >= 75) return "high";
  if (percent >= 50) return "med";
  return "low";
}

export function ScoreAnatomy({ score, categories, evidenceCount, version }: ScoreAnatomyProps) {
  const maxTotal = categories.reduce((sum, c) => sum + c.maxScore, 0);

  return (
    <article className="score-card" aria-label="Referee score anatomy">
      <header className="score-card-header">
        <div className="score-card-stamp">
          <strong>Referee Score</strong><br />
          Overall reliability score · evidence-backed
        </div>
        <span className="score-card-status">Inspectable</span>
      </header>
      <div className="score-card-body">
        <div className="score-headline">
          <div className="score-title">Category vector with evidence provenance</div>
          <div className="score-number-wrap">
            <div className="score-number">{score}</div>
            <div className="score-denom">/ {maxTotal}</div>
            <div className="score-confidence">Evidence refs · {evidenceCount}</div>
          </div>
        </div>
        <div className="score-divider">Breakdown</div>
        <div className="score-cats">
          {categories.map((cat) => {
            const pct = cat.maxScore > 0 ? Math.round((cat.score / cat.maxScore) * 100) : 0;
            return (
              <div key={cat.name}>
                <div className="score-cat">
                  <div className="score-cat-name">{cat.name}</div>
                  <div className="score-cat-val">{cat.score}/{cat.maxScore}</div>
                </div>
                <div className={`score-cat-bar ${levelForPercent(pct)}`}><span style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>
      {version ? (
        <div className="score-card-footer">
          <span>Scoring model</span>
          <span className="hash">{version}</span>
        </div>
      ) : null}
    </article>
  );
}
