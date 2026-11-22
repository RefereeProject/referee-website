interface SectionHeadProps {
  /** Shown as a citation marker, e.g. 1 renders as [1]. Omit for no marker. */
  index?: number | string;
  /** Small kicker above the heading. Omit when the heading names the section on its own. */
  label?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** id for the heading, so a region elsewhere can point at it with aria-labelledby. */
  headingId?: string;
}

/**
 * Standard opening for a page section: a small label, the heading, and an
 * optional lead paragraph.
 *
 * The bracketed number echoes the [R] citation mark in the logo. It is
 * decorative (the label carries the meaning), so it is hidden from screen
 * readers, which would otherwise announce the generated brackets.
 */
export function SectionHead({ index, label, title, lead, headingId }: SectionHeadProps) {
  // A whitespace-only label counts as no label, so it cannot produce a
  // kicker line that looks empty.
  const hasLabel = Boolean(label?.trim());
  // `index` can legitimately be 0, so test for undefined rather than falsy.
  const hasIndex = index !== undefined;

  return (
    <div className="section-head">
      {hasLabel || hasIndex ? (
        // With only the marker and no label, the paragraph would hold nothing
        // a screen reader can announce. Hiding it keeps an empty paragraph out
        // of the accessibility tree while the marker still shows on screen.
        <p className="section-label" aria-hidden={hasLabel ? undefined : true}>
          {hasIndex ? <span className="cite" aria-hidden="true">{index}</span> : null}
          {hasLabel ? label : null}
        </p>
      ) : null}
      <h2 id={headingId}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
