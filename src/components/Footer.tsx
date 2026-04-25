import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 14 }}>
              <span className="brand-mark">R</span>
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
              <li><Link href="/faq">Objections &amp; Principles</Link></li>
            </ul>
          </div>
          <div>
            <h5>Engage</h5>
            <ul>
              <li><a href="mailto:erik@referee-project.com?subject=Referee%20demo%20request">Demo</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/talks">Talks</Link></li>
              <li><Link href="/#status">Status &amp; limits</Link></li>
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
        <div className="footer-bottom">
          <span>© 2024–{year} Referee Project</span>
          <span>CRWE taxonomy · v0.4.1</span>
        </div>
      </div>
    </footer>
  );
}
