import Link from "next/link";

/** Footer navigation links ordered by marketing priority (PRD §16.2) */
const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Objections & Principles", href: "/faq" },
  { label: "Demo", href: "mailto:erik@referee-project.com?subject=Referee%20demo%20request" },
  { label: "Blog", href: "/blog" },
  { label: "Talks", href: "/blog" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-10 mt-16 bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm sm:text-base text-foreground-muted">
        {/* Footer navigation — marketing stack order */}
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 mb-4">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-center sm:text-left">&copy; 2026 Referee. All rights reserved.</p>
        <p className="text-center sm:text-left mt-2">Adding quality and nuance to the scholarly record.</p>
      </div>
    </footer>
  );
}
