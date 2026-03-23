import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinCal Pro | India's Smartest Home Loan Tool",
  description: "Calculate Home Loans with Indian Rupee formatting, EMI breakdown, and extra payment savings.",
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