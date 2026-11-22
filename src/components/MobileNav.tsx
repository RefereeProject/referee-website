"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLinks, type NavLink } from "./NavLinks";

/**
 * Viewport width at which the desktop nav bar takes over.
 * Keep in sync with the 1024px breakpoint in globals.css (.nav-desktop).
 */
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * id of the disclosure panel, referenced by the button's aria-controls.
 * A fixed string rather than useId(): the header renders exactly one menu,
 * and useId() produced different values on the server and in the browser on
 * the home page (an intermittent hydration mismatch), which a constant
 * cannot do.
 */
const PANEL_ID = "mobile-nav-panel";

interface MobileNavProps {
  links: readonly NavLink[];
  ctaHref: string;
  ctaLabel: string;
}

/**
 * Menu button plus disclosure panel for small screens.
 *
 * It is a plain disclosure (a button that shows a list of links), not an
 * ARIA "menu": the links stay ordinary links, Tab moves through them in
 * order, and the rest of the page remains usable while it is open.
 */
export function MobileNav({ links, ctaHref, ctaLabel }: MobileNavProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // We store the pathname the menu was opened on rather than a boolean.
  // The menu counts as open only while we are still on that page, so any
  // navigation (a link, the browser's Back button) closes it without needing
  // an effect that watches the route.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isOpen = openedOn === pathname;

  const close = () => setOpenedOn(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenedOn(null);
      // Return focus to the button so keyboard users are not left on a link
      // that has just been hidden.
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpenedOn(null);
    };

    // If the window grows past the breakpoint the button disappears, so the
    // panel must close too or it would be stranded open with no way to shut it.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenedOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setOpenedOn(isOpen ? null : pathname)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* `hidden` keeps the panel in the DOM (so aria-controls always points
          at something) while removing its links from the tab order. */}
      <div id={PANEL_ID} className="mobile-nav-panel" hidden={!isOpen}>
        <nav className="container" aria-label="Primary">
          <ul className="mobile-nav-list">
            {/* onNavigate also closes the menu for same-page anchors such as
                "/#method", where the pathname does not change. */}
            <NavLinks links={links} variant="list" onNavigate={close} />
          </ul>
          <a href={ctaHref} className="btn btn-primary mobile-nav-cta">
            {ctaLabel} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
