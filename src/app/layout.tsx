import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FinCal | Mortgage Pro',
  description: 'Advanced mortgage projections and equity tracking',
  openGraph: {
    title: 'FinCal | Mortgage Pro',
    description: 'Calculate your financial future with precision.',
    url: 'https://fin-cal-theta.vercel.app',
    siteName: 'FinCal',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        {/* This tracks visitors anonymously without storing bank data */}
        <Analytics />
      </body>
    </html>
  );
}