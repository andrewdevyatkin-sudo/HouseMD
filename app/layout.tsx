import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HouseMD — Diagnose & Fix Any Home Problem",
    template: "%s | HouseMD",
  },
  description:
    "The community-powered home repair knowledge base. Search any problem, find real costs, DIY guides, and trusted local contractors.",
  keywords: [
    "home repair",
    "DIY home maintenance",
    "repair cost estimates",
    "home improvement guides",
    "contractor reviews",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HouseMD",
  },
  verification: {
    google: "google31a09c86311563c6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#0b0f1a" }}>
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
