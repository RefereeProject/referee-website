import Link from "next/link";
import Image from "next/image";

/** Primary navigation links — Blog and Talks are intentionally excluded
 *  from the main nav to keep the product story front-and-center.
 *  They remain accessible at /blog and /talks via direct URL. */
const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/faq", label: "Objections & Principles" },
];

const navLinkClassName =
  "text-foreground-secondary hover:text-primary-600 transition-colors py-2 px-3 sm:px-0 -mx-3 sm:mx-0 rounded-lg active:bg-background-secondary min-h-[44px] flex items-center";

/** CTA link styled as a button — visually distinct from regular nav links */
const ctaClassName =
  "bg-primary-600 hover:bg-primary-700 text-white transition-colors py-2 px-4 rounded-lg min-h-[44px] flex items-center font-semibold text-sm shadow-sm";

/** Server component — CSS animation replaces Framer Motion slide-in */
export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-nav-border bg-nav-bg backdrop-blur-md animate-navbar-slide-in"
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-primary-700 tracking-tight flex items-center gap-2">
          <Image
            src="/Referee_new_logo.png"
            alt="Referee logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <div className="flex flex-col gap-0.5">
            <span>Referee</span>
            {/* Mobile: abbreviated tagline */}
            <span className="text-[11px] sm:hidden font-normal text-foreground-muted leading-tight">
              Reliability scoring for publishing
            </span>
            {/* Desktop: full tagline */}
            <span className="hidden sm:block text-xs font-normal text-foreground-muted leading-tight">
              Transparent reliability scoring for scholarly publishing
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClassName}>
              {link.label}
            </Link>
          ))}
          {/* Demo CTA — mailto link styled as a prominent button */}
          <a
            href="mailto:erik@referee-project.com?subject=Referee%20demo%20request"
            className={ctaClassName}
            aria-label="Request a demo via email"
          >
            Demo
          </a>
        </div>
      </nav>
    </header>
  );
}
