'use client';

import Script from 'next/script';

/**
 * Google Analytics component for GA4 tracking
 * 
 * This component loads the gtag.js script and initializes Google Analytics.
 * It automatically tracks page views in Next.js App Router via the navigation events.
 * 
 * Environment variable required:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Your GA4 Measurement ID (format: G-XXXXXXXXXX)
 * 
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render if no measurement ID is configured
  if (!measurementId) {
    console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
    return null;
  }

  return (
    <>
      {/* Load gtag.js script from Google */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      
      {/* Initialize gtag and configure GA4 */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
