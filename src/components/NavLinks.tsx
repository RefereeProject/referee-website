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
    // they are never current.
    const isAnchor = link.href.includes("#");
    // "page" only for the page actually being viewed. On a page nested under
    // a link (a blog post under /blog) the link is marked "true": it is the
    // current section, but announcing it as the current page would be wrong.
    // The trailing slash in the prefix test stops "/blog" matching "/blogger",
    // and "/" is excluded because every path starts with it.
    let current: "page" | "true" | undefined;
    if (!isAnchor && pathname === link.href) current = "page";
    else if (!isAnchor && link.href !== "/" && pathname.startsWith(`${link.href}/`)) current = "true";

    const anchor = (
      <Link
        key={link.href}
        href={link.href}
        className="nav-link"
        aria-current={current}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    );

    return variant === "list" ? <li key={link.href}>{anchor}</li> : anchor;
  });
}
