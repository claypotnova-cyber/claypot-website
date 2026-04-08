import { SITE } from "@/lib/data/site";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Centreville, VA`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.metaKeywords,
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.fullName,
    title: `${SITE.fullName} | Authentic Indian Dining`,
    description: SITE.description,
    images: [
      {
        url: "/images/restaurant-interior.png",
        width: 1200,
        height: 630,
        alt: "Clay Pot Indian Bar & Restaurant interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} | Authentic Indian Dining`,
    description: SITE.description,
    images: ["/images/restaurant-interior.png"],
  },
  alternates: {
    canonical: SITE.url,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/icons/icon-192.png" }],
  },
  other: {
    "theme-color": "#F4A300",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#F4A300" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-cream font-inter antialiased">
        <PromoBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
