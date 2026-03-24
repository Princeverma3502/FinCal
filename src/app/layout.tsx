import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { InstallPopup } from "@/components/ui/InstallPopup";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#6366F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents horizontal "jiggle" when typing
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "FinCal | Mortgage Pro",
  description: "Professional Mortgage Tracker & Wealth Visualizer",
  metadataBase: new URL("https://fin-cal-theta.vercel.app"),
  manifest: "/manifest.json",
  openGraph: {
    title: "FinCal | Mortgage Pro",
    description: "Calculate your financial future with precision.",
    url: "https://fin-cal-theta.vercel.app",
    siteName: "FinCal",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FinCal Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinCal | Mortgage Pro",
    description: "Calculate your financial future with precision.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png?v=1", type: "image/png" },
      { url: "/icon.png?v=1", type: "image/png", sizes: "32x32" }
    ],
    shortcut: "/icon.png?v=1",
    apple: [
      { url: "/icon.png?v=1", sizes: "180x180", type: "image/png" }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F8FAFC] overflow-x-hidden w-full relative`}>
        {children}
        <Analytics />
        <InstallPopup />
      </body>
    </html>
  );
}