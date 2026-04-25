import Image from "next/image";
import Link from "next/link";
import {
  CRWE_LEAF_CHECKS,
  CRWE_TOP_LEVEL_CATEGORIES,
  CRWE_VERSION_LABEL,
} from "@/lib/copy";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 14 }}>
              {/* Brand lockup matches the navbar — logo image, not the CSS boxed R. */}
              <Image
                src="/Referee_new_logo.png"
                alt=""
                width={30}
                height={30}
                className="brand-logo"
                style={{ display: "block", transform: "translateY(4px)" }}
              />
              <span className="brand-name">Referee</span>
            </Link>
            <p style={{ maxWidth: 340, marginTop: 14, fontSize: 13, color: "var(--ink-muted)" }}>
              Adding quality and nuance to the scholarly record.
            </p>
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
              <li><a href="https://demo.referee-project.com">See a scored paper</a></li>
              <li><a href="mailto:erik@referee-project.com?subject=Referee%20walkthrough%20request">Book a walkthrough</a></li>
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
          <span>© 2024–{year} Referee Project</span>
          <span>
            CRWE {CRWE_VERSION_LABEL} · {CRWE_TOP_LEVEL_CATEGORIES} top-level categories · {CRWE_LEAF_CHECKS} structured checks
          </span>
        </div>
      </div>
    </footer>
  );
}
