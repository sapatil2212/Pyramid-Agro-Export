import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "@/components/layout/client-wrapper";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { LoadingProvider } from "@/components/loading-provider";
import { AuthProvider } from "@/components/auth-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pyramid Agro Export - Premium Agricultural Products from India",
  description: "Leading exporter of premium quality fresh fruits, vegetables, grains, and spices from India. Delivering nature's best to global markets with international standards.",
  keywords: ["agricultural export", "fresh fruits", "vegetables", "grains", "spices", "India export", "pomegranates", "grapes", "onions", "turmeric", "rice"],
  authors: [{ name: "Pyramid Agro Export" }],
  icons: {
    icon: "/Logo_v2.png",
    shortcut: "/Logo_v2.png",
    apple: "/Logo_v2.png",
  },
  openGraph: {
    title: "Pyramid Agro Export - Premium Agricultural Products",
    description: "Premium quality fresh fruits, vegetables, grains, and spices exported from India to global markets.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyramid Agro Export",
    description: "Premium agricultural products from India - delivering nature's best globally",
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
      <head>
        <link rel="icon" href="/Logo_v2.png" type="image/png" />
        <link rel="shortcut icon" href="/Logo_v2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo_v2.png" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ReduxProvider>
          <AuthProvider>
            <LoadingProvider>
              <ClientWrapper>
                <main className="flex-1">
                  {children}
                </main>
              </ClientWrapper>
              <ConditionalFooter />
            </LoadingProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
