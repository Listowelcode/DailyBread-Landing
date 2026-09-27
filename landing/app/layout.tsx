import type { Metadata, Viewport } from "next";
import "./globals.css";

// ⚠️ ASSUMPTION: replace with your real production domain everywhere it appears in this file.
const SITE_URL = "https://dailybread.app";
const SITE_NAME = "Daily Bread";
const SITE_TITLE = "Daily Bread — A Daily Scripture, Reflection & Prayer Email";
const SITE_DESCRIPTION =
  "Daily Bread is a free daily email with a short Scripture passage, reflection, and prayer — a quiet, ad-free rhythm to begin your day with faith. No app, no feed, just your inbox.";
const OG_IMAGE_URL = `${SITE_URL}/quiet-scripture-dawn.jpg`;
const APPLE_TOUCH_ICON_URL = "/dailybread-favicon.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "daily bread devotional",
    "daily scripture email",
    "daily devotional email",
    "bible verse of the day email",
    "christian morning devotional",
    "daily prayer email",
    "scripture reflection newsletter",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Religion & Spirituality",

  alternates: {
    canonical: "/",
  },

  // Open Graph — controls how the page appears when shared on social/messaging apps
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 2304,
        height: 1536,
        alt: "Daily Bread — a quiet daily note of Scripture, reflection, and prayer",
      },
    ],
  },

  // Twitter/X card
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: APPLE_TOUCH_ICON_URL,
  },

  // ⚠️ Add real verification tokens once you have Search Console / Bing Webmaster access
  // verification: {
  //   google: "your-google-site-verification-token",
  // },
};

export const viewport: Viewport = {
  themeColor: "#164346",
  width: "device-width",
  initialScale: 1,
};

// Structured data (JSON-LD). This is the single highest-leverage thing for GEO:
// generative answer engines (Google AI Overviews, ChatGPT browsing, Perplexity, etc.)
// lean heavily on schema.org markup to understand what a page/organization *is*
// and to extract clean facts rather than scraping prose.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/dailybread-lockup.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    // ⚠️ add your real social profile URLs, e.g.
    // "https://www.instagram.com/dailybread",
    // "https://twitter.com/dailybread",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Montserrat/Manrope/JetBrains Mono are referenced throughout globals.css
            and components (.font-display, .font-meta) but were never actually
            loaded anywhere, so they were silently falling back to system fonts.
            Loading them here makes the intended typography (incl. the bold
            Montserrat stat numbers, and the regular-weight Montserrat used
            for the subscriber profile headings) render as designed. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Montserrat:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        {/* Explicit favicon links (in addition to metadata.icons above) so the
            icon is guaranteed to render in the browser tab across browsers. */}
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href={APPLE_TOUCH_ICON_URL} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-surface antialiased">{children}</body>
    </html>
  );
}
