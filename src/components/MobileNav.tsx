"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLinks, type NavLink } from "./NavLinks";

/**
 * Viewport width at which the desktop nav bar takes over.
 * Keep in sync with the `min-width: 1024px` rule in globals.css that shows
 * .nav-desktop and hides .nav-toggle and .mobile-nav-panel.
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
export function MobileNav(props: MobileNavProps) {
  const pathname = usePathname();

  // The disclosure is keyed by pathname, so every navigation (a link, the
  // browser's Back or Forward button) mounts a fresh one, which starts
  // closed. Remembering "the page the menu was opened on" is not enough:
  // going Back and then Forward returns to that same page and would reopen
  // a menu the visitor never asked for.
  return <MobileNavDisclosure key={pathname} {...props} />;
}

function MobileNavDisclosure({ links, ctaHref, ctaLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Read where focus is before closing: hiding the panel moves focus off
      // any link inside it.
      const focusWasInside = rootRef.current?.contains(document.activeElement) ?? false;
      setIsOpen(false);
      // Hand focus back to the button only when it was in the menu, so a
      // keyboard user is not left on a link that has just been hidden. If
      // focus is elsewhere on the page, leave it where it is.
      if (focusWasInside) buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    // If the window grows past the breakpoint the button disappears, so the
    // panel must close too or it would be stranded open with no way to shut it.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
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

  // Close when keyboard focus moves to something outside the menu. The panel
  // covers the top of the page, so without this, tabbing past the last link
  // would put focus on a control hidden underneath it.
  //
  // `relatedTarget` is the element receiving focus. It is null when focus
  // goes nowhere in particular (the window loses focus, or Safari, which does
  // not focus a button on click). Those cases are ignored; otherwise clicking
  // the toggle in Safari would close the menu here and then reopen it in the
  // click handler.
  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !event.currentTarget.contains(next)) setIsOpen(false);
  };

  return (
    <div ref={rootRef} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* `hidden` keeps the panel in the DOM (so aria-controls always points
          at something) while removing its links from the tab order. */}
      <div id={PANEL_ID} className="mobile-nav-panel" hidden={!isOpen}>
        <nav className="container" aria-label="Primary">
          <ul className="mobile-nav-list">
            {/* onNavigate closes the menu for same-page anchors such as
                "/#method", where the pathname (and so the key above) does
                not change. */}
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
