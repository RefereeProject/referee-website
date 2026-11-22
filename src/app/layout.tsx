import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SOCIAL_IMAGE, THEME_COLOR } from "@/lib/brand";
import { getSite } from "@/lib/content";
import { buildOrganizationSchema, CANONICAL_SITE_NAME, serializeJsonLd } from "@/lib/structuredData";

// Font variables are named after the typeface (not --font-sans / --font-serif)
// so they cannot collide with Tailwind's theme keys of the same name.
// globals.css builds the --font-body / --font-display / --font-mono-stack
// stacks from them.
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Source Serif 4 is loaded as a variable font with its optical-size axis, so
// large headlines get the finer display cut and small text the sturdier one.
const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

// Plex Mono has no variable version, so the weights in use are listed.
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://referee-project.com"),
  title: "The Referee Project",
  description: "Adding quality and nuance to the scholarly record.",
  // Default link preview for routes that do not set their own. Routes that do
  // set `openGraph` or `twitter` must repeat the image (see src/lib/brand.ts).
  openGraph: { type: "website", siteName: "Referee", images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", images: [SOCIAL_IMAGE.url] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: THEME_COLOR,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();
  const organizationJsonLd = serializeJsonLd(buildOrganizationSchema({
    name: CANONICAL_SITE_NAME,
    description: typeof metadata.description === "string" ? metadata.description : undefined,
    siteUrl: site.link,
    logoPath: "/referee-brand-kit/icon-512.png",
  }));

  return (
    // The font variables must sit on <html>: globals.css reads them on :root,
    // and a variable defined on <body> is not visible there. (They used to be
    // on <body>, which is why the brand fonts never actually loaded.)
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
        {/* First tab stop on every page. Hidden until it receives keyboard
            focus; lets keyboard users jump past the header navigation. */}
        <a href="#main" className="skip-link">Skip to content</a>
        <GoogleAnalytics />
        <Navbar />
        <main id="main" className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
