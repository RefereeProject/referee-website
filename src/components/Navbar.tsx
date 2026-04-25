import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#method", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Objections & Principles" },
] as const;

export function Navbar() {
  return (
    <header className="site-header animate-navbar-slide-in">
      <div className="container site-header-inner">
        <Link href="/" className="brand" aria-label="Referee — home">
          <span className="brand-mark">R</span>
          <span className="brand-name">Referee</span>
          <span className="brand-meta hide-md" style={{ marginLeft: 4, transform: "translateY(-2px)" }}>
            The Referee Project
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hide-sm">
              {link.label}
            </Link>
          ))}
          <a href="mailto:erik@referee-project.com?subject=Referee%20demo%20request" className="nav-cta">
            Demo →
          </a>
        </nav>
      </div>
    </header>
  );
}
