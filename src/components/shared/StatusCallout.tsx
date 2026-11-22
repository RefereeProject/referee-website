interface StatusCalloutProps { title: string; working: string[]; improving: string[] }

/** Two cards side by side: what works today, and what is still being improved. */
export function StatusCallout({ title, working, improving }: StatusCalloutProps) {
  return (
    <div className="status-grid">
      <div className="status-col card-flat card-tint">
        <h3>{title || "Working today"}</h3>
        <ul className="status-list">
          {working.map((item) => <li key={item}><span className="status-tag">Live</span><span>{item}</span></li>)}
        </ul>
      </div>
      <div className="status-col card-flat">
        <h3>Still improving</h3>
        <ul className="status-list improving">
          {improving.map((item) => <li key={item}><span className="status-tag">WIP</span><span>{item}</span></li>)}
        </ul>
      </div>
    </div>
  );
}
