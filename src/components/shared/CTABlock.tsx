import { cn } from "@/lib/utils";
interface CTABlockProps { heading: string; description: string; primaryHref: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string; className?: string }
export function CTABlock({ heading, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel, className }: CTABlockProps) {
  return <section className={cn("cta-block", className)}><p className="eyebrow"><span className="eyebrow-tick" style={{ background: "rgba(255,255,255,.4)" }} />Next step</p><h2>{heading}</h2><p>{description}</p><div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}><a href={primaryHref} className="btn btn-primary">{primaryLabel} <span className="arrow">→</span></a>{secondaryHref && secondaryLabel ? <a href={secondaryHref} className="btn btn-secondary">{secondaryLabel}</a> : null}</div></section>;
}
