type PageIntroProps = { eyebrow?: string; title: string; description?: string; children?: React.ReactNode };

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="section-head">
          <div className="label">{eyebrow ? <><span className="num">§</span>{eyebrow}</> : "Referee"}</div>
          <div>
            <h1>{title}</h1>
            {description ? <p className="lede-serif" style={{ marginTop: 20, maxWidth: 760 }}>{description}</p> : null}
            {children ? <div style={{ marginTop: 18 }}>{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
