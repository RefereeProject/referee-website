import Image from "next/image";
import Link from "next/link";

interface FounderTeaserProps {
  /** Founder's display name */
  name: string;
  /** Path to the founder's photo (relative to /public) */
  image: string;
  /** One-line tagline or role description */
  tagline: string;
  /** Optional link to a full bio or about page */
  link?: string;
}

/**
 * Compact founder teaser section.
 * Shows a photo, name, tagline, and optional "Learn more" link.
 * Used on landing pages where a full bio section would be too heavy.
 */
export function FounderTeaser({ name, image, tagline, link }: FounderTeaserProps) {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-5">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-sm text-foreground-muted">{tagline}</p>
          {link && (
            <Link
              href={link}
              className="mt-1 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
