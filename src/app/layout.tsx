import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getSite } from "@/lib/content";
import { buildOrganizationSchema, CANONICAL_SITE_NAME, serializeJsonLd } from "@/lib/structuredData";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://referee-project.com"),
  title: "The Referee Project",
  description: "Adding quality and nuance to the scholarly record.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();
  const organizationJsonLd = serializeJsonLd(buildOrganizationSchema({
    name: CANONICAL_SITE_NAME,
    description: typeof metadata.description === "string" ? metadata.description : undefined,
    siteUrl: site.link,
    logoPath: "/Referee_new_logo.png",
  }));

  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
        <GoogleAnalytics />
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
