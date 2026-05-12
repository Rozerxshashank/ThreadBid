import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "threadbid — Fashion Dead Stock Auctions",
  description:
    "India's premier auction marketplace for fashion dead stock. Competitive bidding, verified sellers, secure payments. Liquidate unsold inventory with price discovery.",
  keywords: [
    "fashion auctions",
    "dead stock",
    "unsold inventory",
    "B2B fashion",
    "bulk apparel",
    "threadbid",
  ],
  openGraph: {
    title: "threadbid — Fashion Dead Stock Auctions",
    description:
      "Competitive bidding for fashion dead stock. Verified sellers, secure payments.",
    type: "website",
    locale: "en_IN",
    siteName: "threadbid",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
