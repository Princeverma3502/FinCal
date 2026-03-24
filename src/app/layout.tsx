import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { InstallPopup } from "@/components/ui/InstallPopup";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "FinCal | Mortgage Pro",
  description: "Calculate your financial future with precision.",
  metadataBase: new URL("https://fin-cal-theta.vercel.app"),
  manifest: "/manifest.json",
  openGraph: {
    title: "FinCal | Mortgage Pro",
    description: "Calculate your financial future with precision.",
    url: "https://fin-cal-theta.vercel.app",
    siteName: "FinCal",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png?v=1",
    shortcut: "/icon.png?v=1",
    apple: "/icon.png?v=1",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png?v=1" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased bg-[#F8FAFC] overflow-x-hidden w-full relative`}>
        {children}
        <Analytics />
        <InstallPopup />
      </body>
    </html>
  );
}