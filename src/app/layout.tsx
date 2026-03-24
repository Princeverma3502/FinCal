import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  description: "Professional Mortgage Calculator",
  icons: {
    icon: "/icon.png?v=6",
    apple: "/icon.png?v=6",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Force browser to refresh the tab icon */}
        <link rel="icon" href="/icon.png?v=6" />
        <link rel="apple-touch-icon" href="/icon.png?v=6" />
      </head>
      <body className={`${inter.className} antialiased bg-[#F8FAFC] overflow-x-hidden w-full relative`}>
        {children}
      </body>
    </html>
  );
}