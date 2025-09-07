import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pyramid Agro Exports - Premium Fresh Fruits & Vegetables from India",
  description: "Leading fresh produce export company bringing the finest fruits, vegetables from Indian farms to global markets. Specializing in fresh grapes, onions, bananas, and green chilli with decades of expertise.",
  keywords: ["fresh fruits export", "vegetable exports", "Indian agriculture", "fresh grapes", "onions export", "bananas", "green chilli", "Nashik exports"],
  authors: [{ name: "Pyramid Agro Exports" }],
  openGraph: {
    title: "Pyramid Agro Exports - Premium Fresh Fruits & Vegetables",
    description: "Bringing the finest fruits, vegetables from Indian farms to your table with unmatched quality in every product.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyramid Agro Exports",
    description: "Premium fresh fruits and vegetables from Indian farms to global markets",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
