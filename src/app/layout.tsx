import type { Metadata } from "next";
import { Michroma, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ThemeScript } from "@/components/ui/ThemeScript";
import { WhatsAppChatWidget } from "@/components/ui/WhatsAppChatWidget";

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
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "HM Elite Interiors — Bespoke Fitted Furniture & Interior Design",
    description:
      "Premium bespoke interior solutions — fitted kitchens, bedrooms, walls, walk-in wardrobes and more. Made to measure in the UK.",
    type: "website",
    locale: "en_GB",
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
      </head>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppChatWidget />
        <GrainOverlay />
      </body>
    </html>
  );
}
