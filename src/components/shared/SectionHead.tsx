interface SectionHeadProps {
  /** Shown as a citation marker, e.g. 1 renders as [1]. Omit for no marker. */
  index?: number | string;
  label: string;
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
  return (
    <div className="section-head">
      <p className="section-label">
        {index !== undefined ? <span className="cite" aria-hidden="true">{index}</span> : null}
        {label}
      </p>
      <h2 id={headingId}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
