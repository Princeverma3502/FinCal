import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinCal Pro | Advanced Mortgage Analysis",
  description: "Professional-grade loan and mortgage calculator with amortization schedules and extra payment analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F8FAFC] text-[#0F172A]`}>
        {children}
      </body>
    </html>
  );
}