// Root layout for HM Elite Interiors website
import type { Metadata } from "next";
import Script from "next/script";
import { Michroma, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ThemeScript } from "@/components/ui/ThemeScript";
import { WhatsAppChatWidget } from "@/components/ui/WhatsAppChatWidget";
import { CookieConsent } from "@/components/ui/CookieConsent";

const michroma = Michroma({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hmeliteinteriors.co.uk"),
  title: "HM Elite Interiors — Bespoke Fitted Furniture & Interior Design | UK",
  description:
    "HM Elite specialises in designing and manufacturing high-quality, made-to-measure fitted bedrooms, kitchens, loft conversions, home offices, and more. Proudly crafted in the UK.",
  keywords: [
    "fitted kitchens UK",
    "bespoke bedrooms",
    "media wall installation",
    "fitted wardrobes",
    "interior design",
    "HM Elite Interiors",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "HM Elite Interiors — Bespoke Fitted Furniture & Interior Design",
    description:
      "Premium bespoke interior solutions — fitted kitchens, bedrooms, walls, walk-in wardrobes and more. Made to measure in the UK.",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HM Elite Interiors — Bespoke Fitted Furniture & Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HM Elite Interiors — Bespoke Fitted Furniture & Interior Design",
    description:
      "Premium bespoke interior solutions — fitted kitchens, bedrooms, walls, walk-in wardrobes and more. Made to measure in the UK.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "ifxPlf1JoFzPmdG3g1d-1-zf-McHg94-8kHVnAmWgtE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var savedConsent = null;
            try {
              var raw = localStorage.getItem('hm_cookie_consent_v2');
              if (raw) {
                savedConsent = JSON.parse(raw);
              }
            } catch (e) {}

            if (savedConsent) {
              gtag('consent', 'default', {
                'analytics_storage': savedConsent.analytics ? 'granted' : 'denied',
                'ad_storage': savedConsent.marketing ? 'granted' : 'denied',
                'ad_user_data': savedConsent.marketing ? 'granted' : 'denied',
                'ad_personalization': savedConsent.marketing ? 'granted' : 'denied'
              });
            } else {
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            }
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S2ED08ZFFZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S2ED08ZFFZ');
          `}
        </Script>
      </head>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppChatWidget />
        <CookieConsent />
        <GrainOverlay />
      </body>
    </html>
  );
}
