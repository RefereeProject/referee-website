import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  // Anchor link — `How it works` is a homepage section (#method).
  { href: "/#method", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Objections & Principles" },
] as const;

export function Navbar() {
  return (
    <header className="site-header animate-navbar-slide-in">
      <div className="container site-header-inner">
        <Link href="/" className="brand" aria-label="The Referee Project — home">
          {/*
            Brand lockup uses the project logo image instead of the
            CSS `.brand-mark` boxed-R, per design refresh. The image is
            kept square (30×30) to align with the existing baseline
            (the `.brand-mark` rule in globals.css uses the same size).
          */}
          <Image
            src="/Referee_new_logo.png"
            alt=""
            width={30}
            height={30}
            priority
            className="brand-logo"
            style={{ display: "block", transform: "translateY(4px)" }}
          />
          <span className="brand-name">The Referee Project</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hide-sm">
              {link.label}
            </Link>
          ))}
          {/*
            Primary nav CTA — drives traffic to the curated scored-paper
            demo, matching the homepage hero. Updated from the prior
            "Demo →" mailto pattern.
          */}
          <a href="https://demo.referee-project.com" className="nav-cta">
            See a scored paper →
          </a>
        </nav>
      </div>
    </header>
  );
}
