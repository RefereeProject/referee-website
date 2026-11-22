"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { href: string; label: string };

interface NavLinksProps {
  links: readonly NavLink[];
  /** "list" wraps each link in an <li> for the mobile menu's <ul>. */
  variant?: "inline" | "list";
  /** Called when a link is activated, so the mobile menu can close itself. */
  onNavigate?: () => void;
}

/**
 * Primary navigation links, shared by the desktop bar and the mobile menu.
 *
 * This is a Client Component only because it needs the current pathname to
 * mark the active page with aria-current. The link list itself is owned by
 * the (server) Navbar and passed in.
 */
export function NavLinks({ links, variant = "inline", onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return links.map((link) => {
    // Anchor links such as "/#method" point at a section, not a page, so
    // they are never the "current page".
    const isSection = link.href.includes("#");
    const isCurrent = !isSection && (pathname === link.href || pathname.startsWith(`${link.href}/`));

    const anchor = (
      <Link
        key={link.href}
        href={link.href}
        className="nav-link"
        aria-current={isCurrent ? "page" : undefined}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    );

    return variant === "list" ? <li key={link.href}>{anchor}</li> : anchor;
  });
}
