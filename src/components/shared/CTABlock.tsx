import { cn } from "@/lib/utils";

interface CTABlockProps {
  /** CTA section heading */
  heading: string;
  /** Supporting description text */
  description: string;
  /** Primary button destination (href) */
  primaryHref: string;
  /** Primary button label */
  primaryLabel: string;
  /** Optional secondary button destination */
  secondaryHref?: string;
  /** Optional secondary button label */
  secondaryLabel?: string;
  /** Optional additional CSS classes on the wrapper */
  className?: string;
}

/**
 * Call-to-action block with a heading, description, and up to two buttons.
 * Uses the primary accent background to match the existing "Book a demo"
 * section pattern in page.tsx.
 */
export function CTABlock({
  heading,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: CTABlockProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-primary-50/50 p-6 sm:p-8 text-center",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <p className="mt-3 max-w-3xl mx-auto text-foreground-secondary">
        {description}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Primary action */}
        <a
          href={primaryHref}
          className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center"
          {...(primaryHref.startsWith("mailto:") ? { "aria-label": `${primaryLabel} via email` } : {})}
        >
          {primaryLabel}
        </a>

        {/* Optional secondary action */}
        {secondaryHref && secondaryLabel && (
          <a
            href={secondaryHref}
            className="w-full sm:w-auto rounded-full px-8 py-3 sm:py-3.5 border-2 border-primary-600 text-primary-600 hover:bg-primary-100 transition-all duration-200 font-semibold text-center min-h-[48px] flex items-center justify-center"
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </section>
  );
}
