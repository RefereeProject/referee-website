import Image from "next/image";
import Link from "next/link";
import {
  CRWE_LEAF_CHECKS,
  CRWE_TOP_LEVEL_CATEGORIES,
  CRWE_VERSION_LABEL,
  CTA_PRIMARY_HREF,
  CTA_PRIMARY_LABEL,
  CTA_SECONDARY_HREF,
  CTA_SECONDARY_LABEL,
  FOOTER_DESCRIPTION,
} from "@/lib/copy";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* The footer has room for the kit's full horizontal lockup; the
                white version is the one drawn for dark backgrounds. The
                intrinsic size keeps the artwork's 352.37 : 108 ratio. */}
            <Link href="/" aria-label="The Referee Project — home" style={{ display: "inline-block" }}>
              <Image
                src="/referee-brand-kit/referee-horizontal-white.svg"
                alt=""
                width={183}
                height={56}
                className="footer-lockup"
              />
            </Link>
            <p className="footer-tagline">{FOOTER_DESCRIPTION}</p>
          </div>
          <div>
            <h5>Site</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#method">How it works</Link></li>
              <li><Link href="/faq">Objections & Principles</Link></li>
            </ul>
          </div>
          <div>
            <h5>Engage</h5>
            <ul>
              {/*
                Primary CTA links to the curated scored-paper demo, matching
                the homepage hero. The walkthrough mailto is the secondary path.
              */}
              <li><a href={CTA_PRIMARY_HREF}>{CTA_PRIMARY_LABEL}</a></li>
              <li><a href={CTA_SECONDARY_HREF}>{CTA_SECONDARY_LABEL}</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/talks">Talks</Link></li>
              <li><Link href="/#status">Status & limits</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:erik@referee-project.com">erik@referee-project.com</a></li>
              <li><a href="https://www.linkedin.com/in/erikschneider1/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        {/*
          Footer bottom row surfaces the three CRWE facts the marketing brief
          calls out: current taxonomy version, top-level category count, and
          total structured (leaf) checks. Constants live in `src/lib/copy.ts`.
        */}
        <div className="footer-bottom">
          <span>© 2024–{year} The Referee Project</span>
          <span>
            CRWE {CRWE_VERSION_LABEL} · {CRWE_TOP_LEVEL_CATEGORIES} top-level categories · {CRWE_LEAF_CHECKS} structured checks
          </span>
        </div>
      </div>
    </footer>
  );
}
