import { cn } from "@/lib/utils";

interface CTABlockProps {
  heading: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}

/**
 * Navy call-to-action card that closes a page. `.cta-block` is a navy
 * surface, so the buttons and text inside it switch to their on-navy colours
 * automatically (see the role tokens in globals.css).
 */
export function CTABlock({ heading, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel, className }: CTABlockProps) {
  return (
    <section className={cn("cta-block", className)}>
      <p className="eyebrow"><span className="eyebrow-tick" />Next step</p>
      <h2>{heading}</h2>
      <p>{description}</p>
      <div className="cta-actions">
        <a href={primaryHref} className="btn btn-primary">{primaryLabel} <span className="arrow" aria-hidden="true">→</span></a>
        {secondaryHref && secondaryLabel ? <a href={secondaryHref} className="btn btn-secondary">{secondaryLabel}</a> : null}
      </div>
    </section>
  );
}
