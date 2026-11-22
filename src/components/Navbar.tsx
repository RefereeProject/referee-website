import Image from "next/image";
import Link from "next/link";
import { CTA_PRIMARY_HREF, CTA_PRIMARY_LABEL } from "@/lib/copy";
import { MobileNav } from "./MobileNav";
import { NavLinks, type NavLink } from "./NavLinks";

const navLinks: readonly NavLink[] = [
  { href: "/about", label: "About" },
  // Anchor link — `How it works` is a homepage section (#method).
  { href: "/#method", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Objections & Principles" },
];

/**
 * Sticky site header.
 *
 * Stays a Server Component: only the two small pieces that need the browser
 * (active-link state and the mobile menu) are Client Components.
 *
 * The brand uses the square [R] symbol with live text rather than the kit's
 * horizontal lockup image. At header height the lockup's "PROJECT" line would
 * be about 4px tall and unreadable; the full lockup is used in the footer,
 * where it has room.
 */
export function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand" aria-label="The Referee Project — home">
          <Image src="/referee-brand-kit/referee-symbol.svg" alt="" width={34} height={34} className="brand-logo" />
          <span className="brand-name">The Referee Project</span>
        </Link>

        {/* Hidden below 1024px, where MobileNav shows the same links. */}
        <nav className="nav nav-desktop" aria-label="Primary">
          <NavLinks links={navLinks} />
        </nav>

        <div className="header-actions">
          {/* Primary CTA: the curated scored-paper demo, matching the home hero.
              Below 640px it moves inside the mobile menu (see .mobile-nav-cta). */}
          <a href={CTA_PRIMARY_HREF} className="btn btn-primary btn-sm header-cta">
            {CTA_PRIMARY_LABEL} <span className="arrow" aria-hidden="true">→</span>
          </a>
          <MobileNav links={navLinks} ctaHref={CTA_PRIMARY_HREF} ctaLabel={CTA_PRIMARY_LABEL} />
        </div>
      </div>
    </header>
  );
}
