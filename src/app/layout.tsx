import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getSite } from "@/lib/content";
import {
  buildOrganizationSchema,
  CANONICAL_SITE_NAME,
  serializeJsonLd,
} from "@/lib/structuredData";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Referee",
  description: "Research-integrity infrastructure for high-volume scholarly publishing",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();
  const organizationJsonLd = serializeJsonLd(
    buildOrganizationSchema({
      name: CANONICAL_SITE_NAME,
      description: typeof metadata.description === "string" ? metadata.description : undefined,
      siteUrl: site.link,
      logoPath: "/Referee_new_logo.png",
    }),
  );

  return (
    <html lang="en">
      <body
        className={`${display.variable} ${mono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        <GoogleAnalytics />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
